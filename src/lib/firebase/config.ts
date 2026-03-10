import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// All sensitive values are read from environment variables.
// Never hardcode Firebase config here — use .env.local (local) or
// Vercel Environment Variables (production).
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that required env vars are set (only warn in dev)
if (process.env.NODE_ENV !== "production") {
    const missing = Object.entries(firebaseConfig)
        .filter(([, v]) => !v)
        .map(([k]) => k);
    if (missing.length > 0) {
        console.warn(
            "[Firebase] Missing env vars:",
            missing.join(", "),
            "— add them to .env.local"
        );
    }
}

const isFirebaseConfigured = !!firebaseConfig.apiKey;

let app;
let auth: any = null;
let db: any = null;

if (isFirebaseConfigured) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} else {
    console.warn("[Firebase] Skipping initialization due to missing API key.");
}

export { auth, db, isFirebaseConfigured };
