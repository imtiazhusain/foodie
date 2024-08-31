import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsListReducer from "./slices/foodListSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productsList: productsListReducer,
    auth: authReducer,
  },
});
