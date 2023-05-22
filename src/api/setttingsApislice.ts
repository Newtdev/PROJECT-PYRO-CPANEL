import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAdmin: builder.query({
			query: (params) =>
				`${API_ROUTE.SINGLE_ADMIN}?limit=5&search=${params.query}&page=${params.page}`,
		}),
	}),
});

export const { useGetAdminQuery } = settingsAPISlice;
