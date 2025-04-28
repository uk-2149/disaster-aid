import express from "express";
import { Request, Response } from "express";
import admin from "firebase-admin";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { db } from "../firebase/firebase";
import { geocodeLocation, verifyDisasterZone } from "../controllers/location"
import { parseTranscription } from "../controllers/parseTranscription"

const router = express.Router();

router.post("/twilio-voice", async (req: Request, res: Response) => {
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
          source: "audio",
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
          source: "audio",
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

module.exports = router;
