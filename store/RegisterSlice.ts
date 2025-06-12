import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for the API response and thunk arguments
interface RegisterResponse {
    userId: string;
    message?: string; // Made optional since it might not always be present
}

// interface RegisterData {
//     name?: { value: string }[];
//     mail?: { value: string }[];
//     pass?: { value: string }[];
//     field_account_type?: { value: 'member' | 'business' }[]; // Changed to lowercase for consistency
//     field_phone?: { value: string }[];
//     field_secret_code?: { value: string }[];
//     field_company_type?: { target_id: string | number }[];
//     field_skill_type?: { target_id: string | number }[];
//     businessName?: { value: string }[];
//     businessType?: { value: string }[];
//     field_logo	?: { value: string }[];
//     user_picture?: { target_id: string | number }[];
// }
interface RegisterData {
  name?: { value: string }[];                         // Username
  mail?: { value: string }[];                         // Email
  pass?: { value: string }[];                         // Password

  field_account_type?: { value: 'member' | 'business' }[]; // List (text)

  field_business_name?: { value: string }[];          // Business Name
  field_business_secret_key?: { value: string }[];    // Business Secret Key

  field_business_type?: { target_id: string | number }[]; // Taxonomy term
  field_company?: { target_id: string | number }[];        // User reference

  field_logo?: { target_id: string | number }[];       // Image (file entity ID)
  user_picture?: { target_id: string | number }[];     // Image (file entity ID)

  field_phone?: { value: string }[];                   // Phone number
  field_skills?: { target_id: string | number }[];     // Taxonomy term
}

// Define the async thunk with typed arguments and return value
export const registerUser = createAsyncThunk<RegisterResponse, { requestData: RegisterData; role: string }, { rejectValue: string }>(
    'user/register',
    async ({ requestData }, { rejectWithValue }) => {
      console.log('Registering user with data:', requestData);
        try {
            const response = await axios.post<RegisterResponse>(`${process.env.NEXT_PUBLIC_API_URL}/user/register?_format=json`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('Registration response:', response.data);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            return rejectWithValue(errorMessage);
        }
    },
);

// Define the user state type
interface UserState {
    user: { userId: string } | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistration: (state) => {
            state.user = null;
            state.error = null;
        },
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
                // Only set error if message indicates an issue, otherwise clear it
                state.error = action.payload.message && action.payload.message.includes('error') ? action.payload.message : null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
    },
});

export const { resetRegistration } = userSlice.actions;
export default userSlice.reducer;