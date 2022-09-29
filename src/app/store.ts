import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userApi } from '../api/UserApi';
import userReducer from '../pages/Home/userSlice';
import loaderReducer from './loaderSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
