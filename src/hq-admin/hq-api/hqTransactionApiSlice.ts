import { apiSlice } from "src/api/apiSlice";
import { HQ_API_ENPOINTS } from "src/helpers/Constant";

export const hqTransactionSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllHQTransactions: builder.query({
			query: (id) =>
				`${HQ_API_ENPOINTS.TRANSACTIONS}?stationBranch=${id}&limit=8&orderBy=createdAt:desc`,
		}),
	}),
});

export const { useGetAllHQTransactionsQuery } = hqTransactionSlice;
