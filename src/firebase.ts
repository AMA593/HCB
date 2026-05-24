// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJpl1Ur_c0xiZdJAJtTUIloTKcO_kufgo",
  authDomain: "hcb-admin.firebaseapp.com",
  projectId: "hcb-admin",
  storageBucket: "hcb-admin.firebasestorage.app",
  messagingSenderId: "232325568480",
  appId: "1:232325568480:web:da3703d58a35691be73d85",
  measurementId: "G-XC7RPKZQ03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
