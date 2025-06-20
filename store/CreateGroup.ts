// store/slices/createGroupSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CreateGroupPayload {
    title: string;
    field_group_type: string; // "user" or "role"
    field_users?: string[]; // array of user IDs as strings
    field_company: string; // company ID
    body?: string; // optional description
}

interface CreateGroupState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: CreateGroupState = {
    loading: false,
    success: false,
    error: null,
};

export const createGroup = createAsyncThunk<void, CreateGroupPayload, { rejectValue: string }>('group/createGroup', async (payload, { rejectWithValue }) => {
    try {
        const rawToken = Cookies.get('current_user_tt');
        const parsed = rawToken ? JSON.parse(rawToken) : null;
        const token = parsed?.token;

        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/node_operation`,
            {
                content_type: 'business_user_group',
                operation: 'create',
                node_data: payload,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create group');
    }
});

const createGroupSlice = createSlice({
    name: 'createGroup',
    initialState,
    reducers: {
        resetCreateGroupState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { resetCreateGroupState } = createGroupSlice.actions;

export default createGroupSlice.reducer;
