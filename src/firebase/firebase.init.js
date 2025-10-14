// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWXYxMGRyoJRQQPuEqcHLt4lxdVQC7Y4M",
  authDomain: "email-password-auth-f15d2.firebaseapp.com",
  projectId: "email-password-auth-f15d2",
  storageBucket: "email-password-auth-f15d2.firebasestorage.app",
  messagingSenderId: "289250700537",
  appId: "1:289250700537:web:16f63383590c29e2364628"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);