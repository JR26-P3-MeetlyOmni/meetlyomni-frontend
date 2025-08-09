import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    placeholder: (state = {}, _action) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
