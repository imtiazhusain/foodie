import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: {}, totalItems: 0 };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload; // Assuming payload is just the item ID
      if (state.items[itemId]) {
        state.items[itemId] += 1; // Increase the count if the item exists
      } else {
        state.items[itemId] = 1; // Set count to 1 if the item does not exist
        state.totalItems += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;

      if (state.items[itemId] === 1) {
        delete state.items[itemId];
        state.totalItems -= 1;
      } else {
        state.items[itemId] -= 1;
      }
    },
    deleteItemFromCart: (state, action) => {
      const itemId = action.payload;

      delete state.items[itemId];
      state.totalItems -= 1;
    },
  },
});

export const { addToCart, removeFromCart, deleteItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
