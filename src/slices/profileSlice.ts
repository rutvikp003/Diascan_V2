import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProfileState {
  profile: {
    name: string;
    email: string;
    dob: string;
    gender: string;
    profileImage?: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: null,
};

// Fetch profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const response = await axios.get("http://localhost:5000/api/auth/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
});

// Update profile ✅ Ensure it accepts an argument
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updatedProfile: {
    name: string;
    email: string;
    dob: string;
    gender: string;
    profileImage?: string;
  }) => {
    const response = await axios.put("/api/profile", updatedProfile);
    return response.data;
  }
);

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default profileSlice.reducer;
