//FETCH_ALL_USER

import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const selfHelpAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllSelfHelp: builder.query({
			query: (params) =>
				`${API_ROUTE.SELF_HELP}?search=${params?.query}&page=${params?.page}`,
		}),
		fetchUser: builder.query({
			query: (id) => `${API_ROUTE.FETCH_ALL_USER}/${id}`,
		}),
	}),
});

export const { useFetchAllSelfHelpQuery, useFetchUserQuery } = selfHelpAPISlice;
