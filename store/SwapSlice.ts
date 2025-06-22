import { CreateSwapPayload, SwapResponse, SwapState, UpdateSwapPayload } from '@/data/types/SwapTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/node_operation`;

function getToken() {
    const rawToken = Cookies.get('current_user_tt');
    const parsed = rawToken ? JSON.parse(rawToken) : null;
    return parsed?.token;
}

export const createSwap = createAsyncThunk<SwapResponse, CreateSwapPayload, { rejectValue: string }>(
    'swap/create',
    async (payload, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.post(
                API_ENDPOINT,
                {
                    content_type: 'shift_swap',
                    operation: 'create',
                    node_data: payload,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Create swap failed');
        }
    }
);

export const updateSwap = createAsyncThunk<SwapResponse, UpdateSwapPayload, { rejectValue: string }>(
    'swap/update',
    async ({ node_id, updates }, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.post(
                API_ENDPOINT,
                {
                    content_type: 'shift_swap',
                    operation: 'update',
                    node_id,
                    node_data: updates,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update swap failed');
        }
    }
);

export const deleteSwap = createAsyncThunk<SwapResponse, number, { rejectValue: string }>(
    'swap/delete',
    async (node_id, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.post(
                API_ENDPOINT,
                {
                    content_type: 'shift_swap',
                    operation: 'delete',
                    node_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete swap failed');
        }
    }
);

const initialState: SwapState = {
    loading: false,
    error: null,
    swapData: null,
};

const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSwap.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSwap.fulfilled, (state, action: PayloadAction<SwapResponse>) => {
                state.loading = false;
                state.swapData = action.payload.data || null;
            })
            .addCase(createSwap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            })

            .addCase(updateSwap.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSwap.fulfilled, (state, action: PayloadAction<SwapResponse>) => {
                state.loading = false;
                state.swapData = action.payload.data || null;
            })
            .addCase(updateSwap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            })

            .addCase(deleteSwap.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSwap.fulfilled, (state) => {
                state.loading = false;
                state.swapData = null;
            })
            .addCase(deleteSwap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            });
    },
});

export default swapSlice.reducer;
