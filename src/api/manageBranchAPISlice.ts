import { API_ROUTE, RTKTAG } from "src/helpers/Constant";
import { apiSlice } from "./apiSlice";
import { providesTagList } from "src/helpers/helperFunction";
export const manageBranAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllBranch: builder.query({
			query: (params) =>
				`${API_ROUTE.GET_ALL_BRANCH}?search=${params?.query}&page=${params?.page}&limit=6&orderBy=createdAt:desc`,
			providesTags: [{ type: RTKTAG.MANAGER_BRANCH }],
		}),
		exportAllBranch: builder.query({
			query: (params) => API_ROUTE.GET_ALL_BRANCH,
			providesTags: [{ type: RTKTAG.MANAGER_BRANCH }],
		}),
		fetchBranch: builder.query({
			query: (id) => `${API_ROUTE.FETCH_BRANCH}/${id}`,
			providesTags: [{ type: RTKTAG.MANAGER_BRANCH }] as any,
		}),
		addNewBranch: builder.mutation({
			query: (body): any => ({
				url: API_ROUTE.ADD_NEW_BRANCH,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
		}),
		addNewHQBranch: builder.mutation({
			query: (body): any => ({
				url: API_ROUTE.ADD_HQ_BRANCH,
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: RTKTAG.MANAGER_BRANCH }],
		}),

		changeStatus: builder.mutation({
			query: ({ id, ...body }): any => ({
				url: `${API_ROUTE.ADD_NEW_BRANCH}/${id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: [
				{ type: RTKTAG.MANAGER_BRANCH },
				{ type: RTKTAG.HQ_BRANCH },
			] as any,
		}),
		getDepotList: builder.query({
			query: (): any => `${API_ROUTE.DEPOT}`,

			providesTags: [{ type: RTKTAG.DEPOT }] as any,
		}),
		singleDepot: builder.query({
			query: (id): any => `${API_ROUTE.DEPOT}/${id}`,

			providesTags: [{ type: RTKTAG.DEPOT }] as any,
		}),

		requestDepotProduct: builder.mutation({
			query: (body): any => ({
				url: `${API_ROUTE.DEPOT_ORDER}`,
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: RTKTAG.DEPOT }] as any,
		}),
		depotRequestList: builder.query({
			query: (params): any => ({
				url: `${API_ROUTE.DEPOT_ORDER}`,
				params,
			}),

			providesTags: [{ type: RTKTAG.DEPOT }] as any,
		}),
		depotInvoiceList: builder.query({
			query: (params): any => ({
				url: `${API_ROUTE.DEPOT_INVOICE_LIST}`,
				params,
			}),

			providesTags: [{ type: RTKTAG.DEPOT }] as any,
		}),
	}),
});
export const {
	useFetchAllBranchQuery,
	useAddNewBranchMutation,
	useFetchBranchQuery,
	useAddNewHQBranchMutation,
	useExportAllBranchQuery,
	useChangeStatusMutation,
	useGetDepotListQuery,
	useSingleDepotQuery,
	useRequestDepotProductMutation,
	useDepotRequestListQuery,
	useDepotInvoiceListQuery,
} = manageBranAPISlice;
