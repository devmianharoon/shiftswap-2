import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import authReducer from '@/store/AuthSlice';
import userReducer from '@/store/RegisterSlice';
import currentUserSlice from '@/store/UserSlice';
import companyMembersReducer from '@/store/MembersSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authReducer,
    register: userReducer,
    currentUser: currentUserSlice,
    members: companyMembersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
