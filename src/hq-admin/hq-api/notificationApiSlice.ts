import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { HQ_API_ENPOINTS, RTKTAG } from "src/helpers/Constant";
import { apiSlice } from "src/api/apiSlice";

export const hqNotificationAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllHQNotification: builder.query({
			query: (params) =>
				`${HQ_API_ENPOINTS.NOTIFICATION}?page=${params?.page}&limit=7&orderBy=createdAt:desc`,
			providesTags: (result) =>
				providesTagList(result?.data?.data, RTKTAG.NOTIFICATION) as any,
		}),
		sendHQNotification: builder.mutation({
			query: (body: any): string | any => ({
				url: HQ_API_ENPOINTS.NOTIFICATION,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.NOTIFICATION) as any,
		}),
	}),
});

export const { useFetchAllHQNotificationQuery, useSendHQNotificationMutation } =
	hqNotificationAPISlice;
