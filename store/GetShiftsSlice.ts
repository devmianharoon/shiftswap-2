import { FetchShiftsPayload, Shift } from '@/data/types/Shiftstype';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShiftState {
    shifts: Shift[];
    loading: boolean;
    error: string | null;
}

const initialState: ShiftState = {
    shifts: [],
    loading: false,
    error: null,
};

// Define allowed roles
export const ALLOWED_ROLES = ['business_admin', 'sub_admin', 'manager'];

export const fetchShifts = createAsyncThunk<Shift[], FetchShiftsPayload>('shifts/fetchShifts', async ({ month }, { rejectWithValue }) => {
    try {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
            return rejectWithValue('User data not found in local storage');
        }

        const userData = JSON.parse(userDataString);
        const userRoles: string[] = userData.roles || [];
        const hasAllowedRole = userRoles.some((role: string) => ALLOWED_ROLES.includes(role));
        const query = month ? `?month=${month}` : '';

        // Validate companyId
        if (!userData.business_id) {
            return rejectWithValue('Company ID not found in user data');
        }

        let payload;
        if (hasAllowedRole) {
            // For allowed roles, send null payload
            payload = null;
        } else {
            // For other roles, send uid and skill_id
            payload = {
                uid: String(userData.uid) ,
                skill_id: Array.isArray(userData.skills) ? userData.skills.map((skill: any) => skill.tid) : [],
            };

            if (!payload.uid || !payload.skill_id) {
                return rejectWithValue('Missing uid or skill_id in user data');
            }
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/company/${userData.business_id}/shifts${query}`, payload);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.detail || 'Failed to fetch shifts');
    }
});

const shiftSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShifts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShifts.fulfilled, (state, action) => {
                state.loading = false;
                state.shifts = action.payload;
            })
            .addCase(fetchShifts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default shiftSlice.reducer;
