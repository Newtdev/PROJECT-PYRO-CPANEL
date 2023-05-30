//FETCH_ALL_USER

import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const feedsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllFeeds: builder.query({
			query: (params) => `${API_ROUTE.FEEDS}`,
			providesTags: (result) =>
				providesTagList(result.feeds.data, RTKTAG.FEEDS) as any,
		}),

		addNewFeeds: builder.mutation({
			query: (body): any => ({
				url: API_ROUTE.FEEDS,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.FEEDS) as any,
		}),
	}),
});

export const { useFetchAllFeedsQuery, useAddNewFeedsMutation } = feedsAPISlice;
