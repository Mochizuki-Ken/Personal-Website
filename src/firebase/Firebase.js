// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTshRVkzchrIS7L1GGxrvKkDY6a2tNCaM",
    authDomain: "mochizuki-ken.firebaseapp.com",
    projectId: "mochizuki-ken",
    storageBucket: "mochizuki-ken.appspot.com",
    messagingSenderId: "357410249997",
    appId: "1:357410249997:web:d87af4a1cb609be6286444"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase
