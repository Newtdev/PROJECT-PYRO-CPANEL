import { API_ROUTE, RTKTAG } from "src/helpers/Constant";
import { apiSlice } from "./apiSlice";
import { providesTagList } from "src/helpers/helperFunction";
export const manageBranAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllBranch: builder.query({
			query: (params) =>
				`${API_ROUTE.GET_ALL_BRANCH}?search=${params?.query}&page=${params?.page}&limit=6`,
			providesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
		}),
		fetchBranch: builder.query({
			query: (id) => `${API_ROUTE.FETCH_BRANCH}/${id}`,
			providesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
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
			invalidatesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
		}),
	}),
});
export const {
	useFetchAllBranchQuery,
	useAddNewBranchMutation,
	useFetchBranchQuery,
	useAddNewHQBranchMutation,
} = manageBranAPISlice;
