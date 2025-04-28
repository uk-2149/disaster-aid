import { Request, Response, NextFunction } from "express";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { db } from "../firebase/firebase";
import admin from "firebase-admin";
 
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
     Promise.resolve(fn(req, res, next)).catch(next);
   };
 
export const rateLimitTWilio = asyncHandler(async (req, res, next) => {
      const { From } = req.body;
  
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentRequests = await db.collection("requests")
        .where("phone", "==", From)
        .where("timestamp", ">=", admin.firestore.Timestamp.fromDate(oneHourAgo))
        .get();
  
      if (recentRequests.size >= 1) {
        const twiml = new VoiceResponse();
        twiml.say("You have exceeded the request limit. Please try again later.");
        return res.type("text/xml").send(twiml.toString());
      }
  
      next();
    })