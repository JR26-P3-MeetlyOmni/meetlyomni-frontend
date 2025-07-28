import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建一个简单的slice
const initialState = {
  // 这里可以添加你的初始状态
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 这里可以添加你的reducers
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
