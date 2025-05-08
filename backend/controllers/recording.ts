import { Request, Response, NextFunction, RequestHandler } from "express";
import axios from "axios";
import { db } from "../firebase/firebase";

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const recording = asyncHandler(async (req: Request, res: Response) => {
  const requestId = req.params.id;

  const doc = await db.collection("requests").doc(requestId).get();
  if (!doc.exists) {
    return res.status(404).json({ error: "Recording not found" });
  }

  const data = doc.data();
  const recordingUrl = data?.recording;

  if (!recordingUrl) {
    return res.status(404).json({ error: "No recording URL found" });
  }

  try {
    const twilioRes = await axios.get(recordingUrl + ".mp3", {
      responseType: "stream",
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID!,
        password: process.env.TWILIO_AUTH_TOKEN!,
      },
    });

    res.setHeader(
      "Content-Type",
      twilioRes.headers["content-type"] || "audio/mpeg"
    );

    twilioRes.data.pipe(res);
  } catch (error: any) {
    console.error("Error streaming Twilio recording:", error.message);
    return res.status(500).json({ error: "Failed to stream recording" });
  }
});
