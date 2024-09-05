import { createSlice } from "@reduxjs/toolkit";

let user = JSON.parse(localStorage.getItem("userInfo"));
const initialState = { user: user || null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
