import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // contoh

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;