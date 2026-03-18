import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqmI2nvN4LiuNfWg73wqvc0IrMNNPgz8I",
  authDomain: "tripcompass-9f149.firebaseapp.com",
  projectId: "tripcompass-9f149",
  storageBucket: "tripcompass-9f149.firebasestorage.app",
  messagingSenderId: "440849426778",
  appId: "1:440849426778:web:111514167b18d624642b63",
  measurementId: "G-SCNLYRF15K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);