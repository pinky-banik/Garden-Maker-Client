import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6Q75i8DxsNQqfq2Wvninb4K63AX9aHO0",
  authDomain: "genius-car-mechanics-practise.firebaseapp.com",
  projectId: "genius-car-mechanics-practise",
  storageBucket: "genius-car-mechanics-practise.appspot.com",
  messagingSenderId: "207942058326",
  appId: "1:207942058326:web:7d46f378c2ac3254da96f7",
  measurementId: "G-5TEBPDVDZN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;