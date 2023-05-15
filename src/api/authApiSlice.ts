import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { loginResponseType, Values } from "src/helpers/alias";
import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const authAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<loginResponseType, Values>({
			query: (value): any => ({
				url: API_ROUTE.LOGIN,
				method: "POST",
				body: {
					...value,
					loginOption: "email",
					pushNotificationId: "34234234234234aefaq3423",
				},
			}),
		}),
	}),
});

export const { useLoginMutation } = authAPISlice;
