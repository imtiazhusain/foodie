import axios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await axios.get("/food/get_all_food_item");

  return response?.data?.data;
});

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default productListSlice.reducer;
