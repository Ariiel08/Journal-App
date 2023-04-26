import { logoutFirebase, registerWithEmail, signInWithEmail, signInWithGoogle } from "../../firebase/providers";
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

export const startEmailRegistration = ({fullName, email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerWithEmail({fullName, email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, photoURL, displayName: fullName, email}));
    }
}

export const startEmailSignIn = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, displayName, photoURL, errorMessage} = await signInWithEmail({email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, photoURL, displayName, email}));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(logout({}));
    }
}