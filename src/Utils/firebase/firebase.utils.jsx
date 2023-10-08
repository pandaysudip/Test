
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDrfeixkXJUboIbJkqNAgXSGN1ZcsQsuZY",
    authDomain: "crown-clothing-db-644ca.firebaseapp.com",
    projectId: "crown-clothing-db-644ca",
    storageBucket: "crown-clothing-db-644ca.appspot.com",
    messagingSenderId: "474139997869",
    appId: "1:474139997869:web:7370cac77aa0f44285f824"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider ();
provider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore (); 
export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    const userDocRef= doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user, error.message');
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword (auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword (auth, email, password);
};