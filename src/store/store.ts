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
<<<<<<< HEAD
    app: appSlice.reducer,
=======
    placeholder: (state = {}, _action) => state,
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
