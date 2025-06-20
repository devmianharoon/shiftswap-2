import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface GroupState {
    loading: boolean;
    error: string | null;
    status: 'idle' | 'success' | 'failed';
}

const initialState: GroupState = {
    loading: false,
    error: null,
    status: 'idle',
};

// Define the payload type for the createGroup thunk
interface CreateGroupPayload {
    title: string;
    groupType: string;
    selectedOptions: (string | number)[];
    description?: string;
    companyId: string;
}

// Async thunk to create a group
export const createGroup = createAsyncThunk('group/createGroup', async (payload: CreateGroupPayload, { rejectWithValue }) => {
    try {
        const nodeData: any = {
            title: payload.title,
            field_group_type: payload.groupType,
            field_company: payload.companyId,
        };

        if (payload.groupType === 'role') {
            nodeData.field_roles = payload.selectedOptions as string[];
        } else if (payload.groupType === 'skill') {
            nodeData.field_skills = payload.selectedOptions as string[];
        } else if (payload.groupType === 'user') {
            nodeData.field_users = payload.selectedOptions.map(String); // Convert to strings
        }

        if (payload.description) {
            nodeData.body = payload.description; // Assuming description maps to body
        }
        const rawToken = Cookies.get('current_user_tt');
        const parsed = rawToken ? JSON.parse(rawToken) : null;
        const token = parsed?.token;

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BE_URL}/api/node_operation`,
            {
                content_type: 'business_user_group',
                operation: 'create',
                node_data: nodeData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create group');
    }
});

const createGroupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        resetGroupState: (state) => {
            state.loading = false;
            state.error = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'idle';
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.status = 'failed';
            });
    },
});

export const { resetGroupState } = createGroupSlice.actions;
export default createGroupSlice.reducer;
