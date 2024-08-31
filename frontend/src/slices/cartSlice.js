import axios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { items: {}, totalItems: 0 };

export const addToCartWithAPI = createAsyncThunk(
  "addToCartWithAPI",
  async (itemId, { getState }) => {
    const state = getState();
    const { user } = state.auth; // Assuming you have a user slice with a isLoggedIn field

    if (user) {
      // Make an API call here
      await axios.post(
        "/cart/add_cart_item",
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
    }

    return itemId; // Return the itemId to be used in the reducer
  }
);

export const removeCartItemWithAPI = createAsyncThunk(
  "removeCartItem",
  async (itemId, { getState }) => {
    const state = getState();

    const { user } = state.auth;

    if (user) {
      // Make an API call here
      await axios.post(
        "/cart/remove_cart_item",
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
    }

    return itemId;
  }
);

export const deleteCartItemWithAPI = createAsyncThunk(
  "deleteCartItem",
  async (itemId, { getState }) => {
    const state = getState();

    const { user } = state.auth;

    if (user) {
      // Make an API call here
      await axios.post(
        "/cart/delete_cart_item",
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
    }

    return itemId;
  }
);

export const getCartDataFromApi = createAsyncThunk(
  "getCartDataFromApi",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { user } = state.auth; // Assuming you have a user slice with a isLoggedIn field

    let response = {};
    console.log("...../......");
    if (user) {
      try {
        let resp = await axios.get("/cart/get_cart_data", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        console.log("res.....");
        console.log(resp);
        response = resp?.data?.data || {};
      } catch (error) {
        console.log(error);
        return rejectWithValue({});
      }
    } else {
      // If user is not logged in, return an empty object or handle it accordingly
      return rejectWithValue({});
    }

    return response; // Return the itemId to be used in the reducer
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(addToCartWithAPI.fulfilled, (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId] += 1;
      } else {
        state.items[itemId] = 1;
        state.totalItems += 1;
      }
    });
    builder.addCase(removeCartItemWithAPI.fulfilled, (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId] === 1) {
        delete state.items[itemId];
        state.totalItems -= 1;
      } else {
        state.items[itemId] -= 1;
      }
    });

    builder.addCase(deleteCartItemWithAPI.fulfilled, (state, action) => {
      const itemId = action.payload;
      delete state.items[itemId];
      state.totalItems -= 1;
    });
    builder.addCase(getCartDataFromApi.fulfilled, (state, action) => {
      state.items = action.payload.cartData;
      state.totalItems = action.payload.totalCartItems;
    });
    builder.addCase(getCartDataFromApi.rejected, (state, action) => {
      console.log("rejected......");
      console.log(action?.payload);
      // state.items = action.payload;
    });
  },
});

export const { deleteItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
