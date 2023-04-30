import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const resp = await signInWithPopup(FirebaseAuth, googleProvider);

        const {displayName, email, photoURL, uid} = resp.user;
        
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerWithEmail = async({displayName, email, password}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        
        updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const signInWithEmail = async({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const {displayName, photoURL, uid} = resp.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {
        console.log(error.message);

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}