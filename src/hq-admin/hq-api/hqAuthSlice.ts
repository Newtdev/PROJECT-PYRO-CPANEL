import { loginResponseType, Values } from "src/helpers/alias";
import { API_ROUTE, HQ_API_ENPOINTS } from "src/helpers/Constant";
import { ForgotValidationtype } from "src/screens/authentication/ForgotPassword";
import { apiSlice } from "../../api/apiSlice";

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

		forgotHQPassword: builder.mutation({
			query: (value): any => ({
				url: HQ_API_ENPOINTS.FORGOT_PASSWORD,
				method: "POST",
				body: {
					...value,
					modeOfReset: "email",
				},
			}),
		}),

		resetHQPassword: builder.mutation({
			query: (value): any => ({
				url: HQ_API_ENPOINTS.RESET_PASSWORD,
				method: "POST",
				body: {
					...value,
				},
			}),
		}),

		resendHQOTP: builder.mutation({
			query: (value): any => ({
				url: HQ_API_ENPOINTS.RESEND_OTP,
				method: "POST",
				body: {
					...value,
				},
			}),
		}),
	}),
});

export const {
	useHqLoginMutation,
	useForgotHQPasswordMutation,
	useResendHQOTPMutation,
	useResetHQPasswordMutation,
} = hqAuthAPISlice;
