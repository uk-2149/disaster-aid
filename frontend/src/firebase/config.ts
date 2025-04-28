import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXA9ydrhgzTWKWr0jC0QcNBWeM8v1Y1xM",
  authDomain: "disaster-aid-7981a.firebaseapp.com",
  projectId: "disaster-aid-7981a",
  storageBucket: "disaster-aid-7981a.appspot.com",
  messagingSenderId: "100689950001",
  appId: "1:100689950001:web:b3618407009c2f5cd76c10",
  measurementId: "G-3MY5DREKJQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { db, auth, analytics, storage };
