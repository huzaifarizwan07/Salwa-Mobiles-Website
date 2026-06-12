import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3EHFe7EI2qxMmGFnTW3lbtT8NXLT4gIs",
    authDomain: "salwa-mobiles.firebaseapp.com",
    projectId: "salwa-mobiles",
    storageBucket: "salwa-mobiles.firebasestorage.app",
    messagingSenderId: "306414228907",
    appId: "1:306414228907:web:a12bfbbac1152859ee2eee",
    measurementId: "G-HC860Q3JD4"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
