import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useFormik } from "formik";
import { Fragment, useRef, useState } from "react";
import { Button } from "src/components/Button";
import { FormInput, PasswordInput, SelectInput } from "src/components/inputs";
import { FormType } from "src/helpers/alias";
import { states } from "src/helpers/data";
import { generatePassword } from "src/helpers/helperFunction";
import { AddbranchValidation } from "src/helpers/YupValidation";

const GoogleLocationInput = ({
	getLat,
	getLong,
	getAddress,
}: {
	getLat: (arg: number) => void;
	getLong: (arg: number) => void;
	getAddress: (arg: string) => void;
}) => {
	const originRef = useRef();
	const [result, setResult] = useState<any>(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyCDfI1GOcaZ2W3xQZyWwN_d2ZUzMufGSS4",
		libraries: ["places", "geometry"],
	});
	const onLoad = (autoComplete: any) => {
		setResult(autoComplete);
	};
	const onLocationSelected = () => {
		const place = result?.getPlace();

		getAddress(place.formatted_address as any);
		getLat(place.geometry.location.lat());
		getLong(place.geometry.location.lng());
	};

	return (
		<div>
			{isLoaded ? (
				<Autocomplete onLoad={onLoad} onPlaceChanged={onLocationSelected}>
					<>
						<label className="block mb-[6px] text-black text-start font-normal text-[14px]  ml-5 my-6">
							Enter Address
						</label>
						<input
							className="h-[54px] rounded-[38px] w-full border border-gray-300 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
							ref={originRef as any}
							name="origin"
						/>
					</>
				</Autocomplete>
			) : null}
		</div>
	);
};

export const AddNewBranch = (props: {
	makeApiRequest: (args: FormType) => void;
	apiResult: { isLoading: boolean };
	initalValue?: { [index: string]: string } | any;
}) => {
	const [step, setStep] = useState<number>(0);

	const Formik = useFormik<FormType>({
		initialValues: { ...props.initalValue },
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

	const getLong = (value: number) => {
		Formik.setFieldValue("location.longitude", String(value));
	};
	const getLat = (value: number) => {
		Formik.setFieldValue("location.latitude", String(value));
	};

	const getAddress = (value: string) => {
		Formik.setFieldValue("location.address", value);
	};

	// useEffect(() => {
	// 	if (!props.initalValue) return;

	// 	// Formik.setValues({ ...props.initalValue });
	// }, []);

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
	];

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full">
			{step === 0 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(0, 3).map((dt, i) => (
						<Fragment key={dt.id}>
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
							{i === 2 ? (
								<GoogleLocationInput
									getLat={getLat}
									getLong={getLong}
									getAddress={getAddress}
								/>
							) : null}
							{i === 2 ? (
								<SelectInput
									id="location.state"
									data={states}
									labelStyles={labelStyles}
									name="Select state"
									onChange={(e) =>
										Formik.setFieldValue("location.state", e.target.value)
									}
									value={Formik.values.location.state}
								/>
							) : null}
						</Fragment>
					))}
				</div>
			) : null}
			{step === 1 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(-4).map((dt, i) => (
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

					<PasswordInput
						width="w-full"
						id="password"
						name={"Password"}
						type={"text"}
						styles={` ${
							Formik.errors.branchManager?.password &&
							Formik.touched.branchManager?.password
								? "border-red-500"
								: "border-gray-300"
						}`}
						labelStyles={labelStyles}
						onChange={(e) => {
							Formik.setFieldValue("branchManager.password", e.target.value);
						}}
						value={Formik.values.branchManager?.password}
						onBlur={Formik.handleBlur}
						disabled={props.apiResult.isLoading}
						// error={Formik.errors.password}
						// touched={Formik.touched.password}
					/>
					<Button
						text="Generate password"
						disabled={props.apiResult.isLoading}
						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
						type="button"
						onClick={() => {
							Formik.setFieldValue(
								"branchManager.password",
								generatePassword()
							);
						}}
					/>
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
