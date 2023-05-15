import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";
import { providesList } from "src/helpers/helperFunction";
export const manageHqAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllHQ: builder.query({
			query: () => API_ROUTE.GET_ALL_HQ,
			providesTags: (result) =>
				providesList(result?.hqProfile?.data, RTKTAG.MANAGE_HQ) as any,
		}),
		addNewHQ: builder.mutation({
			query: (value): any => ({
				url: API_ROUTE.ADD_NEW_HQ,
				method: "POST",
				body: value,
			}),
			invalidatesTags: (result) =>
				providesList(result?.hqProfile?.data, RTKTAG.MANAGE_HQ) as any,
		}),
	}),
});

export const { useFetchAllHQQuery, useAddNewHQMutation } = manageHqAPISlice;
