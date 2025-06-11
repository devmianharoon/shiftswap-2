import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for the API response and thunk arguments
interface RegisterResponse {
  // Define the expected response structure if any
  userId: string;
  message: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  picture: string;
  phone: string;
  accountType: string;
  businessName: string;
  logo: string;
  businessSecretKey: string;
  businessType: string;
  skill: string;
}

// Define the async thunk with typed arguments and return value
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterData,
  { rejectValue: string }
>(
  'user/register',
  async (requestData, { rejectWithValue }) => {
    try {
      const csrfResponse = await axios.get<string>(
        `${process.env.NEXT_PUBLIC_API_URL}/session/token`
      );
      const csrfToken = csrfResponse.data;

      const response = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register?_format=json`,
        requestData,
        {
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Define the user state type
interface UserState {
  user: { userId: string } | null;
  message: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  message: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.user = null;
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { userId: action.payload.userId };
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  }
});

export const { resetRegistration } = userSlice.actions;
export default userSlice.reducer;