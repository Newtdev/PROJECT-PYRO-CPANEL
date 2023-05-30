/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "src/features/auth/authSlice";
import { RootState } from "src/store/store";

// headers.set("Content-Type", "multipart/form-data");

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_API_URL,
	prepareHeaders: (headers, { getState }) => {
		const appState = getState() as RootState;
		const token = appState?.authSlice?.token?.accessToken;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const customBaseQuery = async (args: string, api: any, extraOptions: {}) => {
	// eslint-disable-next-line no-undef
	let result = await baseQuery(args, api, extraOptions);
	if (result?.error?.status === 401) {
		api.dispatch(logOut());
		// eslint-disable-next-line no-undef
		const refreshResult = await baseQuery("api", api, extraOptions);
		console.log(refreshResult);

		if (refreshResult?.data) {
			// const user = api.getState().auth.user;
			// api.dispatch(setCredentials({ ...resultRefresh.data, user }));

			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: customBaseQuery,
	tagTypes: ["MANAGE_HQ", "MANAGE_BRANCH", "FEEDS", "SELF_HELP"],
	endpoints: (builder) => ({}),
});
