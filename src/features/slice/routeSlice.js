import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =
{
  route: "",
}

export const RouteSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    subscribeRoute: (state, action) => {
      state.route = action.payload
    },
  },
});

// console.log(Slicer)
export const { subscribeRoute } = RouteSlice.actions
export default RouteSlice.reducer;
