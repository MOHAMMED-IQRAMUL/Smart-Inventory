// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHvZNdW29Z7ZnHKKLjvVWv9cbo9oeCmf4",
  authDomain: "smartinventory-4fd9c.firebaseapp.com",
  projectId: "smartinventory-4fd9c",
  storageBucket: "smartinventory-4fd9c.appspot.com",
  messagingSenderId: "191584734566",
  appId: "1:191584734566:web:83cb123f75984a2f374ca7",
  measurementId: "G-1SHPME1KES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app)

export {firestore}