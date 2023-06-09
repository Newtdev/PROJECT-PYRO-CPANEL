import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { HQ_API_ENPOINTS, RTKTAG } from "src/helpers/Constant";
import { apiSlice } from "src/api/apiSlice";

export const hqSettingsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		updateHqAdminProfile: builder.mutation({
			query: ({ id, ...param }: any): string | any => ({
				url: `${HQ_API_ENPOINTS.SETTINGS}/${id}`,
				method: "PATCH",
				param,
			}),
			// invalidatesTags: (result) =>
			// 	InvalidateTag(result?.data?.id, RTKTAG.NOTIFICATION) as any,
		}),
	}),
});

export const { useUpdateHqAdminProfileMutation } = hqSettingsApiSlice;
