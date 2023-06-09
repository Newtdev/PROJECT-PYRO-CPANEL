import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { FormInput } from "src/components/inputs";
import { FormType } from "src/helpers/alias";
import { AddbranchValidation } from "src/helpers/YupValidation";

export const AddNewBranch = (props: {
	makeApiRequest: (args: FormType) => void;
	apiResult: { isLoading: boolean };
	initalValue?: { [index: string]: string };
}) => {
	const [step, setStep] = useState<number>(0);

	console.log(props.initalValue);
	const Formik = useFormik<FormType>({
		initialValues: {
			name: "",
			phoneNumber: "",
			location: {
				lga: "",
				state: "",
				latitude: "",
				longitude: "",
				address: "",
			},
			branchManager: {
				firstName: "",
				lastName: "",
				email: "",
				phoneNumber: "",
				password: "",
			},
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddbranchValidation[step],

		onSubmit: (values) => {
			if (step === 1) {
				props.makeApiRequest(values);
				// addNewBranchFunct(values);
			} else {
				setStep((prev) => prev + 1);
			}
		},
	});

	useEffect(() => {
		if (!props.initalValue) return;

		// Formik.setValues({ ...props.initalValue });
	}, []);

	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
		{
			id: "name",
			name: "Branch name",
			type: "text",
			styles: `${styles} ${
				Formik.errors.name && Formik.touched.name
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.name,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.name,
			touched: Formik.touched.name,
		},
		{
			id: "phoneNumber",
			name: "Branch contact info",
			type: "text",
			styles: `${styles} ${
				Formik.errors.phoneNumber && Formik.touched.phoneNumber
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.phoneNumber,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.phoneNumber,
			touched: Formik.touched.phoneNumber,
		},
		{
			id: "location.address",
			name: "Branch Address",
			type: "text",
			styles: `${styles} ${
				Formik.errors.location?.address && Formik.touched.location?.address
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.location.address,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.location?.address,
			touched: Formik.touched.location?.address,
		},
		{
			id: "location.lga",
			name: "Branch LGA",
			type: "text",
			styles: `${styles} ${
				Formik.errors.location?.lga && Formik.touched.location?.lga
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.location.lga,
			onBlur: Formik.handleBlur,

			disabled: props.apiResult.isLoading,
			error: Formik.errors.location?.lga,
			touched: Formik.touched.location?.lga,
		},
		{
			id: "location.latitude",
			name: "Branch Latitude",
			type: "text",
			styles: `${styles} ${
				Formik.errors.location?.lga && Formik.touched.location?.latitude
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.location.latitude,
			onBlur: Formik.handleBlur,

			disabled: props.apiResult.isLoading,
			error: Formik.errors.location?.latitude,
			touched: Formik.touched.location?.latitude,
		},
		{
			id: "location.longitude",
			name: "Branch longitude",
			type: "text",
			styles: `${styles} ${
				Formik.errors.location?.lga && Formik.touched.location?.longitude
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.location.longitude,
			onBlur: Formik.handleBlur,

			disabled: props.apiResult.isLoading,
			error: Formik.errors.location?.longitude,
			touched: Formik.touched.location?.longitude,
		},

		{
			id: "location.state",
			name: "Branch state",
			type: "text",
			styles: `${styles} ${
				Formik.errors.location?.state && Formik.touched.location?.state
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.location?.state,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.location?.state,
			touched: Formik.touched.location?.state,
		},
		{
			id: "branchManager.firstName",
			name: "Branch manager first name",
			type: "text",
			styles: `${styles} ${
				Formik.errors.branchManager?.firstName &&
				Formik.touched.branchManager?.firstName
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.branchManager.firstName,
			onBlur: Formik.handleBlur,

			disabled: props.apiResult?.isLoading,
			error: Formik.errors.branchManager?.firstName,
			touched: Formik.touched.branchManager?.firstName,
		},
		{
			id: "branchManager.lastName",
			name: "Branch manager last name",
			type: "text",
			styles: `${styles} ${
				Formik.errors?.branchManager?.lastName &&
				Formik.touched?.branchManager?.lastName
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values?.branchManager?.lastName,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors?.branchManager?.lastName,
			touched: Formik.touched?.branchManager?.lastName,
		},
		{
			id: "branchManager.email",
			name: "Branch manager email",
			type: "email",
			styles: `${styles} ${
				Formik.errors?.branchManager?.email &&
				Formik.touched.branchManager?.email
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values?.branchManager?.email,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.branchManager?.email,
			touched: Formik.touched.branchManager?.email,
		},
		{
			id: "branchManager.phoneNumber",
			name: "Branch manager contact info",
			type: "text",
			styles: `${styles} ${
				Formik.errors.branchManager?.phoneNumber &&
				Formik.touched.branchManager?.phoneNumber
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.branchManager?.phoneNumber,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.branchManager?.phoneNumber,
			touched: Formik.touched.branchManager?.phoneNumber,
		},
		{
			id: "branchManager.password",
			name: "Branch manager's password",
			type: "text",
			styles: `${styles} ${
				Formik.errors.branchManager?.password &&
				Formik.touched.branchManager?.password
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.branchManager?.password,
			onBlur: Formik.handleBlur,
			disabled: props.apiResult?.isLoading,
			error: Formik.errors.branchManager?.password,
			touched: Formik.touched.branchManager?.password,
		},
	];

	console.log(Formik.errors);

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full">
			{step === 0 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(0, 7).map((dt, i) => (
						<FormInput
							id={dt.id}
							name={dt.name}
							type={dt.type}
							styles={dt.styles}
							labelStyles={dt.labelStyles}
							onChange={dt.onChange}
							value={dt.value}
							onBlur={dt.onBlur}
							disabled={dt.disabled}
							error={dt.error}
							touched={dt.touched}
						/>
					))}
				</div>
			) : null}
			{step === 1 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(-5).map((dt, i) => (
						<FormInput
							id={dt.id}
							name={dt.name}
							type={dt.type}
							styles={dt.styles}
							labelStyles={dt.labelStyles}
							onChange={dt.onChange}
							value={dt.value}
							onBlur={dt.onBlur}
							disabled={dt.disabled}
							error={dt.error}
							touched={dt.touched}
						/>
					))}
				</div>
			) : null}

			<div className="w-full">
				{step > 0 ? (
					<Button
						text="Back"
						disabled={props.apiResult.isLoading || false}
						showModal={props.apiResult.isLoading}
						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
						type="button"
						onClick={() => setStep((prev) => prev - 1)}
					/>
				) : null}

				<Button
					text={step < 1 ? "Next" : "Add New Branch"}
					disabled={props.apiResult?.isLoading}
					showModal={props.apiResult?.isLoading}
					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/>
			</div>
		</form>
	);
};
