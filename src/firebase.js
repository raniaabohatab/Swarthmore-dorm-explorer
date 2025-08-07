import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyB-KGKfCMzZ6zkdP6-oRhQo0_hLnGs9W8U",
  authDomain: "swatexplore-a5aa1.firebaseapp.com",
  projectId: "swatexplore-a5aa1",
  storageBucket: "swatexplore-a5aa1.firebasestorage.app",
  messagingSenderId: "666375859763",
  appId: "1:666375859763:web:178553f25a9b0c9134fd46",
  measurementId: "G-QXW8H39HZC"
};


//

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB-KGKfCMzZ6zkdP6-oRhQo0_hLnGs9W8U",
//   authDomain: "swatexplore-a5aa1.firebaseapp.com",
//   projectId: "swatexplore-a5aa1",
//   storageBucket: "swatexplore-a5aa1.firebasestorage.app",
//   messagingSenderId: "666375859763",
//   appId: "1:666375859763:web:178553f25a9b0c9134fd46",
//   measurementId: "G-QXW8H39HZC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);