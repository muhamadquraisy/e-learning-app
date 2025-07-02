import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // atau apa pun nama slice-mu

const store = configureStore({
  reducer: {
    auth: authReducer,
    // tambahkan reducer lain di sini
  },
});

export default store;