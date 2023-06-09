import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "src/components/Button";
import Image from "src/components/Image";
import { FormInput, PasswordInput, TextArea } from "src/components/inputs";
import { Upload } from "src/components/Upload";
import { UpdateHQAdminType } from "src/helpers/alias";
import {
	convert2base64,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { UpdateHQAdminInfoValidation } from "src/helpers/YupValidation";
import { useUpdateHqAdminProfileMutation } from "src/hq-admin/hq-api/settingsApiSlice";

export const ResetPassword = (props: { close: () => void; data: any }) => {
	const [updateAdmin, addNewResult] = useUpdateHqAdminProfileMutation();
	const [step, setStep] = useState(0);

	async function addNewAdmin(values: UpdateHQAdminType) {
		try {
			const response = await updateAdmin(values).unwrap();
			if (response) {
				props.close();
			}
			SuccessNotification(response?.status);
		} catch (error: any) {
			props.close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<UpdateHQAdminType>({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			role: "hq_admin",
			oldPassword: "",
			password: "",
			confirmPassword: "",
			avatar: "",
			id: props.data?.id,
			accountStatus: {
				status: "confirmed",
				reason: "",
			},
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: UpdateHQAdminInfoValidation[step],
		onSubmit: (values: UpdateHQAdminType) => {
			if (step === 1) {
				addNewAdmin(values);
			} else {
				setStep(() => 1);
			}
		},
	});
	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
		{
			id: "firstName",
			name: "Admin's firstname",
			type: "text",
			styles: `${styles} ${
				Formik.errors.firstName && Formik.touched.firstName
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.firstName,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.firstName,
			touched: Formik.touched.firstName,
		},
		{
			id: "lastName",
			name: "Admin's lastname",
			type: "text",
			styles: `${styles} ${
				Formik.errors.lastName && Formik.touched.lastName
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.lastName,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.lastName,
			touched: Formik.touched.lastName,
		},
		{
			id: "email",
			name: "Admin's email",
			type: "email",
			styles: `${styles} ${
				Formik.errors.email && Formik.touched.email
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.email,
			onBlur: Formik.handleBlur,

			disabled: addNewResult.isLoading,
			error: Formik.errors.email,
			touched: Formik.touched.email,
		},
		{
			id: "phoneNumber",
			name: "Admin's phone number",
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
			disabled: addNewResult?.isLoading,
			error: Formik.errors.phoneNumber,
			touched: Formik.touched.phoneNumber,
		},
		{
			id: "oldPassword",
			name: "Old password",
			type: "text",
			styles: `${styles} ${
				Formik.errors.confirmPassword && Formik.touched.confirmPassword
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.oldPassword,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.oldPassword,
			touched: Formik.touched.oldPassword,
		},
		{
			id: "password",
			name: "New password",
			type: "text",
			styles: `${styles} ${
				Formik.errors.password && Formik.touched.password
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.password,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.password,
			touched: Formik.touched.password,
		},
		{
			id: "confirmPassword",
			name: "Confirm password",
			type: "text",
			styles: `${styles} ${
				Formik.errors.password && Formik.touched.password
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: () =>
				Formik.setFieldValue("confirmPassword", Formik.values.password),
			value: Formik.values.confirmPassword,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			// error: Formik.errors.confirmPassword,
			// touched: Formik.touched.confirmPassword,
		},
	];

	// HANDLE IMAGE UPLOAD TO BASE 64
	async function uploadAvatar(e: { [index: string]: string | any }) {
		Formik.setFieldValue("avatar", await convert2base64(e.target.files[0]));
	}

	// Populate input with previous data
	useEffect(() => {
		if (!props.data) {
			return;
		}

		Formik.setValues({
			...props.data.profile,
			avatar: props.data.avatar,
			id: props.data.id,
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full overflow-y-auto">
			{step === 0 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(0, 4).map((_v, i) => (
						<FormInput
							width="w-full"
							id={_v.id}
							name={_v.name}
							type={"text"}
							styles={_v.styles}
							labelStyles={_v.labelStyles}
							onChange={_v.onChange}
							value={_v.value}
							onBlur={_v.onBlur}
							disabled={_v.disabled}
							// error={_v.error}
							// touched={_v.touched}
						/>
					))}
				</div>
			) : null}
			{step === 1 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center pt-4">
					{FormData.slice(-3).map((_v, i) => (
						<PasswordInput
							width="w-full"
							id={_v.id}
							name={_v.name}
							type={"text"}
							styles={_v.styles}
							labelStyles={_v.labelStyles}
							onChange={_v.onChange}
							value={_v.value}
							onBlur={_v.onBlur}
							disabled={_v.disabled}
							// error={_v.error}
							// touched={_v.touched}
						/>
					))}

					<div className="w-full h-full">
						<TextArea
							labelStyles={labelStyles}
							name="Reason"
							id="accountStatus.reason"
							onChange={(e) => {
								Formik.setFieldValue("accountStatus.reason", e.target.value);
								Formik.setFieldValue("accountStatus.status", "confirmed");
							}}
							value={Formik.values?.accountStatus?.reason || ""}
							disabled={false}
						/>
					</div>
					{Formik.values.avatar ? (
						<div>
							<Image
								image={Formik.values.avatar || ""}
								width={100}
								height={100}
								styles="mx-auto object-fit"
							/>
						</div>
					) : null}

					<div className="w-full h-24 mt-4">
						<Upload
							name="avatar"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								uploadAvatar(e);
							}}
						/>
					</div>
				</div>
			) : null}

			<div className="w-full">
				{step === 1 ? (
					<Button
						text="Back"
						disabled={addNewResult?.isLoading}
						onClick={() => setStep(() => 0)}
						className="h-[41px] mt-6 font-bold border border-[#002E66] text-[#002E66] rounded-[38px] w-full bg-white"
						type="button"
					/>
				) : null}
				<Button
					text={step === 1 ? "Submit" : "Next"}
					disabled={addNewResult?.isLoading}
					showModal={addNewResult?.isLoading}
					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/>
			</div>
		</form>
	);
};
