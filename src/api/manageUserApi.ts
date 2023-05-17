//FETCH_ALL_USER

import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const manageHqAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllUser: builder.query({
			query: (params) =>
				`${API_ROUTE.FETCH_ALL_USERS}?search=${params?.query}&page=${params?.page}`,
		}),
		fetchUser: builder.query({
			query: (id) => `${API_ROUTE.FETCH_ALL_USER}/${id}`,
		}),
	}),
});

export const { useFetchAllUserQuery, useFetchUserQuery } = manageHqAPISlice;
