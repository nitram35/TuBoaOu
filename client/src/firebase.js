// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "tuboaou-2d563.firebaseapp.com",
    projectId: "tuboaou-2d563",
    storageBucket: "tuboaou-2d563.appspot.com",
    messagingSenderId: "50359610140",
    appId: "1:50359610140:web:7aeda0e17e05709fd2a8d9",
    measurementId: "G-W7YCDS06R3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);