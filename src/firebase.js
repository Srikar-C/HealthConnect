// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdGYW21dQL3TuPgSG0qA3mSL5WUoTSgQ8",
  authDomain: "ibm-hack456.firebaseapp.com",
  projectId: "ibm-hack456",
  storageBucket: "ibm-hack456.appspot.com",
  messagingSenderId: "869566409557",
  appId: "1:869566409557:web:e7e79adabf4dc207851ddc",
  measurementId: "G-C5EX43C33R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, auth, storage };
