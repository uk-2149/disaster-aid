# Disaster Response System

The **Disaster Response System** is a web application designed to assist during emergencies by allowing users to submit voice requests for help. Users can call a designated Twilio number, leave a voice message with their details (name, needs, location), and the system processes the request, stores it in Firebase Firestore, and displays it on a React-based frontend dashboard. The backend is built with Express and TypeScript, featuring rate limiting, geolocation, and authentication for secure audio playback.

## Features
- **Voice Request Submission**:
  - Users call a Twilio number and leave a voice message.
  - The system transcribes the message, extracts details (name, needs, location), and stores them in Firestore.
- **Rate Limiting**:
  - Prevents users from making multiple requests within an hour using Firestore-based rate limiting.
- **Geolocation and Disaster Zone Verification**:
  - Extracts location from voice messages, geocodes it, and checks if it’s in a disaster zone.
- **Frontend Dashboard**:
  - Displays requests with details (name, needs, location, status, audio recording).
  - Supports audio playback of voice recordings (protected by authentication).
- **Security**:
  - Audio playback endpoints are secured with JWT authentication.

## Tech Stack
- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Firebase & Firestore
- **Frontend**:
  - React
  - TypeScript
  - Tailwind css
- **Voice Handling**:
  - Twilio (voice calls and transcriptions)
- **Authentication**:
  - Firebase Authentication

## Setup Instructions

### 1. Clone the Repository
```bash
git clone git@github.com:uk-2149/disaster-aid.git
cd disaster-aid
```

### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure Environment Variables
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
PORT=3000
# Firebase (ensure serviceAccountKey.json is in the root directory)
```


### 4. Setup Twilio Account
- **Purchase a Twilio phone number (or you can get one for free)**
- **Configure the webhook for voice calls:**
  - Go to Twilio Console → Phone Numbers → Manage → Active Numbers.
  - Select your number.
  - Under Voice & Fax, set the webhook for "A Call Comes In" to https://<your-ngrok-url>/twilio-voice (HTTP POST).

### 5. Run the backend
Start the backend server:
```bash
cd backend
ts-node server.ts
```
The server will run on http://localhost:3000

### 6. Expose Local Server with ngrok
Twilio requires a public URL for webhooks. Use ngrok to expose your local server:
```bash
ngrok http 3000
```
- Copy the ngrok URL
- Update your Twilio webhook to ngrok-url/twilio-voice

### 7. Run the Frontend
Start the React frontend:
```bash
cd frontend
npm start
```

### 8. Test the System
- Voice Request Submission
  - Call your Twilio number using a phone
  - Leave a voice message, e.g., “Hello, my name is Manav, we are 15 people, we need food and water supplies, we are near Khandagiri.”
  - Check Firestore (requests collection) for the new request:
    ```javascript
    {
    name: "Manav",
    needs: "food, water, supplies",
    location: { address: "khandagiri", lat: <number>, lng: <number> },
    status: "pending" | "pending_manual",
    source: "call",
    phone: "+91987654XX10",
    recording: "https://api.twilio.com/...",
    timestamp: "..."
    }
    ```
- Frontend Dashboard
  - Open the frontend in your browser
  - Log in to obtain a token
    (create a email and password in your firebase authentication)
  - View the request card with the above details by clicking on Dashboard.
  - Click the play button to stream the audio recording
