import React, { Fragment, useMemo, useState } from "react";
import AdminProfile from "src/assets/img/AdminProfile.svg";
import ManageWebsite from "src/assets/img/ManageWebsite.svg";
import ManageAdmins from "src/assets/img/ManageAdmin.svg";
import ResetPasword from "src/assets/img/ResetPasword.svg";
import { CardButton } from "src/components/Card";
import { cardBtnType, ErrorType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";
import {
	useAddAdminMutation,
	useGetAdminQuery,
	useUpdateAdminMutation,
} from "src/api/setttingsApislice";
import ProfileCard from "src/components/ProfileCard";
import ManageAdmin from "./ManageAdmin";
import { LoaderContainer } from "src/components/LoaderContainer";
import { Modal } from "src/components/ModalComp";
import { HighlightOffOutlined } from "@mui/icons-material";
import { Lines } from "src/components/Icons";
import { Button } from "src/components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PasswordInput } from "src/components/inputs";
import { Upload } from "src/components/Upload";
import {
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";

const Settings = () => {
	const [cardName, setName] = useState<string>("profile");
	const [showModal, setShowAddModal] = useState<boolean>(false);
	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: AdminProfile,
			name: "Profile",
			link: APP_ROUTE.ADMIN_PROFILE,
		},

		{
			id: 2,
			icon: ManageAdmins,
			name: "Manage Admin",
			link: APP_ROUTE.MANAGE_ADMIN,
		},
		{
			id: 3,
			icon: ManageWebsite,
			name: "Manage Website",
			link: APP_ROUTE.MANAGE_WEBSITE,
		},
		{
			id: 4,
			icon: ResetPasword,
			name: "Reset Password",
			link: APP_ROUTE.RESET_PASSWORD,
		},
	];

	const adminResult = useGetAdminQuery("");

	const handledAPIResponse = useMemo(() => {
		const hqProfile = adminResult?.data?.data?.data[0];

		return {
			id: hqProfile?.id,
			firstName: hqProfile?.firstName,
			lastName: hqProfile?.lastName,
			email: hqProfile?.email,
			role: hqProfile?.role,
			phoneNumber: hqProfile?.phoneNumber,
		};
	}, [adminResult]);

	function CloseModal() {
		setShowAddModal((prevState) => !prevState);
	}

	return (
		<section>
			<article>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					<>
						{HQData.map((dt) => (
							<Fragment>
								<CardButton
									name={dt.name}
									icon={dt.icon}
									link={dt.link}
									height={"98px"}
									onClick={() =>
										dt?.name.toLowerCase() === "reset password"
											? setShowAddModal(true)
											: setName(dt.name)
									}
								/>
							</Fragment>
						))}
					</>
				</div>
				<LoaderContainer data={adminResult}>
					{cardName.toLowerCase() === "profile" ? (
						<ProfileCard
							showBanner={false}
							data={handledAPIResponse || {}}
							imageURL=""
							showImage={true}
						/>
					) : null}
					{cardName.toLowerCase() === "manage admin" ? <ManageAdmin /> : null}
					{showModal ? (
						<ResetPassword close={CloseModal} id={handledAPIResponse.id} />
					) : null}
				</LoaderContainer>
			</article>
		</section>
	);
};

export default Settings;

const AddbranchValidation = Yup.object({
	oldPassword: Yup.string().label("Old password").required(),
	password: Yup.string().label("Password").required(),
	confirmPassword: Yup.string().label("Password"),
	avatar: Yup.string().notRequired(),
	id: Yup.string().notRequired(),
});

export type UpdateAdminTypes = Yup.InferType<typeof AddbranchValidation>;

const ResetPassword = (props: { close: () => void; id: string }) => {
	const [updateAdmin, addNewResult] = useUpdateAdminMutation();

	async function addNewAdmin(values: UpdateAdminTypes) {
		try {
			const response = await updateAdmin(values).unwrap();
			if (response) {
				props.close();
			}
			SuccessNotification(response?.data?.message);
		} catch (error: ErrorType | any) {
			props.close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<UpdateAdminTypes>({
		initialValues: {
			oldPassword: "",
			password: "",
			confirmPassword: "",
			avatar: "",
			id: props.id,
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddbranchValidation,
		onSubmit: (values) => {
			addNewAdmin(values);
		},
	});
	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
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
	return (
		<Modal>
			<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
				<div className="w-[50%] max-w-[511px] h-fit flex flex-col justify-center rounded-[20px] pb-10  bg-white">
					<div className="w-full h-16 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
						<h1>Update Admin Info</h1>
						<button onClick={props.close} disabled={false}>
							<HighlightOffOutlined
								fontSize="large"
								className="text-black cursor-pointer"
							/>
						</button>
					</div>
					<div className="w-full">
						<Lines />
					</div>
					<form
						onSubmit={Formik.handleSubmit}
						className="w-full flex flex-col justify-center items-center px-4 h-full overflow-y-auto pt-4">
						<div className="grid grid-cols-1 w-full gap-x-2 content-center">
							{FormData.map((_v, i) => (
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
									error={_v.error}
									touched={_v.touched}
								/>
							))}
						</div>
						<div className="w-full h-36 mt-4">
							<Upload
								name="avatar"
								onChange={(e: any) =>
									Formik.setFieldValue(
										"avatar",
										URL.createObjectURL(e.target.files[0])
									)
								}
							/>
						</div>

						<div className="w-full">
							<Button
								text={"Submit"}
								disabled={addNewResult?.isLoading}
								showModal={addNewResult?.isLoading}
								className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
								type="submit"
							/>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	);
};
