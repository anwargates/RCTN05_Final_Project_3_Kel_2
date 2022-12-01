import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/slice/authSlice";
import bookingSlice from "../features/slice/bookingSlice";
import hotelDetailSlice from "../features/slice/hotelDetailSlice";
import hotelSlice from "../features/slice/hotelSlice";
import profileSlice from "../features/slice/profileSlice";
import routeSlice from "../features/slice/routeSlice";
import wishlistSlice from "../features/slice/wishlistSlice";

// kombinasi beberapa reducer
const rootReducer = combineReducers({
  auth: userSlice,
  profile: profileSlice,
  hotels: hotelSlice,
  hotelDetail: hotelDetailSlice,
  wishlist: wishlistSlice,
  booking: bookingSlice,
  route: routeSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

store.subscribe(() => {
  console.log("STORE STATE",store.getState().route)
})