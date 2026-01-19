// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    loggedIn: false,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setName, login, logout } = userSlice.actions;
export default userSlice.reducer;
