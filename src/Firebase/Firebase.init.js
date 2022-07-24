import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6uCUchz5YYk5bMUIVI_5uDn-hktPq8ho",
  authDomain: "garden-maker.firebaseapp.com",
  projectId: "garden-maker",
  storageBucket: "garden-maker.appspot.com",
  messagingSenderId: "363978624143",
  appId: "1:363978624143:web:3c827a88b29cd908c4f4fa",
  measurementId: "G-JQL97G60Q7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;