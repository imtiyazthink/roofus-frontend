import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogin: localStorage.getItem("isAuth") === "true" ? true : false,
  accessToken: "",
  userId: localStorage.getItem("userId") || undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    setAccessToken(state, action) {
      localStorage.setItem("accessToken", action.payload.value);
      state.accessToken = `Bearer ${action.payload.value}`;
    },
    setUserId(state, action) {
      localStorage.setItem("userId", action.payload.value);
      state.userId = action.payload.value;
    },
    removeAccessToken(state) {
      localStorage.removeItem("accessToken");
      state.accessToken = "";
    },
    removeUserId(state) {
      localStorage.removeItem("userId");
      state.userId = "";
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
