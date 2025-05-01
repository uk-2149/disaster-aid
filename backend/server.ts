require("dotenv").config();
import express from "express";
import twilio from "twilio";
import axios from "axios";
import { cors } from "cors";
import { Timestamp } from "firebase-admin/firestore";
import { rateLimitTWilio } from "./controllers/rateLimitTwilio";
import uploadRoute from "./routes/upload";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


// Twilio Setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// Rate Limiting Middleware


app.use("/twilio-voice", rateLimitTWilio);
app.use('/api/upload', uploadRoute);

app.use("/api/auth", require("./routes/auth"));
app.use("/twilio-voice", require("./routes/twilio-voice"));


app.listen(3000, () => console.log("Server running on port 3000"));
