import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import authReducer from '@/store/AuthSlice';
import userReducer from '@/store/RegisterSlice';
import currentUserSlice from '@/store/UserSlice';
import companyMembersReducer from '@/store/MembersSlice';
import activityReducer from '@/store/activitySlice';
import skillsReducer from '@/store/skillsSlice';
import groupReducer from '@/store/GetGroupSlice';
import userGroupReducer from '@/store/UserGroupSlice';
import deleteGroupReducer from '@/store/DeleteGroup';
import createGroupReducer from '@/store/CreateGroup';
import shiftReducer from '@/store/GetShiftsSlice';
import shiftOperationReducer from '@/store/CreateOrUpdateShiftSlice';
import rolesReducer from '@/store/RoleSlice';
import { group } from 'node:console';
const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authReducer,
  register: userReducer,
  currentUser: currentUserSlice,
  members: companyMembersReducer,
  activity: activityReducer,
  skills: skillsReducer,
  getgroups: groupReducer,
  userGroups: userGroupReducer, // Assuming this is the same as getgroups
  createGroup: createGroupReducer,
  deleteGroup: deleteGroupReducer,
  getShifts: shiftReducer,
  createOrUpdateShift: shiftOperationReducer,
  roles: rolesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
