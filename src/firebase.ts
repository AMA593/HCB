import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJpl1Ur_c0xiZdJAJtTUIloTKcO_kufgo",
  authDomain: "hcb-admin.firebaseapp.com",
  projectId: "hcb-admin",
  storageBucket: "hcb-admin.firebasestorage.app",
  messagingSenderId: "232325568480",
  appId: "1:232325568480:web:da3703d58a35691be73d85",
  measurementId: "G-XC7RPKZQ03"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app); // Requires VITE environment usually, commented out for now
