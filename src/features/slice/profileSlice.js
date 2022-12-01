import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =
{
  firstName: "Ahmad",
  lastName: "Saifullah",
  email: "user@gmail.com",
  phoneNumber: "8988372232",
  gender: "Pria",
  language: "Indonesia",
}

export const Profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      const { firstName, lastName, email, gender, language } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.email = email
      state.gender = gender
      state.language = language
    },
  },
});

// console.log(Slicer)
export const { changeProfile } = Profile.actions
export default Profile.reducer;
