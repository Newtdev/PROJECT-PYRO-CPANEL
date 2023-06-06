import { loginResponseType, Values } from "src/helpers/alias";
import { HQ_API_ENPOINTS } from "src/helpers/Constant";
import { apiSlice } from "../../api/apiSlice";

export const hqManageApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		hqBranch: builder.mutation({
			query: (value): any => ({
				url: HQ_API_ENPOINTS.BRANCH,
				method: "POST",
			}),
		}),
	}),
});

export const { useHqBranchMutation } = hqManageApiSlice;
