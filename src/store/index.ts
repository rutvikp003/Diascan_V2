import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Auth slice for managing user authentication
    profile: profileReducer, // Ensure profile slice is included here

  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
