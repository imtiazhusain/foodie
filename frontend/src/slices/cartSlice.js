import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload; // Assuming payload is just the item ID
      if (state[itemId]) {
        state[itemId] += 1; // Increase the count if the item exists
      } else {
        state[itemId] = 1; // Set count to 1 if the item does not exist
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;

      state[itemId] = state[itemId] - 1;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
