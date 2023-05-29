//FETCH_ALL_USER

import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { selfHelpValidation } from "src/screens/dashboard/pages/self-help/AddNewSelfHelp";
import { apiSlice } from "./apiSlice";

export const selfHelpAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllSelfHelp: builder.query({
			query: (params) =>
				`${API_ROUTE.SELF_HELP}?search=${params?.query}&page=${params?.page}`,
			providesTags: (result) =>
				providesTagList(result.selfHelps.data, RTKTAG.SELP_HELP) as any,
		}),

		addNewSelfHelp: builder.mutation({
			query: (body: selfHelpValidation): any => ({
				url: API_ROUTE.SELF_HELP,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.SELP_HELP) as any,
		}),
	}),
});

export const { useFetchAllSelfHelpQuery, useAddNewSelfHelpMutation } =
	selfHelpAPISlice;
