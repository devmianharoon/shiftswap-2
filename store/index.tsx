import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import authReducer from '@/store/AuthSlice';
import userReducer from '@/store/RegisterSlice';
import currentUserSlice from '@/store/UserSlice';
import companyMembersReducer from '@/store/MembersSlice';
import activityReducer from '@/store/activitySlice';
import skillsReducer from '@/store/skillsSlice';
import groupReducer from '@/store/GetGroupSlice';
import deleteGroupReducer from '@/store/DeleteGroup';
import createGroupReducer from '@/store/CreateGroup';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authReducer,
    register: userReducer,
    currentUser: currentUserSlice,
    members: companyMembersReducer,
    activity: activityReducer,
    skills: skillsReducer,
    getgroups: groupReducer,
    deleteGroup: deleteGroupReducer,
    createGroup: createGroupReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
