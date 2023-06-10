import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "src/api/authApiSlice";
import { Button } from "src/components/Button";
import { FormInput, PasswordInput } from "../../components/inputs";
import * as Yup from "yup";
import { handleNotification } from "src/helpers/helperFunction";
import { useResetHQPasswordMutation } from "src/hq-admin/hq-api/hqAuthSlice";
import { useCallback } from "react";
import { APP_ROUTE } from "src/helpers/Constant";
import AuthWrapper from "src/components/AuthWrapper";

const resetPasswordValidation = Yup.object().shape({
	token: Yup.string().label("OTP").length(6).required(),
	password: Yup.string().label("New Password").min(8).required(),
	confirmPassword: Yup.string()
		.label("confirm Password")
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required(),
});

export type ForgotValidationtype = Yup.InferType<
	typeof resetPasswordValidation
>;

const ResetPassword = (props: { host: string }) => {
	const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
	const [hqResetPassword, hqResetPasswordResult] = useResetHQPasswordMutation();

	const navigate = useNavigate();

	const ForgetPassword = useCallback(
		async (values: ForgotValidationtype) => {
			if (props.host === "hq") {
				return hqResetPassword(values).unwrap();
			} else {
				return resetPassword(values).unwrap();
			}
		},
		[props.host, hqResetPassword, resetPassword]
	);

	const handleRequest = async (values: ForgotValidationtype) => {
		try {
			const response = await ForgetPassword(values);
			console.log(response);
			handleNotification(response);
		} catch (error: any) {
			handleNotification(error);
		}
	};

	const Formik = useFormik<ForgotValidationtype>({
		initialValues: {
			token: "",
			password: "",
			confirmPassword: "",
		},
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: resetPasswordValidation,
		onSubmit: (values) => {
			handleRequest(values);
		},
	});

	return (
		<AuthWrapper name="Create new password">
			<form
				onSubmit={Formik.handleSubmit}
				className="w-full flex flex-col justify-around h-[70%] items-center mt-6">
				<FormInput
					width="70%"
					id="token"
					name="OTP code"
					type="text"
					onChange={Formik.handleChange}
					value={Formik.values.token}
					onBlur={Formik.handleBlur}
					disabled={
						resetPasswordResult.isLoading || hqResetPasswordResult.isLoading
					}
					error={Formik.errors.token}
					touched={Formik.touched.token}
				/>
				<PasswordInput
					id={"password"}
					name={"Password"}
					type={"password"}
					onChange={Formik.handleChange}
					onBlur={Formik.handleBlur}
					value={Formik.values.password}
					touched={Formik.touched.password}
					error={Formik.errors.password}
					styles="my-2 "
					disabled={
						resetPasswordResult.isLoading || hqResetPasswordResult.isLoading
					}
				/>
				<PasswordInput
					id={"confirmPassword"}
					name={"Confirm Password"}
					type={"password"}
					onChange={Formik.handleChange}
					onBlur={Formik.handleBlur}
					value={Formik.values.confirmPassword}
					touched={Formik.touched.confirmPassword}
					error={Formik.errors.confirmPassword}
					styles="my-2 "
					disabled={
						resetPasswordResult.isLoading || hqResetPasswordResult.isLoading
					}
				/>

				<div className="w-[70%] mt-10">
					<Button
						text="LOG IN"
						disabled={
							resetPasswordResult.isLoading || hqResetPasswordResult.isLoading
						}
						showModal={
							resetPasswordResult.isLoading || hqResetPasswordResult.isLoading
						}
						className="h-[62px] font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
				<div className="flex justify-between w-[70%] items-center text-[16px] font-normal">
					<div className="flex items-center">
						<Button
							text="Resend me OTP again"
							// disabled={
							// 	resetPasswordResult.isLoading ||
							// 	hqResetPasswordResult.isLoading
							// }
							// showModal={
							// 	resetPasswordResult.isLoading ||
							// 	hqResetPasswordResult.isLoading
							// }
							className="h-[62px] font-bold text-[#002E66]"
							type="submit"
						/>
					</div>
					<div>
						<Link className="text-[#636685]" to={APP_ROUTE.LOGIN}>
							Back to login
						</Link>
					</div>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default ResetPassword;
