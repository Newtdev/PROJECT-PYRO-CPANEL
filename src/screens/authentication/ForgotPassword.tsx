import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "src/api/authApiSlice";
import { Button } from "src/components/Button";
import { FormInput } from "../../components/inputs";
import * as Yup from "yup";
import { handleNotification } from "src/helpers/helperFunction";
import { useForgotHQPasswordMutation } from "src/hq-admin/hq-api/hqAuthSlice";
import { useCallback } from "react";
import { APP_ROUTE } from "src/helpers/Constant";
import AuthWrapper from "src/components/AuthWrapper";

const forgotPasswordValidation = Yup.object().shape({
	email: Yup.string().label("Email").email().required(),
});

export type ForgotValidationtype = Yup.InferType<
	typeof forgotPasswordValidation
>;

const ForgotPassword = (props: { host: string }) => {
	const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
	const [hqForgotPassword, hqForgotPasswordResult] =
		useForgotHQPasswordMutation();

	const navigate = useNavigate();

	const ForgetPassword = useCallback(
		async (values: ForgotValidationtype) => {
			if (props.host === "hq") {
				return hqForgotPassword(values).unwrap();
			} else {
				return forgotPassword(values).unwrap();
			}
		},
		[forgotPassword, hqForgotPassword, props.host]
	);

	const handleRequest = async (values: ForgotValidationtype) => {
		try {
			const response = await ForgetPassword(values);
			handleNotification(response);
		} catch (error: any) {
			handleNotification(error);
		}
	};

	const Formik = useFormik<ForgotValidationtype>({
		initialValues: {
			email: "",
		},
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: forgotPasswordValidation,
		onSubmit: (values) => {
			handleRequest(values);
		},
	});

	return (
		<AuthWrapper name="Enter the email associated to your account">
			<form
				onSubmit={Formik.handleSubmit}
				className="w-full flex flex-col justify-around items-center mt-10">
				<FormInput
					width="70%"
					id="email"
					name="Email"
					type="text"
					onChange={Formik.handleChange}
					value={Formik.values.email}
					onBlur={Formik.handleBlur}
					disabled={
						forgotPasswordResult.isLoading || hqForgotPasswordResult.isLoading
					}
					error={Formik.errors.email}
					touched={Formik.touched.email}
				/>

				<div className="w-[70%] mt-10">
					<Button
						text="LOG IN"
						disabled={
							forgotPasswordResult.isLoading || hqForgotPasswordResult.isLoading
						}
						showModal={
							forgotPasswordResult.isLoading || hqForgotPasswordResult.isLoading
						}
						className="h-[62px] font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
				<div className="flex justify-between w-[70%] items-center text-[16px] font-normal mt-4 pl-3">
					<div>
						<Link
							className="text-[#636685] cursor-pointer"
							to={APP_ROUTE.LOGIN}>
							Back to Login
						</Link>
					</div>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default ForgotPassword;
