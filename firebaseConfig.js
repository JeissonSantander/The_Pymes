// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCFxO7vbM3fDovtOO4VPGpFcocmekrIgzE",
    authDomain: "thepymesmanager-aeb0e.firebaseapp.com",
    projectId: "thepymesmanager-aeb0e",
    storageBucket: "thepymesmanager-aeb0e.firebasestorage.app",
    messagingSenderId: "362391854162",
    appId: "1:362391854162:web:628ad1a3a765ea0940138b",
    measurementId: "G-JT3NHZQVYR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
