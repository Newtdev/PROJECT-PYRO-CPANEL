import { loginResponseType, Values } from "src/helpers/alias";
import { API_ROUTE } from "src/helpers/Constant";
import { ForgotValidationtype } from "src/screens/authentication/ForgotPassword";
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

		forgotPassword: builder.mutation<any, ForgotValidationtype>({
			query: (value): any => ({
				url: API_ROUTE.FORGOT_PASSWORD,
				method: "POST",
				body: {
					...value,
					modeOfReset: "email",
				},
			}),
		}),

		resetPassword: builder.mutation({
			query: (value): any => ({
				url: API_ROUTE.RESET_PASSWORD,
				method: "POST",
				body: {
					...value,
				},
			}),
		}),

		resendOTP: builder.mutation<loginResponseType, Values>({
			query: (value): any => ({
				url: API_ROUTE.RESEND_OTP,
				method: "POST",
				body: {
					...value,
				},
			}),
		}),
		dashboardInfo: builder.query({
			query: (value): any => ({
				url: API_ROUTE.DASHBOARD_INFO,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useForgotPasswordMutation,
	useResendOTPMutation,
	useResetPasswordMutation,
	useDashboardInfoQuery,
} = authAPISlice;
