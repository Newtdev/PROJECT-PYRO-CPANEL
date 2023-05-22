import { Flag } from "@mui/icons-material";
import React, { useState, useMemo } from "react";
import { ReactElement } from "react";
import { FormInput, SearchInput } from "src/components/inputs";
import EnhancedTable from "src/components/Table";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button } from "src/components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FlagModal, Modal } from "src/components/ModalComp";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Lines } from "src/components/Icons";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import { useAddNewHQMutation } from "src/api/manageHQApiSlice";
import { Data, ErrorType } from "src/helpers/alias";
import { TableLoader } from "src/components/LoaderContainer";
import {
	handleDateFormat,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { useDebounce } from "src/hooks/useDebounce";
import { useGetAdminQuery } from "src/api/setttingsApislice";

interface HeadCell {
	id: string;
	label: string | ReactElement;
	minWidth: number;
}

const headCells: readonly HeadCell[] = [
	{
		id: "firstName",
		minWidth: 170,
		label: "First name",
	},
	{
		id: "lastName",
		minWidth: 170,
		label: "Last name",
	},
	{
		id: "email",
		minWidth: 170,
		label: "Email",
	},
	{
		id: "role",
		minWidth: 170,
		label: "Role",
	},
	{
		id: "phoneNumber",
		minWidth: 170,
		label: "Phone number",
	},
	{
		id: "createdAt",
		minWidth: 170,
		label: "Date",
	},
];

// YUP VALIDATION FOR ADD BRANCH TYPE
const AddbranchValidation = Yup.object({
	firstName: Yup.string().label("First name").required(),
	lastName: Yup.string().label("Last name").required(),
	phoneNumber: Yup.string()
		.label("phone number")
		.length(11, "invalid")
		.required(),
	email: Yup.string().label("Email").email().required(),
	password: Yup.string().label("Password").required(),
	// gender: Yup.string<"male" | "female">().nullable().defined(),
	gender: Yup.string().label("Gender").required(),
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
	// stationHQ.
});
export type addBranchSchema = Yup.InferType<typeof AddbranchValidation>;

const AddNewHQ = (props: { close: () => void }) => {
	const [step, setStep] = useState<number>(0);
	const [AddNewHq, addNewResult] = useAddNewHQMutation();

	async function addNewHQ(values: addBranchSchema) {
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

	const Formik = useFormik<addBranchSchema>({
		initialValues: {
			firstName: "AYM",
			lastName: "Shafa",
			email: "aym@shafa.com",
			phoneNumber: "08051334098",
			password: "Test@1234",
			gender: "male",
			accountType: "stationHq",
			stationHQ: {
				name: "AYM Shafa",
				email: "info@aymshafa.com",
				phoneNumber: "08051334098",
				hqAddress: "Testing hq address",
				state: "Abuja",
			},
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddbranchValidation,
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
		{
			id: "password",
			name: "Manager's password",
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
			id: "gender",
			name: "Manager's gender",
			type: "text",
			styles: `${styles} ${
				Formik.errors.gender && Formik.touched.gender
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.gender,
			onBlur: Formik.handleBlur,

			disabled: addNewResult?.isLoading,
			error: Formik.errors.gender,
			touched: Formik.touched.gender,
		},
		{
			id: "stationHQ.name",
			name: "Branch name",
			type: "text",
			styles: `${styles} ${
				Formik.errors?.stationHQ?.name && Formik.touched?.stationHQ?.name
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values?.stationHQ?.name,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors?.stationHQ?.name,
			touched: Formik.touched?.stationHQ?.name,
		},
		{
			id: "stationHQ.email",
			name: "Branch email",
			type: "email",
			styles: `${styles} ${
				Formik.errors?.stationHQ?.email && Formik.touched.email
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values?.stationHQ?.email,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.stationHQ?.email,
			touched: Formik.touched.stationHQ?.hqAddress,
		},
		{
			id: "stationHQ.phoneNumber",
			name: "Branch phone number",
			type: "text",
			styles: `${styles} ${
				Formik.errors?.stationHQ?.phoneNumber &&
				Formik.touched.stationHQ?.phoneNumber
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.stationHQ?.phoneNumber,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.stationHQ?.email,
			touched: Formik.touched.stationHQ?.email,
		},
		{
			id: "stationHQ.hqAddress",
			name: "Branch address",
			type: "text",
			styles: `${styles} ${
				Formik.errors?.stationHQ?.hqAddress &&
				Formik.touched?.stationHQ?.hqAddress
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.stationHQ?.hqAddress,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.stationHQ?.hqAddress,
			touched: Formik.touched.stationHQ?.hqAddress,
		},
		{
			id: "stationHQ.state",
			name: "State",
			type: "text",
			styles: `${styles} ${
				Formik.errors.stationHQ?.state && Formik.touched.stationHQ?.state
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.stationHQ?.state,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.stationHQ?.state,
			touched: Formik.touched.stationHQ?.state,
		},
	];

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full">
			{step === 0 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					{FormData.slice(0, 6).map((dt, i) => (
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
const ManageAdmin = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const [value, setValue] = React.useState<string>("one");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [pagination, setPagination] = useState({ newPage: 1 });
	const navigate = useNavigate();
	const { debouncedValue } = useDebounce(filteredValue, 700);

	interface AdminListType {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		role: string;
		phoneNumber: string;
		createdAt: string;
	}

	const adminListQueryResult = useGetAdminQuery({
		query: debouncedValue,
		page: pagination.newPage,
	});
	const handledAPIResponse = useMemo(() => {
		const adminListQuery = adminListQueryResult?.currentData?.data?.data;
		return adminListQuery?.reduce(
			(acc: AdminListType[], cur: AdminListType) => [
				...acc,
				{
					id: cur?.id,
					firstName: cur?.firstName,
					lastName: cur?.lastName,
					email: cur.email,
					role: cur.role,
					phoneNumber: cur?.phoneNumber,
					createdAt: handleDateFormat(cur.createdAt),
				},
			],
			[]
		);
	}, [adminListQueryResult]);

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
		{ id: 1, value: "two", label: "Most popular" },
	];

	function fn(data: { [index: string]: string | number }) {
		navigate(`/manageHQ/${data?.id}`, { state: data?.name });
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
			totalPage: adminListQueryResult?.currentData?.totalPages,
			limit: adminListQueryResult?.currentData?.limit,
			page: adminListQueryResult?.currentData?.page,
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
							placeholder="Search for names, branches, category"
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
						data={adminListQueryResult}
						tableData={handledAPIResponse || []}>
						<div className="h-full w-full">
							<div className="h-full w-full flex justify-between items-center py-6 shadow-lg rounded-t-lg ">
								<div>
									<Box sx={{ width: "100%" }}>
										<Tabs
											value={value}
											onChange={handleChange}
											textColor="secondary"
											indicatorColor="secondary"
											className="px-4"
											aria-label="secondary tabs example">
											{tabData?.map((dt) => {
												return (
													<Tab
														sx={{
															fontSize: 14,
														}}
														key={dt.id}
														value={dt.value}
														label={dt.label}
													/>
												);
											})}
										</Tabs>
									</Box>
								</div>
								<div className=" flex justify-end items-center h-11 text-sm pr-12 cursor-pointer">
									<Flag
										color="error"
										fontSize="large"
										onClick={() => setShowModal(true)}
									/>
								</div>
							</div>

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
						<Modal>
							<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
								<div className="w-[50%] max-w-[511px] h-fit flex flex-col justify-center rounded-[20px] pb-10 bg-white">
									<div className="w-full h-16 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
										<h1>Create HQ</h1>
										<button
											onClick={() => setShowAddModal(false)}
											disabled={false}>
											<HighlightOffOutlinedIcon
												fontSize="large"
												className="text-black cursor-pointer"
											/>
										</button>
									</div>
									<div className="w-full">
										<Lines />
									</div>
									<AddNewHQ close={closeAddHQModal} />{" "}
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</article>
		</section>
	);
};

export default ManageAdmin;
