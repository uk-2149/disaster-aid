import { Request, Response, NextFunction, RequestHandler } from "express";
import { db } from "../firebase/firebase";
import admin from "firebase-admin";

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const rateLimitTwilio = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { From } = req.body;

    if (!From) {
      return res
        .status(400)
        .json({ error: "Missing phone number. Cannot process request." });
    }

    const oneHourAgo = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() - 60 * 60 * 1000)
    );

    const recentRequests = await db
      .collection("requests")
      .where("phone", "==", From)
      .where("timestamp", ">=", oneHourAgo)
      .get();

    if (!recentRequests.empty) {
      return res
        .status(429)
        .json({
          error:
            "You have already made a request recently. Please try again after some time.",
        });
    }

    next();
  }
);
