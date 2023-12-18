import { apiSlice } from "src/api/apiSlice";
import { HQ_API_ENPOINTS } from "src/helpers/Constant";
//pyro-staging-api.up.railway.app/api/v1/station/branch/withdraw-request?populate=stationBranch,stationHQ&status=pending&stationBranch=646a59a6d55ce81a82c07548&stationHq={{STATION_HQ}}

export const hqTransactionSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllHQTransactions: builder.query({
			query: (id: any) =>
				`${HQ_API_ENPOINTS.TRANSACTIONS}?stationBranch=${id}&limit=8&orderBy=createdAt:desc`,
		}),
		getAllWallet: builder.query({
			query: (params) =>
				({
					url: `${HQ_API_ENPOINTS.WALLET}/${params.stationBranch}`,
				} as any),
		}),
		getAllWalletRequest: builder.query({
			query: (params) =>
				({
					url: `${HQ_API_ENPOINTS.WALLET_REQUEST}?populate=stationBranch,stationHQ`,
				} as any),
		}),
		addProducts: builder.mutation({
			query: ({ id, ...body }) =>
				({
					url: `${HQ_API_ENPOINTS.SINGLE_BRANCH}/${id}/products`,
					method: "Post",
					body,
				} as any),
		}),
		addAmenities: builder.mutation({
			query: ({ id, ...body }) =>
				({
					url: `${HQ_API_ENPOINTS.SINGLE_BRANCH}/${id}/amenities`,
					method: "Post",
					body,
				} as any),
		}),
	}),
});

export const {
	useGetAllHQTransactionsQuery,
	useGetAllWalletRequestQuery,
	useAddProductsMutation,
	useAddAmenitiesMutation,
	useGetAllWalletQuery,
} = hqTransactionSlice;
