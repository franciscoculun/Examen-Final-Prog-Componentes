import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDsuK1jj6LRMn4yFt83lYRn5_EyXP8oq0",
  authDomain: "examen-final-prog-compon-1cdb5.firebaseapp.com",
  projectId: "examen-final-prog-compon-1cdb5",
  storageBucket: "examen-final-prog-compon-1cdb5.firebasestorage.app",
  messagingSenderId: "891860266756",
  appId: "1:891860266756:web:47014888d032118ba26a51"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);