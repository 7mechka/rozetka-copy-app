import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const syncCartWithServer = createAsyncThunk(
  'cart/syncWithServer',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { cartSlice, userSlice } = getState();
      const user = userSlice.user;

      if (user && user.token) {
        // Отправляем обновленный массив корзины
        const response = await axios.put(
          'http://localhost:3000/data/users/updateCartList',
          {
            token: user.token,
            item: cartSlice, // Используем обновленную корзину
          }
        );
        return response.data;
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartListItem(state, action) {
      if (action.payload === (null || undefined) || !action.payload) {
        return;
      }

      const existingItem = state.find(
        (item) => item.sku === action.payload.sku
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.push({
          sku: action.payload.sku,
          imgUrl: action.payload.tileImageURL,
          name: action.payload.name,
          price: action.payload.price,
          count: 1,
        });
      }

      localStorage.setItem('cartList', JSON.stringify(state));
    },
    removeCartListItem(state, action) {
      const existingItem = state.find(
        (item) => item.sku === action.payload.item.sku
      );

      const indexItem = state.indexOf(existingItem);

      if (action.payload.action === 'one') {
        state[indexItem].count -= 1;

        if (state[indexItem].count <= 0) {
          state.splice(indexItem, 1);
        }
      } else if (action.payload.action === 'full') {
        state.splice(indexItem, 1);
      }

      localStorage.setItem('cartList', JSON.stringify(state));
    },
    setCartList(state, action) {
      state.push(action.payload);

      localStorage.setItem('cartList', JSON.stringify(state));
    },
    clearCartList(state, action) {
      state.length = 0;

      localStorage.removeItem('cartList');
    },
  },
});

export const {
  addCartListItem,
  removeCartListItem,
  setCartList,
  clearCartList,
} = cartSlice.actions;

export default cartSlice.reducer;
