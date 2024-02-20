// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtahq-wRjEkCx-bqcqz7blixOX-jtrQD8",
  authDomain: "mi-primer-proyecto-987f2.firebaseapp.com",
  projectId: "mi-primer-proyecto-987f2",
  storageBucket: "mi-primer-proyecto-987f2.appspot.com",
  messagingSenderId: "536107078356",
  appId: "1:536107078356:web:8ddebde6857fa1ca19e141",
  measurementId: "G-3CHSQ0YP6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;