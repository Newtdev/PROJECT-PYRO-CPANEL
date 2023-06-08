import { apiSlice } from "src/api/apiSlice";
import { HQ_API_ENPOINTS, RTKTAG } from "src/helpers/Constant";
import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";

export const hQManageBranchApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addHqNewBranch: builder.mutation({
			query: (body): any => ({
				url: HQ_API_ENPOINTS.SINGLE_BRANCH,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.HQ_BRANCH) as any,
		}),
		updateHqBranchDetails: builder.mutation({
			query: (body): any => ({
				url: HQ_API_ENPOINTS.SINGLE_BRANCH,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.HQ_BRANCH) as any,
		}),
		fetchHQBranch: builder.query({
			query: (params) => `${HQ_API_ENPOINTS.BRANCH}?stationHQ=${params.hqId}`,
			providesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.HQ_BRANCH) as any,
		}),
		fetchSingleHQBranch: builder.query({
			query: (id) => `${HQ_API_ENPOINTS.SINGLE_BRANCH}?branchId=${id}`,
			providesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.HQ_BRANCH) as any,
		}),
	}),
});

export const {
	useFetchHQBranchQuery,
	useFetchSingleHQBranchQuery,
	useAddHqNewBranchMutation,
	useUpdateHqBranchDetailsMutation,
} = hQManageBranchApiSlice;
