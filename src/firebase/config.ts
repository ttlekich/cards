import firebase, { FirebaseError } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDZbJPyeWwtR4kBpSUrBDOPEx496q8smBc",
    authDomain: "cards-106c5.firebaseapp.com",
    databaseURL: "https://cards-106c5.firebaseio.com",
    projectId: "cards-106c5",
    storageBucket: "cards-106c5.appspot.com",
    messagingSenderId: "276641378807",
    appId: "1:276641378807:web:a362d952f27a201ebf7ef2",
};

export const createUserDocument = async (user: firebase.User) => {
    const userRef = firestore.doc(`users/${user.uid}`);
};

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//     if (!userAuth) return;
//     const userRef = firestore.doc(`users/${userAuth.uid}`);
//     const snapShot = await userRef.get();
//     if (!snapShot.exists) {
//         const { displayName, email } = userAuth;
//         const createdAt = new Date();
//         try {
//             await userRef.set({
//                 displayName,
//                 email,
//                 createdAt,
//                 ...additionalData,
//             });
//         } catch (error) {
//             console.log("error creating user", error.message);
//         }
//     }
//     return userRef;
// };

firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// // Google Auth Utility
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export default firebase;
