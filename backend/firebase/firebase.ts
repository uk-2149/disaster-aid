import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  
export const firebaseAdmin = admin;

export const db = admin.firestore();