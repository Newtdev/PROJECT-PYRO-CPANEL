import { API_ROUTE, RTKTAG } from "src/helpers/Constant";
import { apiSlice } from "./apiSlice";
import { providesTagList } from "src/helpers/helperFunction";

export const manageHqAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllHQ: builder.query({
			query: (params) =>
				`${API_ROUTE.GET_ALL_HQ}?search=${params?.query}&page=${params?.page}&orderBy=createdAt:desc`,
			providesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.MANAGE_HQ) as any,
		}),
		exportAllHQ: builder.query({
			query: () => API_ROUTE.GET_ALL_HQ,
		}),
		addNewHQ: builder.mutation({
			query: (body): any => ({
				url: API_ROUTE.ADD_NEW_HQ,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				providesTagList(result?.hqProfile?.data, RTKTAG.MANAGE_HQ) as any,
		}),
		fetchSingleHQ: builder.query({
			query: ({ id, status }) => `${API_ROUTE.FETCH_SINGLE_HQ}/${id}`,
		}),
	}),
});

export const {
	useFetchAllHQQuery,
	useAddNewHQMutation,
	useFetchSingleHQQuery,
	useExportAllHQQuery,
} = manageHqAPISlice;
