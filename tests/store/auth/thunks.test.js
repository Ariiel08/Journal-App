import { logoutFirebase, registerWithEmail, signInWithEmail, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startEmailRegistration, startEmailSignIn, startGoogleSignIn, startLogout } from "../../../src/store/auth/thunks";
import { clearNotes } from "../../../src/store/journal";
import { user } from "../../fixtures/authFixtures"

jest.mock('../../../src/firebase/providers.js');

describe('Tests on thunks from auth', () => { 
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should first', async() => {

        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoolgeSignIn should call checkingCredentials and login', async() => { 

        const loginData = {ok: true, ...user, };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoolgeSignIn should call checkingCredentials and logout (with error)', async() => { 

        const loginData = {ok: false, errorMessage: 'There was an Error with Google', };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startEmailRegistration should call checkingCredentials and login', async() => { 

        const loginData = {ok: true, ...user};
        const formData = {email: user.email, displayName: user.displayName, password: '123456'};

        await registerWithEmail.mockResolvedValue(loginData);

        await startEmailRegistration(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startEmailSignIn should call checkingCredentials and login', async() => { 

        const loginData = {ok: true, ...user};
        const formData = {email: user.email, password: '123456'};

        await signInWithEmail.mockResolvedValue(loginData);

        await startEmailSignIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLogout should call logoutFirebase, clearNotes y logout', async() => { 

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotes());
        expect(dispatch).toHaveBeenCalledWith(logout({}));
    });


});