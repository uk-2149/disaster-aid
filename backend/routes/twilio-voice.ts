import express, { Request, Response, NextFunction, RequestHandler } from "express";
import admin from "firebase-admin";
import twilio from "twilio";
import { db } from "../firebase/firebase";
import { geocodeLocation, verifyDisasterZone } from "../controllers/location";
import { parseTranscription } from "../controllers/parseTranscription";
import cors from "cors";

const VoiceResponse = twilio.twiml.VoiceResponse;
const router = express.Router();

// Enable CORS
router.use(cors());

// Twilio credentials
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// Twilio webhook
router.post("/", async (req: Request, res: Response) => {
  const { TranscriptionText, RecordingUrl, From } = req.body;
  const twiml = new VoiceResponse();

  if (!TranscriptionText) {
    twiml.say("Please leave a message with your name, needs, and location after the beep.");
    twiml.record({
      maxLength: 30,
      transcribe: true,
      transcribeCallback: "/twilio-voice",
    });
    twiml.hangup();
  } else {
    try {
      const { name, needs, location } = parseTranscription(TranscriptionText);

      if (!location) {
        await db.collection("requests").add({
          name: name || "Unknown",
          needs: needs || "Unknown",
          location: { address: "Unknown" },
          status: "pending_manual",
          source: "call",
          phone: From,
          recording: RecordingUrl,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        const coords = await geocodeLocation(location);
        const isDisasterZone = await verifyDisasterZone(coords.lat, coords.lng);
        await db.collection("requests").add({
          name: name || "Unknown",
          needs: needs || "Unknown",
          location: { ...coords, address: location },
          status: isDisasterZone ? "pending" : "pending_manual",
          source: "call",
          phone: From,
          recording: RecordingUrl,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      twiml.say("Thank you, your request has been received.");
    } catch (error) {
      console.error("Transcription error:", error);
      twiml.say("An error occurred. Please try again.");
    }
  }

  res.type("text/xml").send(twiml.toString());
});

// Error handler for rateLimitTwilio JSON errors
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const twiml = new VoiceResponse();
  if (err.status === 400) {
    twiml.say("Missing phone number. Cannot process request.");
  } else if (err.status === 429) {
    twiml.say("You have already made a request recently. Please try again after some time.");
  } else {
    twiml.say("An error occurred. Please try again.");
  }
  res.type("text/xml").send(twiml.toString());
});

export default router;