import { logoutFirebase, registerWithEmail, signInWithEmail, signInWithGoogle } from "../../firebase/providers";
import { clearNotes } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startEmailRegistration = ({displayName, email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerWithEmail({displayName, email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({ok, uid, photoURL, displayName, email}));
    }
}

export const startEmailSignIn = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, displayName, photoURL, errorMessage} = await signInWithEmail({email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({ok, uid, photoURL, displayName, email}));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(clearNotes());
        dispatch(logout({}));
    }
}