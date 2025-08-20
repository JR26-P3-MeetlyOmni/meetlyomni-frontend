import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './types';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;