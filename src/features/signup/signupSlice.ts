import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { submitSignup } from './signupThunks';

export type Step = 'company' | 'email' | 'password' | 'contact';

export interface SignupFormState {
  // Form data
  companyName: string;
  email: string;
  password: string;
  contactName: string;
  phone: string;

  // Validation states
  companyValid: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  contactValid: boolean;

  // UI states
  currentStep: Step;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SignupFormState = {
  companyName: '',
  email: '',
  password: '',
  contactName: '',
  phone: '',
  companyValid: false,
  emailValid: false,
  passwordValid: false,
  contactValid: false,
  currentStep: 'company',
  isLoading: false,
  error: null,
  success: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    // Step management
    setStep: (state, action: PayloadAction<Step>) => {
      state.currentStep = action.payload;
    },

    // Company step
    setCompanyData: (state, action: PayloadAction<{ name: string; isValid: boolean }>) => {
      state.companyName = action.payload.name;
      state.companyValid = action.payload.isValid;
    },

    // Email step
    setEmailData: (state, action: PayloadAction<{ email: string; isValid: boolean }>) => {
      state.email = action.payload.email;
      state.emailValid = action.payload.isValid;
    },

    // Password step
    setPasswordData: (state, action: PayloadAction<{ password: string; isValid: boolean }>) => {
      state.password = action.payload.password;
      state.passwordValid = action.payload.isValid;
    },

    // Contact step
    setContactData: (
      state,
      action: PayloadAction<{ name: string; phone: string; isValid: boolean }>,
    ) => {
      state.contactName = action.payload.name;
      state.phone = action.payload.phone;
      state.contactValid = action.payload.isValid;
    },

    // Clear form data
    clearForm: _state => {
      return { ...initialState };
    },

    // Clear sensitive data (password) while keeping other data
    clearSensitiveData: state => {
      state.password = '';
      state.passwordValid = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitSignup.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitSignup.fulfilled, state => {
        state.isLoading = false;
        state.success = true;
        // Clear sensitive data after successful submission
        state.password = '';
        state.passwordValid = false;
      })
      .addCase(submitSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'An unexpected error occurred';
        state.success = false;
      });
  },
});

export const {
  setStep,
  setCompanyData,
  setEmailData,
  setPasswordData,
  setContactData,
  clearForm,
  clearSensitiveData,
} = signupSlice.actions;

export default signupSlice.reducer;
