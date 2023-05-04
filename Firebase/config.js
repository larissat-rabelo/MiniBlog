import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBt-YlJWxu0nPaNvv9z6lBbFCCw9H8KkGw",
  authDomain: "miniblog-aa9d0.firebaseapp.com",
  projectId: "miniblog-aa9d0",
  storageBucket: "miniblog-aa9d0.appspot.com",
  messagingSenderId: "559945482849",
  appId: "1:559945482849:web:fccbebfb032233e48ae020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };