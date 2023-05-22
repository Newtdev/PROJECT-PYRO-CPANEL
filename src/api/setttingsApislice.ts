import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { API_ROUTE, RTKTAG } from "src/helpers/Routes";
import { UpdateAdminTypes } from "src/screens/dashboard/pages/Settings";
import { AddAdminTypes } from "src/screens/dashboard/pages/Settings/ManageAdmin";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAdmin: builder.query({
			query: () => `${API_ROUTE.ADMIN}`,
		}),
		getAllAdmin: builder.query({
			query: (params) =>
				`${API_ROUTE.ADMIN}?limit=5&search=${params.query}&page=${params.page}`,
			providesTags: (result) =>
				providesTagList(result.data.data, RTKTAG.ADMIN) as any,
		}),
		addAdmin: builder.mutation({
			query: (body: AddAdminTypes): string | any => ({
				url: API_ROUTE.ADMIN,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.ADMIN) as any,
		}),
		updateAdmin: builder.mutation({
			query: (body: { body: UpdateAdminTypes }): string | any => ({
				url: `${API_ROUTE.ADMIN}/${body?.id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.ADMIN) as any,
		}),
	}),
});

export const {
	useGetAdminQuery,
	useGetAllAdminQuery,
	useAddAdminMutation,
	useUpdateAdminMutation,
} = settingsAPISlice;
