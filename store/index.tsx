import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import authReducer from '@/store/AuthSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
      auth: authReducer,

});

export const store =  configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
