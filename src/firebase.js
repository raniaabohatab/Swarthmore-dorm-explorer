import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-KGKfCMzZ6zkdP6-oRhQo0_hLnGs9W8U",
  authDomain: "swatexplore-a5aa1.firebaseapp.com",
  projectId: "swatexplore-a5aa1",
  storageBucket: "swatexplore-a5aa1.firebasestorage.app",
  messagingSenderId: "666375859763",
  appId: "1:666375859763:web:178553f25a9b0c9134fd46",
  measurementId: "G-QXW8H39HZC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 