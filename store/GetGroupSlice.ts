// store/slices/groupSlice.ts
import { GroupData } from '@/data/types/GetGroupTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GroupState {
  data: GroupData;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  data: {
    groups: [],
    total: 0,
  },
  loading: false,
  error: null,
};

// Async thunk to fetch groups
export const fetchGroups = createAsyncThunk<GroupData, { companyId: string; page?: number }>(
  'groups/fetchGroups',
  async ({ companyId, page }, thunkAPI) => {
    try {
      const response = await axios.get<GroupData>(
        `${process.env.NEXT_PUBLIC_BE_URL}/company/${companyId}/groups?page=${page}`,
        {
          headers: { accept: 'application/json' },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch groups');
    }
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupSlice.reducer;
