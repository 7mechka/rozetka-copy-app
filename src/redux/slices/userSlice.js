import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    exit(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { login, exit } = userSlice.actions;

export default userSlice.reducer;
