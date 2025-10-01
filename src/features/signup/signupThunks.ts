import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store/store';
import { signup } from '../auth/authApi';
import type { SignupRequest } from '../auth/types';
import type { SignupFormState } from './signupSlice';

// Async thunk for signup submission
export const submitSignup = createAsyncThunk(
  'signup/submitSignup',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const signupState = state.signup as SignupFormState;

      // Validate that all required fields are present and valid
      if (
        !signupState.companyValid ||
        !signupState.emailValid ||
        !signupState.passwordValid ||
        !signupState.contactValid
      ) {
        throw new Error('Please complete all required fields');
      }

      const signupData: SignupRequest = {
        userName: signupState.contactName,
        email: signupState.email,
        password: signupState.password,
        organizationName: signupState.companyName,
        phoneNumber: signupState.phone,
      };

      const result = await signup(signupData);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  },
  {
    condition: (_, { getState }) => {
      const { signup } = getState() as RootState;
      return !signup.isLoading;
    },
  },
);
