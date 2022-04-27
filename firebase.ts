import {initializeApp, getApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiIIoxu1os2mLNj6caJVqfbg80DtwCH78",
  authDomain: "pokemon-challenge-7225f.firebaseapp.com",
  projectId: "pokemon-challenge-7225f",
  storageBucket: "pokemon-challenge-7225f.appspot.com",
  messagingSenderId: "1043559801544",
  appId: "1:1043559801544:web:73183c54bdf42406c1bbfd",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};
