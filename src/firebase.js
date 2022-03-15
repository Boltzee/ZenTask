import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjInxbEwnZvA8CfjM6x0HAS5STREbCEJ4",
    authDomain: "notes-app-zen.firebaseapp.com",
    projectId: "notes-app-zen",
    storageBucket: "notes-app-zen.appspot.com",
    messagingSenderId: "421931338867",
    appId: "1:421931338867:web:4132ee14a7fd3451a96e06",
    measurementId: "G-VW7VN432C2",
};

const app = initializeApp(firebaseConfig);
var db = getFirestore(app);
export default db;
