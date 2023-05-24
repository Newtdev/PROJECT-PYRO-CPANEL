import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTransactions: builder.query({
			query: () => `${API_ROUTE.FETCH_ALL_TRANSACTION}?limit=8`,
		}),
	}),
});

export const { useGetAllTransactionsQuery } = settingsAPISlice;
