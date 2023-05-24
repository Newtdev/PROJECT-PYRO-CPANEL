import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const notificationAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllNotification: builder.query({
			query: (params) =>
				`${API_ROUTE.NOTIFICATION}?page=${params?.page}&limit=7&orderBy=createdAt:desc`,
			providesTags: (result) =>
				providesTagList(result.data.data, RTKTAG.NOTIFICATION) as any,
		}),
		sendNotification: builder.mutation({
			query: (body: any): string | any => ({
				url: API_ROUTE.NOTIFICATION,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.NOTIFICATION) as any,
		}),
	}),
});

export const { useFetchAllNotificationQuery, useSendNotificationMutation } =
	notificationAPISlice;
