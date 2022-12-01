import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Moment from 'moment';

import { API_HOST, API_KEY } from "../api/api";

// definisi date hari ini
const today = new Date()
const todayDate = Moment(today).format('YYYY-MM-DD')
const departureDate = Moment(today).add(1, 'days').format('YYYY-MM-DD')

// request api untuk mendapatkan Destination ID
const optionsGetDestID = (location) => {
  return ({
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
    params: { text: location, languagecode: 'en-us' },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
};

// request api untuk mendapatkan list Hotel sesuai search
const optionsGetSearch = ({ destinationID, destinationType, startDate, endDate, guest }) => {
  console.log({ destinationID, destinationType, startDate, endDate, guest })
  return ({
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
    params: {
      offset: '10',
      arrival_date: startDate,
      departure_date: endDate,
      guest_qty: guest,
      dest_ids: destinationID,
      room_qty: '1',
      search_type: destinationType
      // optional params below
      //...
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
};



const initialState =
{
  searchID: "",
  entities: [],
}

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async ({ location, startDate = todayDate, endDate = departureDate, guest = 1 }) => {
    console.log("FETCHING ITEMS...")
    const response = await axios.request(optionsGetDestID(location)).then(res => {
      const destinationID = res.data[0].dest_id
      const destinationType = res.data[0].dest_type
      console.log(destinationID)
      return axios.request(optionsGetSearch({ destinationID, destinationType, startDate, endDate, guest }))
    }).catch(e => console.log("error", e))
    console.log("response data", response.data)
    return response.data
  }
);

export const Slicer = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHotels.fulfilled, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.entities = [];
        state.searchID = action.payload.search_id;
        state.entities.push(...action.payload.result);
      })
  },
});

// console.log(Slicer)
// export const { checkout, updateStock } = Slicer.actions
export default Slicer.reducer;
