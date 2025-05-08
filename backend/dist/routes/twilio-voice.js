"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const twilio_1 = __importDefault(require("twilio"));
const firebase_1 = require("../firebase/firebase");
const location_1 = require("../controllers/location");
const parseTranscription_1 = require("../controllers/parseTranscription");
const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TranscriptionText, RecordingUrl, From } = req.body;
    const twiml = new VoiceResponse();
    if (!TranscriptionText) {
        twiml.say("Please leave a message with your name, needs, and location after the beep.");
        twiml.record({
            maxLength: 30,
            transcribe: true,
            transcribeCallback: "/twilio-voice", // this must match your exposed endpoint
        });
        twiml.hangup();
    }
    else {
        try {
            const { name, needs, location } = (0, parseTranscription_1.parseTranscription)(TranscriptionText);
            if (!location) {
                yield firebase_1.db.collection("requests").add({
                    name: name || "Unknown",
                    needs: needs || "Unknown",
                    location: { address: "Unknown" },
                    status: "pending_manual",
                    source: "audio",
                    phone: From,
                    recording: RecordingUrl,
                    timestamp: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
                });
            }
            else {
                const coords = yield (0, location_1.geocodeLocation)(location);
                const isDisasterZone = yield (0, location_1.verifyDisasterZone)(coords.lat, coords.lng);
                yield firebase_1.db.collection("requests").add({
                    name: name || "Unknown",
                    needs: needs || "Unknown",
                    location: Object.assign(Object.assign({}, coords), { address: location }),
                    status: isDisasterZone ? "pending" : "pending_manual",
                    source: "audio",
                    phone: From,
                    recording: RecordingUrl,
                    timestamp: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
                });
            }
            twiml.say("Thank you, your request has been received.");
        }
        catch (error) {
            console.error("Transcription error:", error);
            twiml.say("An error occurred. Please try again.");
        }
    }
    res.type("text/xml").send(twiml.toString());
}));
module.exports = router;
