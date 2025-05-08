require("dotenv").config();
import express from "express";
import { authenticate } from './middlewares/authMiddleware';
import getRec from "./routes/getRec";
import twilioVoiceRoute from "./routes/twilio-voice";
import cors from "cors";
import { rateLimitTwilio } from "./controllers/rateLimitTwilio";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/recording", authenticate, getRec);

// Twilio routes with rate limiting
app.use("/twilio-voice", rateLimitTwilio, twilioVoiceRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
