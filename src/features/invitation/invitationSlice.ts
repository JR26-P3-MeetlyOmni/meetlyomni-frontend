import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { acceptInvitationApi, sendInvitationApi } from './invitationApi';
import type { AcceptInvitationRequest, InvitationRequest, InvitationState } from './types';

const initialState: InvitationState = {
  isLoading: false,
  error: null,
  success: false,
};

export const sendInvitation = createAsyncThunk(
  'invitation/sendInvitation',
  async (invitationData: InvitationRequest, { rejectWithValue }) => {
    try {
      const response = await sendInvitationApi(invitationData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send invitation');
    }
  },
);

export const acceptInvitation = createAsyncThunk(
  'invitation/acceptInvitation',
  async (invitationData: AcceptInvitationRequest, { rejectWithValue }) => {
    try {
      const response = await acceptInvitationApi(invitationData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to accept invitation',
      );
    }
  },
);

const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSuccess: state => {
      state.success = false;
    },
    resetState: state => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendInvitation.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendInvitation.fulfilled, state => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(acceptInvitation.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(acceptInvitation.fulfilled, state => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, resetState } = invitationSlice.actions;
export default invitationSlice.reducer;
