// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBkPBmKqMxoQ0JzWAxKXcrOcAZotQImpM",
  authDomain: "fir-test-b67b7.firebaseapp.com",
  projectId: "fir-test-b67b7",
  storageBucket: "fir-test-b67b7.appspot.com",
  messagingSenderId: "903240098194",
  appId: "1:903240098194:web:c148d08f9595d2713f214b",
  measurementId: "G-881JKM06T2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;