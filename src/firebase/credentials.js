
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdHYMGKy38a_hUWdy90uN8d5I8gJDEO6I",
  authDomain: "incapapp.firebaseapp.com",
  projectId: "incapapp",
  storageBucket: "incapapp.appspot.com",
  messagingSenderId: "814567247876",
  appId: "1:814567247876:web:b3055c90594834b50ae551"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;