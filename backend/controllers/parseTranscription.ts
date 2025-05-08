export function parseTranscription(text: string): {
  name: string | null;
  needs: string | null;
  location: string | null;
} {
  console.log("Raw transcription:", text);
  const lowerText = text.toLowerCase().trim();
  // Name:
  let name: string | null = null;
  const nameMatch =
    lowerText.match(
      /(?:my name is|i'm|this is) ([\w\s]+?)(?:,|and|need|at|in|near|from|$)/i
    ) || lowerText.match(/^([\w\s]+?)(?:,|and|need|at|in|near|from|$)/i);
  if (nameMatch) {
    name = nameMatch[1].trim();
    name = name.replace(/\b(i|my|is)\b/g, "").trim();
  }

  // Needs:
  const needsKeywords = [
    "food",
    "water",
    "medical",
    "medicine",
    "shelter",
    "housing",
    "blankets",
    "clothes",
    "clothing",
    "help",
    "assistance",
    "supplies",
  ];
  const needsMatches = lowerText.match(
    new RegExp(`\\b(${needsKeywords.join("|")})\\b`, "ig")
  );
  const needs = needsMatches ? needsMatches.join(", ").toLowerCase() : null;

  // Location:
  let location: string | null = null;
  const locationMatch = lowerText.match(
    /(?:in|at|near|from|located at|live in) ([\w\s,.-]+?)(?:,|and|need|name|for|$)/i
  );
  if (locationMatch) {
    location = locationMatch[1].trim();
    location = location.replace(/\b(i|my|need|for)\b/g, "").trim();
  }

  const result = { name, needs, location };
  console.log("Parsed result:", result);
  return result;
}
