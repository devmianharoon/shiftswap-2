// store/slices/groupSlice.ts
import { Group } from '@/data/types/GetGroupTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

// Async thunk to fetch groups
export const fetchUserGroups = createAsyncThunk<Group[], { companyId: string; userId: string }>('groups/fetchGroups', async ({ companyId, userId }, thunkAPI) => {
  try {
    const response = await axios.get<Group[]>(`${process.env.NEXT_PUBLIC_BE_URL}/company/${companyId}/groups/${userId}`, {
      headers: { accept: 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch groups');
  }
});

const userGroupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchUserGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userGroupSlice.reducer;
