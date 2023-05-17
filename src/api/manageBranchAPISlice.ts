import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";
import { providesList } from "src/helpers/helperFunction";
export const manageBranAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllBranch: builder.query({
			query: (params) =>
				`${API_ROUTE.GET_ALL_BRANCH}?search=${params?.query}&page=${params?.page}`,
			providesTags: (result) =>
				providesList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
		}),
		addNewBranch: builder.mutation({
			query: (body): any => ({
				url: API_ROUTE.ADD_NEW_BRANCH,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				providesList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
		}),
	}),
});
export const { useFetchAllBranchQuery, useAddNewBranchMutation } =
	manageBranAPISlice;
