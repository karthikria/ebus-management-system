import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCShoUmoKPmn9IjfJ4btesylMvlPb6wUQg",
  authDomain: "ebuslocationsystem.firebaseapp.com",
  databaseURL:"https://ebuslocationsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ebuslocationsystem",
  storageBucket: "ebuslocationsystem.firebasestorage.app",
  messagingSenderId: "522349780649",
  appId: "1:522349780649:web:8b772d94ed7aeed225d3b8",
  measurementId: "G-RSZL3SKDSJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
