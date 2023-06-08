import { apiSlice } from "src/api/apiSlice";
import { HQ_API_ENPOINTS } from "src/helpers/Constant";

export const hqTransactionSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllHQTransactions: builder.query({
			query: (params) =>
				`${HQ_API_ENPOINTS.TRANSACTIONS}?limit=8&source='6481fde78da5c89e28a72677'&orderBy=createdAt:desc`,
		}),
	}),
});

export const { useGetAllHQTransactionsQuery } = hqTransactionSlice;
