import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface DeleteGroupState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: DeleteGroupState = {
    loading: false,
    success: false,
    error: null,
};

// Async thunk
export const deleteGroup = createAsyncThunk<void, { node_id: string; }, { rejectValue: string }>('group/deleteGroup', async ({ node_id }, { rejectWithValue }) => {
    try {
        const rawToken = Cookies.get('current_user_tt');
        const parsed = rawToken ? JSON.parse(rawToken) : null;
        const token = parsed?.token;

        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/node_operation`,
            {
                content_type: 'business_user_group',
                operation: 'delete',
                node_id: node_id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to delete group');
    }
});

const deleteGroupSlice = createSlice({
    name: 'deleteGroup',
    initialState,
    reducers: {
        resetDeleteState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteGroup.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(deleteGroup.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { resetDeleteState } = deleteGroupSlice.actions;

export default deleteGroupSlice.reducer;
