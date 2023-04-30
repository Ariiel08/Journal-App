import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartEmailSignIn = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startEmailSignIn: ({email, password}) => {
        return () => mockStartEmailSignIn({email, password});
    }

}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}));


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Tests on <LoginPage />', () => { 

    test('should render the component correctly', () => { 

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('The button should call startGoogleSignIn', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleButton = screen.getByLabelText('google-button');
        fireEvent.click(googleButton);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('submit should call startEmailSignIn', () => { 

        const email = 'email@domain.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        fireEvent.change(emailInput, {target: {name: 'email', value: email}});
        
        const passwordInput = screen.getByTestId('password');
        fireEvent.change(passwordInput, {target: {name: 'password', value: password}});

        const loginForm = screen.getByLabelText('login-form');
        fireEvent.submit(loginForm);

        expect(mockStartEmailSignIn).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    });
});