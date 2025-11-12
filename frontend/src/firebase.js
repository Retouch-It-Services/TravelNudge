// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // ✅ Add this line

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMUX6jO6ubFq8K0rJ6Lbx3YlLQVfO89N4",
  authDomain: "travelnudge-81601.firebaseapp.com",
  projectId: "travelnudge-81601",
  storageBucket: "travelnudge-81601.firebasestorage.app",
  messagingSenderId: "328816559237",
  appId: "1:328816559237:web:a8fedef35c8feeef3a15ec",
  measurementId: "G-LY6WRZP9YQ",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase services
const analytics = getAnalytics(app);
export const auth = getAuth(app);  // ✅ Export this for SignUp / SignIn

export default app;  // optional, for general use
