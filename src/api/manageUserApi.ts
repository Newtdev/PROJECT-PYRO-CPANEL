//FETCH_ALL_USER

import { API_ROUTE } from "src/helpers/Constant";
import { apiSlice } from "./apiSlice";

export const manageUserAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllUser: builder.query({
			query: (params) =>
				`${API_ROUTE.FETCH_ALL_USERS}?search=${params?.query}&page=${params?.page}&limit=8`,
		}),
		fetchUser: builder.query({
			query: (id) => `${API_ROUTE.FETCH_ALL_USER}/${id}`,
		}),
	}),
});

export const { useFetchAllUserQuery, useFetchUserQuery } = manageUserAPISlice;
