import { InvalidateTag, providesTagList } from "src/helpers/helperFunction";
import { API_ROUTE, RTKTAG } from "src/helpers/Constant";
// import { UpdateAdminTypes } from "src/screens/dashboard/pages/Settings";
import { AddAdminTypes } from "src/screens/dashboard/pages/Settings/ManageAdmin";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAdmin: builder.query({
			query: () => `${API_ROUTE.ADMIN}`,
			providesTags: (result) =>
				providesTagList(result.data.data, RTKTAG.ADMIN) as any,
		}),
		getAllAdmin: builder.query({
			query: (params) =>
				`${API_ROUTE.ADMIN}?limit=4&search=${params.query}&page=${params.page}`,
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
			query: ({ id, ...body }: any): string | any => ({
				url: `${API_ROUTE.ADMIN}/${id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.ADMIN) as any,
		}),
		saveWebiteInfo: builder.mutation({
			query: (body): string | any => ({
				url: API_ROUTE.SAVE_WEBSITE_INFO,
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				InvalidateTag(result?.data?.id, RTKTAG.WEBSITE_INFO) as any,
		}),
		getWebsiteInfo: builder.query({
			query: (params) => `${API_ROUTE.SAVE_WEBSITE_INFO}?orderBy=createdAt:asc`,
			providesTags: (result) =>
				providesTagList(result.info.data, RTKTAG.WEBSITE_INFO) as any,
		}),
	}),
});

export const {
	useGetAdminQuery,
	useGetAllAdminQuery,
	useAddAdminMutation,
	useUpdateAdminMutation,
	useSaveWebiteInfoMutation,
	useGetWebsiteInfoQuery,
} = settingsAPISlice;
