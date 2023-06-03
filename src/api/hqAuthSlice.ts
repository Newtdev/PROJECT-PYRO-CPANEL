import { loginResponseType, Values } from "src/helpers/alias";
import { API_ROUTE } from "src/helpers/Routes";
import { apiSlice } from "./apiSlice";

export const hqAuthAPISlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		hqLogin: builder.mutation<loginResponseType, Values>({
			query: (value): any => ({
				url: API_ROUTE.HQ_ADMIN_LOGIN,
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

export const { useHqLoginMutation } = hqAuthAPISlice;
