import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import wishListSlice from './slices/wishListSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    wishListSlice: wishListSlice,
    userSlice: userSlice,
  },
});