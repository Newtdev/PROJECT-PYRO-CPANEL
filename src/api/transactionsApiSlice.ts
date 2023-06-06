import { API_ROUTE } from "src/helpers/Constant";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTransactions: builder.query({
			query: (params) =>
				`${API_ROUTE.FETCH_ALL_TRANSACTION}?limit=8&source=${params?.source}&orderBy=createdAt:desc&who=${params.who}&for=${params.for}`,
		}),
	}),
});

export const { useGetAllTransactionsQuery } = settingsAPISlice;
