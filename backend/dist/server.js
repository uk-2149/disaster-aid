"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const twilio_1 = __importDefault(require("twilio"));
const cors_1 = __importDefault(require("cors"));
const rateLimitTwilio_1 = require("./controllers/rateLimitTwilio");
// import uploadRoute from "./routes/upload";
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// Twilio Setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = (0, twilio_1.default)(accountSid, authToken);
// Rate Limiting Middleware
exports.app.use("/twilio-voice", rateLimitTwilio_1.rateLimitTwilio);
// app.use('/api/upload', uploadRoute);
exports.app.use("/api/auth", require("./routes/auth"));
exports.app.use("/twilio-voice", require("./routes/twilio-voice"));
exports.app.listen(3000, () => console.log("Server running on port 3000"));
