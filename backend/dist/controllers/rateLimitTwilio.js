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
exports.rateLimitTwilio = void 0;
const firebase_1 = require("../firebase/firebase");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const VoiceResponse_1 = __importDefault(require("twilio/lib/twiml/VoiceResponse"));
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.rateLimitTwilio = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { From } = req.body;
    if (!From) {
        const twiml = new VoiceResponse_1.default();
        twiml.say("Missing phone number. Cannot process request.");
        return res.type("text/xml").send(twiml.toString());
    }
    const oneHourAgo = firebase_admin_1.default.firestore.Timestamp.fromDate(new Date(Date.now() - 60 * 60 * 1000));
    const recentRequests = yield firebase_1.db.collection("requests")
        .where("phone", "==", From)
        .where("timestamp", ">=", oneHourAgo)
        .get();
    if (!recentRequests.empty) {
        const twiml = new VoiceResponse_1.default();
        twiml.say("You have already made a request recently. Please try again after some time.");
        return res.type("text/xml").send(twiml.toString());
    }
    next();
}));
