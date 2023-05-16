import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";
import { providesList } from "src/helpers/helperFunction";
export const manageBranAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllBranch: builder.query({
			query: (params) =>
				`${API_ROUTE.GET_ALL_BRANCH}?search=${params?.query}&page=${params?.page}`,
			providesTags: (result) =>
				providesList(result?.hqProfile?.data, RTKTAG.MANAGE_HQ) as any,
		}),
		addNewHQ: builder.mutation({
			query: (body): any => ({
				url: API_ROUTE.ADD_NEW_HQ,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				providesList(result?.hqProfile?.data, RTKTAG.MANAGE_HQ) as any,
		}),
	}),
});
export const { useFetchAllBranchQuery, useAddNewHQMutation } =
	manageBranAPISlice;
