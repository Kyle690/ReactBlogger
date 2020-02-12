import * as firebase from "firebase";

import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig={
    apiKey: "AIzaSyAwvVIOrsVzah5oodH7wx6Wy2VwgyBg78A",
    authDomain: "fir-d4dc1.firebaseapp.com",
    databaseURL: "https://fir-d4dc1.firebaseio.com",
    projectId: "fir-d4dc1",
    storageBucket: "fir-d4dc1.appspot.com",
    messagingSenderId: "410585688354",
    appId: "1:410585688354:web:e723ba42afafe8abeb9d7b",
    measurementId: "G-ZX8SS3VQ74"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const apiKey='6fujry69a9wpbu8aunsu9sveksknz9saa255ejd7op05jl7obtbmb';
