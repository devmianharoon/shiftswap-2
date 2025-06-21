import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ShiftPayload {
    content_type: string;
    operation: 'create' | 'update ' | 'delete';
    node_id?: number;
    node_data?: {
        title?: string;
        field_company?: number;
        field_groups?: number[];
        field_shift_assign_to?: 'users' | 'groups';
        field_shift_start_date?: string;
        field_shift_end_date?: string;
        field_users?: number[];
    };
}

interface ShiftState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: ShiftState = {
    loading: false,
    error: null,
    success: false,
};

export const createOrUpdateShift = createAsyncThunk('shift/createOrUpdate', async (payload: ShiftPayload, { rejectWithValue }) => {
    try {
        const rawToken = Cookies.get('current_user_tt');
        const parsed = rawToken ? JSON.parse(rawToken) : null;
        const token = parsed?.token;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/node_operation`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Shift operation failed');
    }
});

const shiftOperationSlice = createSlice({
    name: 'shiftOperation',
    initialState,
    reducers: {
        resetShiftState: (state) => {
            state.success = false;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrUpdateShift.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrUpdateShift.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createOrUpdateShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetShiftState } = shiftOperationSlice.actions;
export default shiftOperationSlice.reducer;
