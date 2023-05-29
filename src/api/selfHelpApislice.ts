//FETCH_ALL_USER

import { API_ROUTE } from "src/helpers/Routes";
import { selfHelpValidation } from "src/screens/dashboard/pages/self-help/AddNewSelfHelp";
import { apiSlice } from "./apiSlice";

export const selfHelpAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllSelfHelp: builder.query({
			query: (params) =>
				`${API_ROUTE.SELF_HELP}?search=${params?.query}&page=${params?.page}`,
		}),

		addNewSelfHelp: builder.mutation({
			query: (body: selfHelpValidation): any => ({
				url: API_ROUTE.SELF_HELP,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useFetchAllSelfHelpQuery, useAddNewSelfHelpMutation } =
	selfHelpAPISlice;
