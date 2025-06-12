import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  uid: number;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  status: boolean;
  profile: string;
  account_type: string;
  company: {
    id: string;
    name: string;
    secret_key: string;
  };
  skills: { tid: string; name: string }[];
  business_name: string | null;
  secret_key: string | null;
  business_type: string | null;
  logo: string | null;
  company_info: {
    business_name: string;
    secret_key: string;
    business_type: { tid: string; name: string };
    logo: string;
  };
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://100.25.74.44:8000/user/${userId}`);
      // Store user data in localStorage
      localStorage.setItem("user_data", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
    }
  }
);

const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user_data");
    },
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user_data");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, loadUserFromStorage } = currentUserSlice.actions;
export default currentUserSlice.reducer;