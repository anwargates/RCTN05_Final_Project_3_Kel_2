import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Moment from 'moment';

import { API_HOST, API_KEY } from "../api/api";

// definisi date hari ini
const today = new Date()
const todayDate = Moment(today).format('YYYY-MM-DD')
const departureDate = Moment(today).add(1, 'days').format('YYYY-MM-DD')

// request api untuk mendapatkan Hotel Details
const optionsDetails = ({ id, searchID, startDate, endDate, guest }) => {
  return ({
    method: 'GET',
    url: `https://apidojo-booking-v1.p.rapidapi.com/properties/detail`,
    params: {
      hotel_id: id,
      search_id: searchID,
      departure_date: endDate,
      arrival_date: startDate,
      rec_guest_qty: guest,
      rec_room_qty: '1'
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
};

// request api untuk mendapatkan Destination ID
const optionsGetHotelPhotos = (id) => {
  return ({
    method: 'GET',
    url: `https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos`,
    params: { hotel_ids: id },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
};

// request api untuk mendapatkan list Hotel sesuai search
const optionsGetReviews = (id) => {
  return ({
    method: 'GET',
    url: `https://apidojo-booking-v1.p.rapidapi.com/properties/get-featured-reviews`,
    params: { hotel_id: id },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
};

const initialState =
{
  details: {},
  photos: [],
  prefixUrl: "",
  reviews: [],
}

export const fetchDetails = createAsyncThunk(
  "hotels/fetchDetails",
  async ({ id, searchID, startDate = todayDate, endDate = departureDate, guest = 1 }) => {
    console.log(`FETCHING HOTEL DETAIL BY ID ${id}`)
    const responseDetails = axios.request(optionsDetails({ id, searchID, startDate, endDate, guest })).catch(e => console.log("error fetching details", e))
    const responsePhotos = axios.request(optionsGetHotelPhotos(id)).catch(e => console.log("error fetching photos", e))
    const responseReviews = axios.request(optionsGetReviews(id)).catch(e => console.log("error fetching reviews", e))
    const response = await axios.all([responseDetails, responsePhotos, responseReviews]).catch(e => console.log("error", e))

    console.log("response all data", response)
    return response
  }
);

export const HotelDetails = createSlice({
  name: "hotelDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetails.fulfilled, (state, action) => {
        console.log("PAYLOAD", action.payload)
        const filtered = Object.keys(action.payload[1].data.data)[0]
        state.details = {};
        state.photos = [];
        state.reviews = [];
        state.details = action.payload[0].data[0];
        state.photos.push(...action.payload[1].data.data[filtered].slice(0,5));
        state.prefixUrl = action.payload[1].data.url_prefix;
        state.reviews.push(...action.payload[2].data.vpm_featured_reviews.slice(0,5));
      })
  },
});

// console.log(Slicer)
// export const { checkout, updateStock } = Slicer.actions
export default HotelDetails.reducer;
