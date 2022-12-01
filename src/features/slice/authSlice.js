import { useNavigation } from "@react-navigation/native";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoginPending: false,
  isLoginSuccess: false,
  isLoginRejected: null,
  errorMessage: null,
  user: {
    email: "",
  },
}

function callLoginApi(email, password) {
  return new Promise(function (resolve, reject) {
    // let token = ""
    setTimeout(() => {
      // token = ""
      if (email === "user@gmail.com" && password === "user123") { resolve({ email }) }
      else { reject("USER/PASSWORD SALAH") }
      // axios.post('https://fakestoreapi.com/auth/login', {
      //   username: email,
      //   password
      // }).then(res => {
      //   console.log("LOGIN RESPONSE", res)
      //   token = res.data.token
      //   console.log("LOGIN TOKEN", token)
      //   resolve({ email, role: "user", token })
      // }).catch(err => reject("Email/username atau password salah"))
    }, 1000);
  });
}


export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await callLoginApi(email, password);
      console.log("RESPONSE IN AUTH LOGIN", response)
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // console.log("STATE IN LOGOUT",state)
      // console.log("STATE IN LOGOUT",state.isLoginSuccess)
      state.isLoginSuccess = false
      state.user = {
        email: "",
      }
      // localStorage.removeItem('auth')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authLogin.pending, (state) => {
        state.isLoginSuccess = false;
        state.isLoginPending = true;
        state.isLoginRejected = false;
        state.errorMessage = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        // console.log("fulfilled");
        // console.log(action);
        const { email } = action.payload;
        state.isLoginPending = false;
        state.isLoginSuccess = true;
        state.isLoginRejected = false;
        state.errorMessage = null
        state.user = { email };
      })
      .addCase(authLogin.rejected, (state, action) => {
        // console.log(action, "rejected");
        state.isLoginPending = false;
        state.isLoginSuccess = false;
        state.isLoginRejected = true;
        state.token = null
        state.errorMessage = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
