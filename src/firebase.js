import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAegBGaurEvqABERDoniP7R-DQ0IgCZpUg",
  authDomain: "costs-815c5.firebaseapp.com",
  projectId: "costs-815c5",
  storageBucket: "costs-815c5.appspot.com",
  messagingSenderId: "716255631464",
  appId: "1:716255631464:web:fec4a92238793fc1d243dd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
