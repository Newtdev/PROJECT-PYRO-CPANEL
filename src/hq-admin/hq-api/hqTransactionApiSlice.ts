import { apiSlice } from "src/api/apiSlice";
import { API_ROUTE } from "src/helpers/Constant";

export const hqTransactionSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllHQTransactions: builder.query({
			query: (params) =>
				`${API_ROUTE.FETCH_ALL_TRANSACTION}?limit=8&source=${params?.source}&orderBy=createdAt:desc&who=${params.who}&for=${params.for}`,
		}),
	}),
});

export const { useGetAllHQTransactionsQuery } = hqTransactionSlice;
