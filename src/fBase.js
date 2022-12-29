import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    apiKey: "AIzaSyBjaG6-OyYJhF9YpLrNUuWQ97HUeU-CI28",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

 // const firebaseConfig = {
 //    apiKey: "AIzaSyBjaG6-OyYJhF9YpLrNUuWQ97HUeU-CI28",
 //    authDomain: "nwitter-463ac.firebaseapp.com",
 //    projectId: "nwitter-463ac",
 //    storageBucket: "nwitter-463ac.appspot.com",
 //    messagingSenderId: "454761753798",
 //    appId: "1:454761753798:web:a0fd2a22c4040c17a5bbc7"
 //  };

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();