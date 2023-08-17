import { Flag } from "@mui/icons-material";
import React, { useState, useMemo } from "react";
import { ReactElement } from "react";
import {
	FormInput,
	PasswordInput,
	SearchInput,
	SelectInput,
} from "src/components/inputs";
import EnhancedTable from "src/components/Table";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button } from "src/components/Button";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { FlagModal, FormModal, Modal } from "src/components/ModalComp";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import {
	useAddNewHQMutation,
	useFetchAllHQQuery,
} from "src/api/manageHQApiSlice";
import { Data, ErrorType } from "src/helpers/alias";
import { TableLoader } from "src/components/LoaderContainer";
import {
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { useDebounce } from "src/hooks/useDebounce";
import { customAlphabet } from "nanoid";
import { format } from "date-fns";

interface HeadCell {
	id: string;
	label: string | ReactElement;
	minWidth: number;
}

const headCells: readonly HeadCell[] = [
	{
		id: "createDate",
		minWidth: 170,
		label: "Reg date",
	},
	{
		id: "name",
		minWidth: 170,
		label: "Name",
	},
	{
		id: "email",
		minWidth: 170,
		label: "Email",
	},
	{
		id: "hqAddress",
		minWidth: 170,
		label: "HQ address",
	},
	{
		id: "phoneNumber",
		minWidth: 170,
		label: "Phone number",
	},
	{
		id: "state",
		minWidth: 170,
		label: "State",
	},
];
type ProfileType = { [index: string]: string };

const ManageHQ = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const [value, setValue] = React.useState<string>("one");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [pagination, setPagination] = useState({ newPage: 1 });
	const navigate = useNavigate();
	const { debouncedValue } = useDebounce(filteredValue, 700);

	const hqQueryResult = useFetchAllHQQuery({
		query: debouncedValue,
		page: pagination.newPage,
	});

	// hqQueryResult?.currentData?.hqProfile?.totalData;
	const handledAPIResponse = useMemo(() => {
		let neededData: ProfileType[] = [];
		const hqProfile = hqQueryResult?.currentData?.hqProfile;
		if (hqProfile) {
			for (const iterator of hqProfile?.data) {
				const { id, name, email, hqAddress, phoneNumber, state, createdAt } =
					iterator;
				let createDate = format(new Date(createdAt), "dd/mm/yyyy");

				neededData = [
					...neededData,
					{ createDate, id, name, email, hqAddress, phoneNumber, state },
				];
			}
			return neededData;
		}
	}, [hqQueryResult]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse);

	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	// API TO GET ALL HQ INFORMATION

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	// TABLE FILTER TAB
	const tabData: { id: string | number; value: string; label: string }[] = [
		{ id: 1, value: "one", label: "All" },
	];

	function fn(data: { [index: string]: string | number }) {
		navigate(`/manage-HQ/${data?.name}`, {
			state: { name: data?.name, id: data?.id },
		});
	}
	let dataToChildren: any = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick,
		showFlag: true,
		showCheckBox: true,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
		handleChangePage,
		paginationData: {
			totalPage: hqQueryResult?.currentData?.hqProfile?.totalPages,
			limit: hqQueryResult?.currentData?.hqProfile?.limit,
			page: hqQueryResult?.currentData?.hqProfile?.page,
		},
	};

	function closeAddHQModal(): void {
		setShowAddModal((prev) => !prev);
	}

	return (
		<section>
			<article>
				<div className="flex justify-between items-center mt-6 h-20 ">
					<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
						<SearchInput
							name="branch-search"
							placeholder="Search"
							value={filteredValue}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const target = e.target;
								setFilteredValue(target.value);
							}}
						/>
					</div>
					<div className="w-fit flex items-center ">
						<div className="w-[189px] h-11 mr-6">
							<Button
								text="Create HQ"
								className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-start pl-4"
								type="button"
								showIcon={true}
								onClick={() => setShowAddModal(true)}
							/>
						</div>
						<div className="w-[109px]  h-11">
							<Button
								text="Export"
								className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
								type="button"
								showIcon={false}
								onClick={() => console.log("add branch")}
							/>
						</div>
					</div>
				</div>
				<div className="h-fit w-full bg-white">
					<TableLoader
						data={hqQueryResult}
						tableData={handledAPIResponse || []}>
						<div className="h-full w-full">
							<div className="h-full w-full flex justify-between items-center py-6 shadow-lg rounded-t-lg "></div>

							<div className="relative">
								<EnhancedTable {...dataToChildren} />
							</div>
						</div>
					</TableLoader>

					{/* FLAG A HQ */}
					{showModal && (
						<Modal styles="absolute right-10 top-56">
							<FlagModal
								info="Are you sure you want to flag?"
								onClose={() => setShowModal(false)}
								onConfirmation={() => console.log(selected)}
							/>
						</Modal>
					)}

					{showAddModal ? (
						<FormModal
							name="Create HQ"
							onClick={() => setShowAddModal((prevState) => !prevState)}>
							<AddNewHQ close={closeAddHQModal} />{" "}
						</FormModal>
					) : null}
				</div>
			</article>
		</section>
	);
};

export default ManageHQ;

// YUP VALIDATION FOR ADD BRANCH TYPE
const AddbranchValidation = [
	Yup.object({
		accountType: Yup.string().label("Password").notRequired(),
		stationHQ: Yup.object({
			name: Yup.string().label("HQ name").required(),
			email: Yup.string().label("HQ email").email().required(),
			phoneNumber: Yup.string()
				.label("phone number")
				.length(11, "invalid")
				.required(),
			hqAddress: Yup.string().label("HQ address").required(),
			state: Yup.string().label("State").required(),
		}),
	}),
	Yup.object({
		firstName: Yup.string().label("First name").required(),
		lastName: Yup.string().label("Last name").required(),
		phoneNumber: Yup.string()
			.label("phone number")
			.length(11, "invalid")
			.required(),
		email: Yup.string().label("Email").email().required(),
		// password: Yup.string()
		// 	.min(6, "The password is too short")
		// 	.matches(
		// 		/^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})/,
		// 		"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		// 	)
		// 	.required("Password is required!"),
		// gender: Yup.string<"male" | "female">().nullable().defined(),
		gender: Yup.string().label("Gender").required(),
	}),
];

const AddNewHQ = (props: { close: () => void }) => {
	const [step, setStep] = useState<number>(0);
	const [AddNewHq, addNewResult] = useAddNewHQMutation();

	async function addNewHQ(values: FormikValues) {
		try {
			const response = await AddNewHq(values).unwrap();
			if (response) {
				props.close();
			}
			SuccessNotification(response?.data?.message);
		} catch (error: ErrorType | any) {
			props.close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<FormikValues>({
		initialValues: {
			stationHQ: {
				name: "",
				email: "",
				phoneNumber: "",
				hqAddress: "",
				state: "",
			},
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
			gender: "",
			accountType: "stationHq",
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddbranchValidation[step],
		onSubmit: (values) => {
			if (step === 1) {
				addNewHQ(values);
			} else {
				setStep((prev) => prev + 1);
			}
		},
	});

	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
		{
			id: "stationHQ.name",
			name: "HQ name",
			type: "text",
			// styles: `${styles} ${
			// 	Formik.errors?.stationHQ?.name && Formik.touched?.stationHQ?.name
			// 		? "border-red-500"
			// 		: "border-gray-300"
			// }`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values?.stationHQ?.name,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			// error: Formik.errors?.stationHQ?.name,
			// touched: Formik.touched?.stationHQ?.name,
		},
		{
			id: "stationHQ.email",
			name: "HQ email",
			type: "email",
			// styles: `${styles} ${
			// 	Formik.errors?.stationHQ?.email && Formik.touched.email
			// 		? "border-red-500"
			// 		: "border-gray-300"
			// }`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values?.stationHQ?.email,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			// error: Formik.errors.stationHQ?.email,
			// touched: Formik.touched.stationHQ?.hqAddress,
		},
		{
			id: "stationHQ.phoneNumber",
			name: "HQ phone number",
			type: "text",
			// styles: `${styles} ${
			// 	Formik.errors?.stationHQ?.phoneNumber &&
			// 	Formik.touched.stationHQ?.phoneNumber
			// 		? "border-red-500"
			// 		: "border-gray-300"
			// }`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.stationHQ?.phoneNumber,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			// error: Formik.errors.stationHQ?.email,
			// touched: Formik.touched.stationHQ?.email,
		},
		{
			id: "stationHQ.hqAddress",
			name: "HQ address",
			type: "text",
			// styles: `${styles} ${
			// 	Formik.errors?.stationHQ?.hqAddress &&
			// 	Formik.touched?.stationHQ?.hqAddress
			// 		? "border-red-500"
			// 		: "border-gray-300"
			// }`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.stationHQ?.hqAddress,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			// error: Formik.errors.stationHQ?.hqAddress,
			// touched: Formik.touched.stationHQ?.hqAddress,
		},
		{
			id: "firstName",
			name: "Manager's firstname",
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
			name: "Manager's lastname",
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
			name: "Manager's email",
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

			// disabled: loginResult.isLoading,
			error: Formik.errors.email,
			touched: Formik.touched.email,
		},
		{
			id: "phoneNumber",
			name: "Manager's phone number",
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
	];

	const states = [
		"Abuja",
		"Abia",
		"Adamawa",
		"Akwa Ibom",
		"Anambra",
		"Bauchi",
		"Bayelsa",
		"Benue",
		"Borno",
		"Cross River",
		"Delta",
		"Ebonyi",
		"Edo",
		"Ekiti",
		"Enugu",
		"Gombe",
		"Imo",
		"Jigawa",
		"Kaduna",
		"Kano",
		"Katsina",
		"Kebbi",
		"Kogi",
		"Kwara",
		"Lagos",
		"Nasarawa",
		"Niger",
		"Ogun",
		"Ondo",
		"Osun",
		"Oyo",
		"Plateau",
		"Rivers",
		"Sokoto",
		"Taraba",
		"Yobe",
		"Zamfara",
	];
	const generatePassword = () => {
		const characters =
			"1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";
		const pwdCharacters = customAlphabet(characters, 14);
		const pwd = pwdCharacters();
		console.log(pwd);
		return pwd;
	};
	console.log(Formik.errors);
	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 pb-4">
			{step === 0 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(0, 4).map((dt, i) => (
						<>
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
								// error={dt.error}
								// touched={dt.touched}
							/>
						</>
					))}
					<SelectInput
						id="state"
						data={states}
						labelStyles={labelStyles}
						name="Select state"
						onChange={(e) =>
							Formik.setFieldValue(
								"stationHQ.state",
								e.target.value?.toLowerCase()
							)
						}
						value={Formik.values.state}
					/>
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
							// error={dt.error}
							// touched={dt.touched}
						/>
					))}
					<PasswordInput
						width="w-full"
						id="password"
						name={"Password"}
						type={"text"}
						styles={` ${
							Formik.errors.password && Formik.touched.password
								? "border-red-500"
								: "border-gray-300"
						}`}
						labelStyles={labelStyles}
						onChange={(e) => {
							Formik.setFieldValue("password", e.target.value);
							Formik.setFieldValue("confirmPassword", e.target.value);
						}}
						value={Formik.values.password}
						onBlur={Formik.handleBlur}
						disabled={addNewResult.isLoading}
						// error={Formik.errors.password}
						// touched={Formik.touched.password}
					/>
					<Button
						text="Generate password"
						disabled={addNewResult.isLoading}
						// showModal={loginResult.isLoading}
						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
						type="button"
						onClick={() => {
							Formik.setFieldValue("password", generatePassword());
						}}
					/>
					<SelectInput
						id="gender"
						data={["Male", "Female"]}
						labelStyles={labelStyles}
						name="Select gender"
						onChange={(e) =>
							Formik.setFieldValue("gender", e.target.value?.toLowerCase())
						}
						value={Formik.values.type}
					/>
				</div>
			) : null}

			<div className="w-full">
				{step > 0 ? (
					<Button
						text="Back"
						// disabled={loginResult.isLoading}
						// showModal={loginResult.isLoading}
						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
						type="button"
						onClick={() => setStep((prev) => prev - 1)}
					/>
				) : null}

				<Button
					text={step < 1 ? "Next" : "Create HQ"}
					disabled={addNewResult?.isLoading}
					showModal={addNewResult?.isLoading}
					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/>
			</div>
		</form>
	);
};
