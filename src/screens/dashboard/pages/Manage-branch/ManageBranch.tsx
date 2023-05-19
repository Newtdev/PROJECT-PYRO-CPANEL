import { Flag } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
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
import { Data, ErrorType } from "src/helpers/alias";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import {
	useAddNewBranchMutation,
	useFetchAllBranchQuery,
} from "src/api/manageBranchAPISlice";
import { TableLoader } from "src/components/LoaderContainer";
import { useDebounce } from "src/hooks/useDebounce";
import {
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";

// TABLE HEADER TYPES
export interface HeadCellTypes {
	id: keyof Data;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
}

// TABLE HEADER DETAILS
const headCells: readonly HeadCellTypes[] = [
	{
		id: "name",
		minWidth: 170,
		label: "Name",
	},
	{
		id: "phoneNumber",
		minWidth: 170,
		label: "Contact info",
	},
	{
		id: "address",
		minWidth: 170,
		label: "Address",
	},
	{
		id: "lga",
		minWidth: 170,
		label: "LGA",
	},
	{
		id: "latitude",
		minWidth: 170,
		label: "Latitude",
	},
	{
		id: "longitude",
		minWidth: 170,
		label: "Longitude",
	},
	{
		id: "state",
		minWidth: 170,
		label: "State",
	},
	{
		id: "status",
		minWidth: 170,
		label: "Status",
	},
];

// ADD NEW BRANCH COMPONENTS
const ManageBranch = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const [value, setValue] = React.useState<string>("one");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const { debouncedValue } = useDebounce(filteredValue, 700);
	const [pagination, setPagination] = useState({ newPage: 1 });

	const fetchAllBranchResult = useFetchAllBranchQuery({
		query: debouncedValue,
		page: pagination.newPage,
	});

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	const handledAPIResponse = useMemo(() => {
		let neededData: Data[] = [];
		const hqProfile = fetchAllBranchResult?.currentData;
		if (hqProfile) {
			for (const iterator of hqProfile?.stationBranches?.data) {
				const { id, name, phoneNumber, status, location } = iterator;

				neededData = [
					...neededData,
					{
						id,
						name,
						phoneNumber,
						status,
						lga: location.lga,
						address: location?.address,
						latitude: location?.latitude,
						longitude: location?.longitude,
						state: location?.state,
					},
				];
			}
			return { hqProfile, neededData };
		}
	}, [fetchAllBranchResult]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const navigate = useNavigate();

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// TABLE FILTER TAB
	const tabData: { id: string | number; value: string; label: string }[] = [
		{ id: 1, value: "one", label: "All" },
		{ id: 1, value: "two", label: "Most popular" },
	];

	function fn(data: { [index: string]: string | number }) {
		navigate(`/branch/${data?.id}`, { state: data.name });
	}

	// CONFIRMATION OF WHAT IS SELECTED
	// const isSelected = (data: string) => selected.indexOf(name) !== -1;

	let dataToChildren: { [index: string]: string | number | any } = {
		rows: handledAPIResponse?.neededData || [],
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
			totalPage: handledAPIResponse?.hqProfile?.totalPages,
			limit: handledAPIResponse?.hqProfile?.limit,
			page: handledAPIResponse?.hqProfile?.page,
		},
	};
	function closeAddHQModal(): void {
		setShowAddModal((prev) => !prev);
	}

	return (
		<section>
			<article>
				<div className="flex justify-between items-center mt-6 h-20">
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
					<div className="w-fit flex items-center">
						<div className="w-[189px] h-11 mr-6">
							<Button
								text="Add Branch"
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
				<div className="h-fit bg-white w-full">
					<TableLoader
						data={fetchAllBranchResult}
						tableData={handledAPIResponse?.neededData || []}>
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
									<div className="w-full h-12 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
										<h1>Add branch</h1>
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

									{/* <Divider /> */}

									<AddNewBranch close={closeAddHQModal} />
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</article>
		</section>
	);
};

export default ManageBranch;

const AddbranchValidation = Yup.object({
	name: Yup.string().label("First name").required(),
	phoneNumber: Yup.string()
		.label("phone number")
		.length(11, "invalid")
		.required(),
	location: Yup.object({
		lga: Yup.string().label("HQ name").required(),
		latitude: Yup.string().label("Latitude").required(),
		longitude: Yup.string().label("longitude").required(),
		address: Yup.string().label("Address").required(),
		state: Yup.string().label("State").required(),
	}),
	branchManager: Yup.object({
		firstName: Yup.string().label("First name").required(),
		lastName: Yup.string().label("Last name").required(),
		phoneNumber: Yup.string()
			.label("phone number")
			.length(11, "invalid")
			.required(),
		email: Yup.string().label("Email").email().required(),
		password: Yup.string().label("Password").required(),
	}),
	// stationHQ.
});

export type addBranchSchema = Yup.InferType<typeof AddbranchValidation>;

export const AddNewBranch = (props: { close: () => void }) => {
	const [step, setStep] = useState<number>(0);
	const [AddNewBranch, addNewBranchResult] = useAddNewBranchMutation();

	async function addNewBranchFunct(values: addBranchSchema) {
		try {
			const response = await AddNewBranch(values).unwrap();
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
			name: "AA Rano",
			phoneNumber: "08157592146",
			location: {
				lga: "AMAC",
				state: "Abuja",
				latitude: "43412341234",
				longitude: "42342342342",
				address: "Wuse Zone 6 Abuja Nigeria",
			},
			branchManager: {
				firstName: "Emma",
				lastName: "Doe",
				email: "emma@doe.com",
				phoneNumber: "08157592150",
				password: "Test@1234",
			},
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddbranchValidation,

		onSubmit: (values) => {
			if (step === 1) {
				addNewBranchFunct(values);
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
			disabled: addNewBranchResult?.isLoading,
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
			disabled: addNewBranchResult?.isLoading,
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
			disabled: addNewBranchResult?.isLoading,
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

			disabled: addNewBranchResult.isLoading,
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

			disabled: addNewBranchResult.isLoading,
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

			disabled: addNewBranchResult.isLoading,
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
			disabled: addNewBranchResult?.isLoading,
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

			disabled: addNewBranchResult?.isLoading,
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
			disabled: addNewBranchResult?.isLoading,
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
			disabled: addNewBranchResult?.isLoading,
			error: Formik.errors.branchManager?.email,
			touched: Formik.touched.branchManager?.email,
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
			disabled: addNewBranchResult?.isLoading,
			error: Formik.errors.branchManager?.password,
			touched: Formik.touched.branchManager?.password,
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
						disabled={addNewBranchResult.isLoading}
						showModal={addNewBranchResult.isLoading}
						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
						type="button"
						onClick={() => setStep((prev) => prev - 1)}
					/>
				) : null}

				<Button
					text={step < 1 ? "Next" : "Add New Branch"}
					disabled={addNewBranchResult?.isLoading}
					showModal={addNewBranchResult?.isLoading}
					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/>
			</div>
		</form>
	);
};
