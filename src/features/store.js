import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/movieSlice';
import userReducer from './user/userSlice';
import { userMiddleware } from './user/userMiddleware';

export const store = configureStore({
	reducer: {
		movies: moviesReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userMiddleware),
});