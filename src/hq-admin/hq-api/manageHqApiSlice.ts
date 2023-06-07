import { apiSlice } from "src/api/apiSlice";
import { HQ_API_ENPOINTS } from "src/helpers/Constant";

export const hQManageBranchApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		hqBranch: builder.mutation({
			query: (value): any => ({
				url: HQ_API_ENPOINTS.BRANCH,
				method: "POST",
			}),
		}),
		fetchHQBranch: builder.query({
			query: (id) => HQ_API_ENPOINTS.BRANCH,
			// providesTags: (result) =>
			// 	providesTagList(result?.hqProfile?.data, RTKTAG.MANAGER_BRANCH) as any,
		}),
	}),
});

export const { useHqBranchMutation, useFetchHQBranchQuery } =
	hQManageBranchApiSlice;
