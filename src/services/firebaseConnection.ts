import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDhJxgFU2BYWZknwjxjiHC6-kPNX43G6Ao",
  authDomain: "webcars-9f12c.firebaseapp.com",
  projectId: "webcars-9f12c",
  storageBucket: "webcars-9f12c.firebasestorage.app",
  messagingSenderId: "1080510597835",
  appId: "1:1080510597835:web:d20fdcec39c0a8688aa94e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export { db, storage, auth }