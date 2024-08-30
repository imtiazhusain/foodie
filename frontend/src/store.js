import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsListReducer from "./slices/foodListSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productsList: productsListReducer,
  },
});
