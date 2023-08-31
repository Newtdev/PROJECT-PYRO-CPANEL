import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/api/authApiSlice";

import { Button } from "src/components/Button";
import Image from "src/components/Image";
import { ErrorType, Values } from "src/helpers/alias";
import { FormInput, PasswordInput, CheckBox } from "../../components/inputs";
import * as Yup from "yup";
import { handleNotification } from "src/helpers/helperFunction";
import { useHqLoginMutation } from "src/hq-admin/hq-api/hqAuthSlice";
import { ChangeEvent, useCallback, useMemo } from "react";
import { decryptData, encryptData } from "src/helpers/encryptData";
import { APP_ROUTE } from "src/helpers/Constant";
import AuthWrapper from "src/components/AuthWrapper";

const loginValidation = Yup.object().shape({
	email: Yup.string().label("Email").email().required(),
	password: Yup.string()
		.label("Password")
		.min(8)
		// .matches(
		// 	passwordRegex,
		// 	"must contain atleast one uppercase, lowercase, number and symbol"
		// )
		.required(),
});

type LoginValidationtype = Yup.InferType<typeof loginValidation>;

const Login = (props: { host: string }) => {
	const [login, loginResult] = useLoginMutation();
	const [hqLogin, loginHqResult] = useHqLoginMutation();
	const navigate = useNavigate();
	// const savedInfo = decryptData();

	const Login = useCallback(
		async (values: LoginValidationtype) => {
			return hqLogin(values).unwrap();
		},
		[hqLogin]
	);

	const rememberedLoginDetails = useMemo(() => {
		const data = decryptData("fuleap-remember-info");

		if (data === undefined || Object.keys(data).length === 0) return;
		return JSON.parse(data);
	}, []);

	const handleRequest = async (values: LoginValidationtype) => {
		try {
			await Login(values);
			navigate("/");
		} catch (error: ErrorType | any) {
			handleNotification(error);
		}
	};

	const Formik = useFormik<Values>({
		initialValues: {
			email: rememberedLoginDetails?.email || "",
			password: rememberedLoginDetails?.password || "",
		},
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: loginValidation,
		onSubmit: (values) => {
			handleRequest(values);
		},
	});

	function handleCheckBox(e: ChangeEvent<HTMLInputElement>) {
		encryptData({ ...Formik.values }, "fuleap-remember-info");
	}

	return (
		<AuthWrapper name="Enter your details to log in">
			<form
				onSubmit={Formik.handleSubmit}
				className="w-full flex flex-col justify-around items-center mt-10 h-[23rem]">
				<FormInput
					width="70%"
					id="email"
					name="Email"
					type="text"
					onChange={Formik.handleChange}
					value={Formik.values.email}
					onBlur={Formik.handleBlur}
					disabled={loginResult.isLoading || loginHqResult.isLoading}
					error={Formik.errors.email}
					touched={Formik.touched.email}
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
					disabled={loginResult.isLoading || loginHqResult.isLoading}
				/>
				<div className="w-[70%] mt-2">
					<Button
						text="LOG IN"
						disabled={loginResult.isLoading || loginHqResult.isLoading}
						showModal={loginResult.isLoading || loginHqResult.isLoading}
						className="h-[62px] font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
				<div className="flex justify-between w-[70%] items-center text-[16px] font-normal">
					<div className="flex items-center">
						<CheckBox onChange={handleCheckBox} />
						<p className="text-[#000000]">Remember me</p>
					</div>
					<div>
						<Link className="text-[#636685]" to={APP_ROUTE.FORGOT_PASSWORD}>
							Forgot password?
						</Link>
					</div>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default Login;
