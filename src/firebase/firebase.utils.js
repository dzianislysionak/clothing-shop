import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA00_8AY76JZ1sOu6sGlby00aGyw0F6BN8",
  authDomain: "clothing-shop-db-3220c.firebaseapp.com",
  databaseURL: "https://clothing-shop-db-3220c.firebaseio.com",
  projectId: "clothing-shop-db-3220c",
  storageBucket: "clothing-shop-db-3220c.appspot.com",
  messagingSenderId: "896854902400",
  appId: "1:896854902400:web:ccb475328085da6602c865",
  measurementId: "G-9G17QCBW97",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAT = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAT,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
