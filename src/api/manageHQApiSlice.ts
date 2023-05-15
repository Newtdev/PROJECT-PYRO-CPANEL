import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const manageHqAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllHQ: builder.query({
			query: () => API_ROUTE.GET_ALL_HQ,
		}),
	}),
});

export const { useFetchAllHQQuery } = manageHqAPISlice;
