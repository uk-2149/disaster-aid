"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTranscription = parseTranscription;
function parseTranscription(text) {
    const lowerText = text.toLowerCase();
    const nameMatch = lowerText.match(/name is (\w+)/i) || lowerText.match(/^(\w+)/i);
    const needsMatch = lowerText.match(/(food|water|medical|shelter)/i);
    const locationMatch = lowerText.match(/in ([\w\s,]+)/i) || lowerText.match(/at ([\w\s,]+)/i);
    return {
        name: nameMatch ? nameMatch[1] : null,
        needs: needsMatch ? needsMatch[1] : null,
        location: locationMatch ? locationMatch[1].trim() : null,
    };
}
