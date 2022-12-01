import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =
{
  list: [],
}

export const Wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemInList = state.list.find((item) => item.id === action.payload.id);
      if (itemInList) {
        state.list = state.list.filter((item) => item.id !== action.payload.id)
      } else {
        state.list.push(action.payload);
      }
    },
  },
});

// console.log(Slicer)
export const { addToWishlist } = Wishlist.actions
export default Wishlist.reducer;
