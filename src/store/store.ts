import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';

// create a simple slice
const initialState = {
  // add your initial states
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // add your reducer
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
