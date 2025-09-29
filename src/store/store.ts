import authReducer from '@/features/auth/authSlice';
import { signupReducer } from '@/features/signup';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Create a noop storage for non-browser environments (SSR, tests, etc.)
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async (_key: string, value: string) => value,
  removeItem: async () => {},
});

// Use web storage in browser, noop storage otherwise
const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local');

// Persist configuration for auth
const authPersistConfig = {
  key: 'auth',
  storage,
  // Only persist non-sensitive auth data
  whitelist: ['user', 'isAuthenticated'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  signup: signupReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
