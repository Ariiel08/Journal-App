import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState, user } from "../../fixtures/authFixtures";

describe('Tests on authSlice', () => { 

    test('should return the initial state and be called "auth"', () => { 

        const state = authSlice.reducer(initialState, {});
        
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    });

    test('should perform the authentication', () => { 

        const state = authSlice.reducer(initialState, login(user));
        expect(state).toEqual({
            status: 'authenticated',
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            errorMessage: null
        });
    });

    test('should perform the logout without arguments', () => { 

        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual(notAuthenticatedState);
    });

    test('should perform the logout with arguments', () => { 

        const errorMessage = 'The credentials are not correct';

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('should change the status to "checking"', () => { 

        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });

});