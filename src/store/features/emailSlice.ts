import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IEmailState {
  email: string;
  errors: string[];
  isSubmitting: boolean;
}

const initialState: IEmailState = {
  email: '',
  errors: [],
  isSubmitting: false,
};

// 异步验证邮箱
export const validateEmailAsync = createAsyncThunk('email/validateEmail', async (email: string) => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 这里应该调用真实的API
  const isEmailExists = false;

  if (isEmailExists) {
    throw new Error('This email address is already in use. Please use a different one or log in.');
  }

  return { email, isValid: true };
});

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.errors = [];
    },
    resetEmailState: _state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(validateEmailAsync.pending, state => {
        state.isSubmitting = true;
        state.errors = [];
      })
      .addCase(validateEmailAsync.fulfilled, state => {
        state.isSubmitting = false;
      })
      .addCase(validateEmailAsync.rejected, (state, action) => {
        state.isSubmitting = false;
        state.errors = [action.error.message || 'An error occurred. Please try again.'];
      });
  },
});

export const { setEmail, resetEmailState } = emailSlice.actions;
export default emailSlice.reducer;
