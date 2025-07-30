import { configureStore, createSlice } from '@reduxjs/toolkit';

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
