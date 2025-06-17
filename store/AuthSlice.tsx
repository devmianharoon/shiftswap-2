import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for the API response and thunk arguments
interface LoginResponse {
  current_user: { uid: string; name: string };
  csrf_token: string;
  logout_token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Define the async thunk with typed arguments and return value
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login  `,
        {
          username: email,  // Changed from "name" to "username"
          password: password, // Changed from "pass" to "password"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Optional if you need to include cookies
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// export const loginUser = createAsyncThunk<
//   LoginResponse,
//   LoginCredentials,
//   { rejectValue: string }
// >(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       // First, fetch the CSRF token
//       const csrfResponse = await axios.get<string>(
//         `${process.env.NEXT_PUBLIC_API_URL}/session/token`
//       );
//       const csrfToken = csrfResponse.data;

//       // Then, make the login request with the CSRF token
//       const response = await axios.post<LoginResponse>(
//         `${process.env.NEXT_PUBLIC_API_URL}/user/login?_format=json`,
//         {
//           name: email,
//           pass: password,
//         },
//         {
//           headers: {
//             "X-CSRF-Token": csrfToken,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );
//       // console.log("Login response:", response.data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// Define the auth state type
interface AuthState {
  user: { uid: string; name: string } | null;
  csrf_token: string | null;
  logout_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  csrf_token: null,
  logout_token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.csrf_token = null;
      state.logout_token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.current_user;
        state.csrf_token = action.payload.csrf_token;
        state.logout_token = action.payload.logout_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;