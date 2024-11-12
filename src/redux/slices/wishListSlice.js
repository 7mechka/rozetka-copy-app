import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addWishListItem(state, action) {
      const existingItem = state.find(
        (item) => item.sku === action.payload.sku
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.push({
          sku: action.payload.sku,
          count: 1,
        });
      }
    },
    removeWishListItem(state, action) {
      const existingItem = state.find(
        (item) => item.sku === action.payload.sku
      );
      state.splice(state.indexOf(existingItem), 1);
    },
  },
});

export const { addWishListItem, removeWishListItem } = wishListSlice.actions;

export default wishListSlice.reducer;
