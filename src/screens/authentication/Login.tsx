import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/api/authApiSlice";
import Logo from "src/assets/logo.svg";
import { Button } from "src/components/Button";
import Image from "src/components/Image";
import { passwordRegex, Values } from "src/helpers/alias";
import { FormInput, PasswordInput, CheckBox } from "../../components/inputs";
import * as Yup from "yup";
import { ErrorNotification } from "src/helpers/helperFunction";

const Login = () => {
	const [login, loginResult] = useLoginMutation();
	const navigate = useNavigate();

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
	const handleRequst = async (values: Values) => {
		try {
			await login(values).unwrap();
			navigate("/");
		} catch (error: any) {
			if (error.status === "FETCH_ERROR") {
				ErrorNotification("Network Error! Please try again.");
			}
			if (error.status === 400) {
				ErrorNotification(error?.data?.message);
			}
		}
	};

	const Formik = useFormik<Values>({
		initialValues: {
			email: "",
			password: "",
		},
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: loginValidation,
		onSubmit: (values) => {
			handleRequst(values);
		},
	});

	return (
		<section className="max-w-screen h-screen">
			<article className="h-full w-full flex flex-col justify-center backgroundImage">
				<div className="w-full mx-auto flex h-[690px] rounded-[30px] flex-col items-center sm:w-[570px] bg-white">
					<div className=" mt-[53px]">
						<div className="mb-6">
							<Image image={Logo} width={51} height={62} styles="mx-auto" />
						</div>
						<h1 className="text-[20px] font-normal leading-[30px] text-black">
							Enter your details to log in
						</h1>
					</div>
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
							disabled={loginResult.isLoading}
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
							disabled={loginResult.isLoading}
						/>
						<div className="w-[70%] mt-2">
							<Button
								text="LOG IN"
								disabled={loginResult.isLoading}
								showModal={loginResult.isLoading}
								className="h-[62px] font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
								type="submit"
							/>
						</div>
						<div className="flex justify-between w-[70%] items-center text-[16px] font-normal">
							<div className="flex items-center">
								<CheckBox />
								<p className="text-[#000000]">Remember me</p>
							</div>
							<div>
								<Link className="text-[#636685]" to="/">
									Forgot password?
								</Link>
							</div>
						</div>
					</form>
				</div>
			</article>
		</section>
	);
};

export default Login;
