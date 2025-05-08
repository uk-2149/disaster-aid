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
exports.geocodeLocation = geocodeLocation;
exports.verifyDisasterZone = verifyDisasterZone;
const axios_1 = __importDefault(require("axios"));
function geocodeLocation(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: address,
                    format: "json",
                    addressdetails: 1,
                    limit: 1
                },
                headers: {
                    'User-Agent': 'disaster-aid-platform/1.0 (your-email@example.com)' // Replace with your email or project info
                }
            });
            const data = response.data[0];
            if (!data) {
                console.warn("Location not found using OpenStreetMap");
                return { lat: 0, lng: 0 };
            }
            return {
                lat: parseFloat(data.lat),
                lng: parseFloat(data.lon)
            };
        }
        catch (error) {
            console.error("OpenStreetMap geocoding error:", error);
            return { lat: 0, lng: 0 };
        }
    });
}
function verifyDisasterZone(lat, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        return lat !== 0 && lng !== 0;
    });
}
