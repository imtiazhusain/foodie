import axios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = { items: {}, totalItems: 0 };

export const addToCartWithAPI = createAsyncThunk(
  "addToCartWithAPI",
  async (itemId, { getState, rejectWithValue }) => {
    const state = getState();
    const { user } = state.auth; // Assuming you have a user slice with a isLoggedIn field

    if (user) {
      try {
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
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          itemId,
          message: error?.response?.data?.message,
        });
      }
    } else {
      // If the user is not logged in, reject the action
      return { itemId, message: "User not logged in" };
    }
  }
);

export const removeCartItemWithAPI = createAsyncThunk(
  "removeCartItem",
  async (itemId, { getState, rejectWithValue }) => {
    const state = getState();

    const { user } = state.auth;

    if (user) {
      try {
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
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          itemId,
          message: error?.response?.data?.message,
        });
      }
    } else {
      console.log("esle bloack executed,,,,");
      // If the user is not logged in, reject the action
      return { itemId, message: "User not logged in" };
    }
  }
);

export const deleteCartItemWithAPI = createAsyncThunk(
  "deleteCartItem",
  async (itemData, { getState, rejectWithValue }) => {
    const state = getState();

    const { user } = state.auth;
    const { itemId, quantity } = itemData;

    if (user) {
      try {
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
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          itemData,
          message: error?.response?.data?.message,
        });
      }
    } else {
      console.log("esle bloack executed,,,,");
      // If the user is not logged in, reject the action
      return { itemId, message: "User not logged in" };
    }
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

// function mergeCartData(existing, newData) {
//   for (let key in newData) {
//     if (existing.hasOwnProperty(key)) {
//       existing[key] += newData[key];
//     } else {
//       existing[key] = newData[key];
//     }
//   }
// }

function mergeCartData(existing, newData) {
  for (let key in newData) {
    if (existing.hasOwnProperty(key)) {
      console.log("key matched//....");
      existing[key] += newData[key];
    } else {
      existing[key] = newData[key];
    }
  }
  let numberOfUniqueItems = Object.keys(existing).length;
  return {
    updatedData: existing,
    totalItemCart: numberOfUniqueItems,
  };
}
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
    // update state while making api call or if no user is not logged in just update the state
    builder.addCase(addToCartWithAPI.pending, (state, action) => {
      const itemId = action.meta.arg; // Get itemId from the action argument

      if (state.items[itemId]) {
        state.items[itemId] += 1;
      } else {
        state.items[itemId] = 1;
        state.totalItems += 1;
      }
    });

    // Handle the case where the API call succeeds
    builder.addCase(addToCartWithAPI.fulfilled, (state, action) => {
      // No need to do anything here since the state is already updated optimistically
    });

    // Handle the case where the API call fails
    builder.addCase(addToCartWithAPI.rejected, (state, action) => {
      const itemId = action.payload.itemId;
      const message = action.payload.message;

      if (message) {
        // Revert the state change
        if (state.items[itemId] === 1) {
          delete state.items[itemId];
          state.totalItems -= 1;
        } else if (state.items[itemId]) {
          state.items[itemId] -= 1;
        }
        toast.error(message || "Something went wrong");
      }
    });

    // update state while making api call or if no user is not logged in just update the state
    builder.addCase(removeCartItemWithAPI.pending, (state, action) => {
      const itemId = action.meta.arg; // Get itemId from the action argument

      if (state.items[itemId] === 1) {
        delete state.items[itemId];
        state.totalItems -= 1;
      } else {
        state.items[itemId] -= 1;
      }
    });

    // Handle the case where the API call succeeds
    builder.addCase(removeCartItemWithAPI.fulfilled, (state, action) => {
      // No need to do anything here since the state is already updated optimistically
    });

    // Handle the case where the API call fails
    builder.addCase(removeCartItemWithAPI.rejected, (state, action) => {
      const itemId = action.payload.itemId;
      const message = action.payload.message;

      if (message) {
        // Revert the state change

        if (state.items[itemId] === 1) {
          delete state.items[itemId];
          state.totalItems -= 1;
        } else {
          state.items[itemId] -= 1;
        }
        toast.error(message || "Something went wrong");
      }
    });

    // update state while making api call or if no user is not logged in just update the state
    builder.addCase(deleteCartItemWithAPI.pending, (state, action) => {
      const itemData = action.meta.arg; // Get itemId from the action argument

      delete state.items[itemData.itemId];
      state.totalItems -= 1;
    });

    // Handle the case where the API call succeeds
    builder.addCase(deleteCartItemWithAPI.fulfilled, (state, action) => {
      // No need to do anything here since the state is already updated optimistically
    });

    // Handle the case where the API call fails
    builder.addCase(deleteCartItemWithAPI.rejected, (state, action) => {
      const itemData = action.payload.itemData;
      const message = action.payload.message;

      console.log("item data in rejected");
      console.log(itemData);
      if (message) {
        // Revert the state change
        const { itemId, quantity } = itemData;

        state.items[itemId] = quantity;
        state.totalItems += 1;
        toast.error(message || "Something went wrong");
      }
    });

    builder.addCase(getCartDataFromApi.fulfilled, (state, action) => {
      const { totalItemCart, updatedData } = mergeCartData(
        state.items,
        action.payload.cartData
      );
      console.log("....///...//");
      console.log(totalItemCart);
      console.log(updatedData);
      state.items = updatedData;
      state.totalItems = totalItemCart;
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
