import {
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	EndpointDefinitions,
} from "@reduxjs/toolkit/dist/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { apiSlice } from "./apiSlice";

export const settingsAPISlice = apiSlice.injectEndpoints({
	endpoints: function (
		build: EndpointBuilder<
			(
				args: string,
				api: any,
				extraOptions: {}
			) => Promise<
				QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
			>,
			"MANAGE_HQ" | "MANAGE_BRANCH",
			"api"
		>
	): EndpointDefinitions {
		throw new Error("Function not implemented.");
	},
});

// export const {
// 	useGetAdminQuery,
// 	useGetAllAdminQuery,
// 	useAddAdminMutation,
// 	useUpdateAdminMutation,
// } = settingsAPISlice;
