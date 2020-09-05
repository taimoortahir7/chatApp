import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4hscrNAA9cSQmAzAXJ9dfiO3o9Nfwvus",
    authDomain: "chatapp-6031f.firebaseapp.com",
    databaseURL: "https://chatapp-6031f.firebaseio.com",
    projectId: "chatapp-6031f",
    storageBucket: "chatapp-6031f.appspot.com",
    messagingSenderId: "672731724630",
    appId: "1:672731724630:web:95fd27dfe7ae4dfac274f7",
    measurementId: "G-03V6LKSXC3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };