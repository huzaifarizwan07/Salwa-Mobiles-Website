import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3EHFe7EI2qxMmGFnTW3lbtT8NXLT4gIs",
    authDomain: "salwa-mobiles.firebaseapp.com",
    projectId: "salwa-mobiles",
    storageBucket: "salwa-mobiles.firebasestorage.app",
    messagingSenderId: "306414228907",
    appId: "1:306414228907:web:a12bfbbac1152859ee2eee",
    measurementId: "G-HC860Q3JD4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
    const snap = await getDocs(collection(db, "orders"));
    console.log("Total orders in DB:", snap.docs.length);
    snap.docs.forEach(d => {
        console.log(d.id, d.data().trackingId, d.data().customerName);
    });
}
check();
