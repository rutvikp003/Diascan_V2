import { createSlice } from "@reduxjs/toolkit";

// Get stored token & user data from localStorage
const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedToken, // true if token exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload); // Store token in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Export actions
export const { setUser, setToken, logout } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Export reducer
export default authSlice.reducer;
