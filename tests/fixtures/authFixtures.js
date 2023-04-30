export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123',
    email: 'email@domain.com',
    displayName: 'John Doe',
    photoURL: 'https://image.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined
}

export const user = {
    uid: '123',
    email: 'email@domain.com',
    displayName: 'John Doe',
    photoURL: 'https://image.jpg',
}