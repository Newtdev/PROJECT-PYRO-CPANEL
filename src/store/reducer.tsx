import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "src/api/apiSlice";
import authSlice from "src/features/auth/authSlice";

export const reducer = combineReducers({
	authSlice,
	[apiSlice.reducerPath]: apiSlice.reducer,
});
