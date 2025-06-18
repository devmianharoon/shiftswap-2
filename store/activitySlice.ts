// store/slices/activitySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActivityState {
  userActivity: Record<string, number>; // userId -> timestamp
}

const initialState: ActivityState = {
  userActivity: {},
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    markUserActive: (state, action: PayloadAction<{ userId: string; timestamp: number }>) => {
      state.userActivity[action.payload.userId] = action.payload.timestamp;
    },
  },
});

export const { markUserActive } = activitySlice.actions;
export default activitySlice.reducer;
