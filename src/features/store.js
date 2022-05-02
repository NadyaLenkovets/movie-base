import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { userMiddleware } from './user/userMiddleware';
import { moviesAPI } from '../common/apis/moviesAPI';

export const store = configureStore({
	reducer: {
		[moviesAPI.reducerPath]: moviesAPI.reducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([moviesAPI.middleware, userMiddleware]),
});