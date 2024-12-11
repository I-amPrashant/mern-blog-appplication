import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bb082.firebaseapp.com",
  projectId: "mern-blog-bb082",
  storageBucket: "mern-blog-bb082.firebasestorage.app",
  messagingSenderId: "595702615427",
  appId: "1:595702615427:web:cb81c78c07ff8034e2bab6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);