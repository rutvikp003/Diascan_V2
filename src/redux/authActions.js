import API from "../api"; // Import Axios instance
import { setUser } from "./authSlice";

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await API.post("/auth/login", { email, password });

    // Save token in localStorage
    localStorage.setItem("token", data.token);

    // Dispatch user data to Redux store
    dispatch(setUser({ name: data.user.name, email: data.user.email, token: data.token }));
  } catch (error) {
    console.error("Login error:", error.response?.data?.msg || error.message);
  }
};

// Signup Action
export const signup = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await API.post("/auth/signup", { name, email, password });

    // Save token in localStorage
    localStorage.setItem("token", data.token);

    // Dispatch user data to Redux store
    dispatch(setUser({ name: data.user.name, email: data.user.email, token: data.token }));
  } catch (error) {
    console.error("Signup error:", error.response?.data?.msg || error.message);
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove token
  dispatch({ type: "auth/logout" }); // Clear Redux state
};
