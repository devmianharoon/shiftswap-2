import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Skill {
    id: string;
    name: string;
    pid: string;
}

interface SkillsState {
    skills: Skill[];
    skillsLoading: boolean;
    skillsError: string | null;
}

const initialState: SkillsState = {
    skills: [],
    skillsLoading: false,
    skillsError: null,
};

// Async thunk to fetch skills
export const fetchSkills = createAsyncThunk('skills/fetchSkills', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/business_types_and_skills`);
        // Filter skills where pid is null or undefined
        const filteredSkills = response.data.filter((item: Skill) => !item.pid);
        return filteredSkills;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch skills');
    }
});

const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        clearSkillsError(state) {
            state.skillsError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.pending, (state) => {
                state.skillsLoading = true;
                state.skillsError = null;
            })
            .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
                state.skillsLoading = false;
                state.skills = action.payload;
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.skillsLoading = false;
                state.skillsError = action.payload as string;
            });
    },
});

export const { clearSkillsError } = skillsSlice.actions;
export default skillsSlice.reducer;