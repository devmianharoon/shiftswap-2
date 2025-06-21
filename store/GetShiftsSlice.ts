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

export const fetchShifts = createAsyncThunk<Shift[], FetchShiftsPayload>('shifts/fetchShifts', async ({ companyId, month, user }, { rejectWithValue }) => {
    try {
        const query = month ? `?month=${month}` : '';
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/company/${companyId}/shifts${query}`, user ?? null);
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
