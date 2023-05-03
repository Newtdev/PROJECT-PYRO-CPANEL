import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "src/api/apiSlice";
import { reducer } from "./reducer";

export const store = configureStore({
	reducer,

	middleware: (getDefaultMiddleware): any =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
