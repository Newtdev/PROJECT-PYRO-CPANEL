import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTransactions: builder.query({
			query: (params) =>
				`${API_ROUTE.FETCH_ALL_TRANSACTION}?limit=8&source=${params?.source}&orderBy=createdAt:desc&who=stations&for=station_branch`,
		}),
	}),
});

export const { useGetAllTransactionsQuery } = settingsAPISlice;
