// // store/slices/createGroupSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// interface CreateGroupPayload {
//     title: string;
//     field_group_type: string; // "user" or "role"
//     field_users?: string[]; // array of user IDs as strings
//     field_company: string; // company ID
//     body?: string; // optional description
//     node_id: string; // unique identifier for the group updations
// }

// interface CreateGroupState {
//     loading: boolean;
//     success: boolean;
//     error: string | null;
// }

// const initialState: CreateGroupState = {
//     loading: false,
//     success: false,
//     error: null,
// };

// export const createGroup = createAsyncThunk<void, CreateGroupPayload, { rejectValue: string }>('group/createGroup', async (payload, { rejectWithValue }) => {
//     try {
//         const rawToken = Cookies.get('current_user_tt');
//         const parsed = rawToken ? JSON.parse(rawToken) : null;
//         const token = parsed?.token;

//         await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/node_operation`,
//             {
//                 content_type: 'business_user_group',
//                 operation: 'create',
//                 node_data: payload,
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             },
//         );
//     } catch (error: any) {
//         return rejectWithValue(error.response?.data?.message || 'Failed to create group');
//     }
// });

// const createGroupSlice = createSlice({
//     name: 'createGroup',
//     initialState,
//     reducers: {
//         resetCreateGroupState: (state) => {
//             state.loading = false;
//             state.success = false;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createGroup.pending, (state) => {
//                 state.loading = true;
//                 state.success = false;
//                 state.error = null;
//             })
//             .addCase(createGroup.fulfilled, (state) => {
//                 state.loading = false;
//                 state.success = true;
//             })
//             .addCase(createGroup.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload || 'Something went wrong';
//             });
//     },
// });

// export const { resetCreateGroupState } = createGroupSlice.actions;

// export default createGroupSlice.reducer;


// store/slices/groupSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchGroups } from './GetGroupSlice';
import { AppDispatch } from './index'; // Adjust the import path as necessary

interface GroupPayload {
    title: string;
    field_group_type: string;
    field_users?: string[];
    field_company: string;
    body?: string;
    node_id?: string;
}

interface GroupState {
    loading: boolean;
    success: boolean;
    error: string | null;
    mode: 'create' | 'update' | null;
}

const initialState: GroupState = {
    loading: false,
    success: false,
    error: null,
    mode: null,
};

export const saveGroup = createAsyncThunk<
    void,
    GroupPayload,
    { rejectValue: string; dispatch: AppDispatch }
>('group/saveGroup', async (payload, { rejectWithValue, dispatch }) => {
    try {
        const rawToken = Cookies.get('current_user_tt');
        const parsed = rawToken ? JSON.parse(rawToken) : null;
        const token = parsed?.token;

        const isUpdate = Boolean(payload.node_id);

        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/node_operation`,
            {
                content_type: 'business_user_group',
                operation: isUpdate ? 'update' : 'create',
                node_data: payload,
                node_id : payload.node_id || undefined, // Include node_id only for updates
                
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Refresh group list after successful save
        const userData = localStorage.getItem('user_data');
        if (userData) {
            const user = JSON.parse(userData);
            if (user?.business_id) {
                dispatch(fetchGroups(user.business_id));
            }
        }
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to save group');
    }
});

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        resetGroupState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.mode = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGroup.pending, (state, action) => {
                state.loading = true;
                state.success = false;
                state.error = null;
                const isUpdate = Boolean(action.meta.arg.node_id);
                state.mode = isUpdate ? 'update' : 'create';
            })
            .addCase(saveGroup.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(saveGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { resetGroupState } = groupSlice.actions;

export default groupSlice.reducer;