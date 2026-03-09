import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    projectId: "aider-inventory-app-2026",
    appId: "1:163224255591:web:4fed632fea6f6b803fa8c2",
    storageBucket: "aider-inventory-app-2026.firebasestorage.app",
    apiKey: "AIzaSyCpMmN0_b_ziwxZwsKWQXWEsAM0J-EXuIE",
    authDomain: "aider-inventory-app-2026.firebaseapp.com",
    messagingSenderId: "163224255591",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
