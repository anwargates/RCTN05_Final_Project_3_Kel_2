import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =
{
  hotel: []
}

export const Booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    booking: (state, action) => {
      state.hotel.push(action.payload)
    },
  },
});

// console.log(Slicer)
export const { booking } = Booking.actions
export default Booking.reducer;
