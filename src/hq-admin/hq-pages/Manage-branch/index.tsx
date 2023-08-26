import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

import { Button } from "src/components/Button";
import { SearchInput } from "src/components/inputs";
import { TableLoader } from "src/components/LoaderContainer";
import { FlagModal, FormModal, Modal } from "src/components/ModalComp";
import EnhancedTable from "src/components/Table";
import { FormType, ManageBranchType } from "src/helpers/alias";
import {
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";

import { useAuth } from "src/hooks/useAuth";
import { useDebounce } from "src/hooks/useDebounce";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useIsSelected from "src/hooks/useIsSelected";
import {
	useAddHqNewBranchMutation,
	useExportHQBranchQuery,
	useFetchHQBranchQuery,
} from "src/hq-admin/hq-api/manageHqApiSlice";
import { AddNewBranch } from "./Components";

export interface HeadCellTypes {
	id: string;
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

export default function ManageHQBranch() {
	const { user } = useAuth();
	const hqId = user?.stationHQ;
	const [filteredValue, setFilteredValue] = useState<string>("");
	const { debouncedValue } = useDebounce(filteredValue, 700);
	const [pagination, setPagination] = useState({ newPage: 1 });
	const [showAddModal, setShowAddModal] = useState(false);
	const [AddNewBranchRequest, addNewBranchResult] = useAddHqNewBranchMutation();

	const fetchAllBranchResult = useFetchHQBranchQuery(
		{
			hqId: hqId,
			query: debouncedValue,
			page: pagination.newPage,
		},
		{ skip: !hqId }
	);

	const exportBranchResult = useExportHQBranchQuery({});

	async function addNewBranchFunct(values: FormType) {
		try {
			const response = await AddNewBranchRequest(values).unwrap();
			if (response) {
				SuccessNotification(response?.data?.message);
				setShowAddModal(() => false);
			}
		} catch (error: any) {
			setShowAddModal(() => false);
			handleNotification(error);
		}
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	const handledAPIResponse = useMemo(() => {
		const response = fetchAllBranchResult?.data;
		const normalizedAPIResponse = response?.data?.data?.reduce(
			(acc: ManageBranchType[], cur: ManageBranchType) => [
				...acc,
				{
					id: cur?.id,
					name: cur?.name,
					phoneNumber: cur?.phoneNumber,
					status: cur?.status,
					lga: cur?.location?.lga,
					address: cur?.location?.address,
					latitude: cur?.location?.latitude,
					longitude: cur?.location?.longitude,
					state: cur?.location?.state,
				},
			],
			[]
		);
		return { normalizedAPIResponse, response };
	}, [fetchAllBranchResult]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const navigate = useNavigate();

	// TABLE FILTER TAB

	function fn(data: { [index: string]: string | number }) {
		navigate(`/manage-branch/${data?.id}`, { state: data.name });
	}

	let dataToChildren: { [index: string]: string | number | any } = {
		rows: handledAPIResponse?.normalizedAPIResponse || [],
		headCells,
		handleRowClick,
		showFlag: false,
		showCheckBox: true,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
		handleChangePage,
		paginationData: {
			totalPage: handledAPIResponse?.response?.totalPages,
			limit: handledAPIResponse?.response?.limit,
			page: handledAPIResponse?.response?.page,
		},
	};

	const handleExportData = useMemo(
		() => exportBranchResult?.currentData,
		[exportBranchResult]
	);
	console.log(handleExportData);

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
						<div className="w-[109px] h-11">
							<CSVLink filename="branch_data" data={handleExportData ?? []}>
								<Button
									text="Export"
									className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
									type="button"
									showIcon={false}
									onClick={() => console.log("add branch")}
								/>
							</CSVLink>
						</div>
					</div>
				</div>
				<div className="h-fit bg-white w-full">
					<TableLoader
						data={fetchAllBranchResult}
						tableData={handledAPIResponse?.normalizedAPIResponse || []}>
						<div className="h-full w-full">
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
							name="Add branch"
							onClick={() => setShowAddModal((prevState) => !prevState)}>
							<AddNewBranch
								makeApiRequest={(values: FormType) => addNewBranchFunct(values)}
								apiResult={addNewBranchResult}
							/>
						</FormModal>
					) : null}
				</div>
			</article>
		</section>
	);
}

// export const AddNewBranch = (props: { close: () => void }) => {
// 	const [step, setStep] = useState<number>(0);
// 	const [AddNewBranch, addNewBranchResult] = useAddHqNewBranchMutation();

// 	async function addNewBranchFunct(values: FormType) {
// 		try {
// 			const response = await AddNewBranch(values).unwrap();
// 			if (response) {
// 				SuccessNotification(response?.data?.message);
// 				props.close();
// 			}
// 		} catch (error: any) {
// 			props.close();
// 			handleNotification(error);
// 		}
// 	}

// 	const Formik = useFormik<FormType>({
// 		initialValues: {
// 			name: "",
// 			phoneNumber: "",
// 			location: {
// 				lga: "",
// 				state: "",
// 				latitude: "",
// 				longitude: "",
// 				address: "",
// 			},
// 			branchManager: {
// 				firstName: "",
// 				lastName: "",
// 				email: "",
// 				phoneNumber: "",
// 				password: "",
// 			},
// 		},
// 		validateOnBlur: true,
// 		validateOnChange: true,
// 		validationSchema: AddbranchValidation[step],

// 		onSubmit: (values) => {
// 			if (step === 1) {
// 				addNewBranchFunct(values);
// 			} else {
// 				setStep((prev) => prev + 1);
// 			}
// 		},
// 	});
// 	const styles =
// 		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
// 	const labelStyles =
// 		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

// 	const FormData = [
// 		{
// 			id: "name",
// 			name: "Branch name",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.name && Formik.touched.name
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.name,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.name,
// 			touched: Formik.touched.name,
// 		},
// 		{
// 			id: "phoneNumber",
// 			name: "Branch contact info",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.phoneNumber && Formik.touched.phoneNumber
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.phoneNumber,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.phoneNumber,
// 			touched: Formik.touched.phoneNumber,
// 		},
// 		{
// 			id: "location.address",
// 			name: "Branch Address",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.location?.address && Formik.touched.location?.address
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.location.address,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.location?.address,
// 			touched: Formik.touched.location?.address,
// 		},
// 		{
// 			id: "location.lga",
// 			name: "Branch LGA",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.location?.lga && Formik.touched.location?.lga
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.location.lga,
// 			onBlur: Formik.handleBlur,

// 			disabled: addNewBranchResult.isLoading,
// 			error: Formik.errors.location?.lga,
// 			touched: Formik.touched.location?.lga,
// 		},
// 		{
// 			id: "location.latitude",
// 			name: "Branch Latitude",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.location?.lga && Formik.touched.location?.latitude
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.location.latitude,
// 			onBlur: Formik.handleBlur,

// 			disabled: addNewBranchResult.isLoading,
// 			error: Formik.errors.location?.latitude,
// 			touched: Formik.touched.location?.latitude,
// 		},
// 		{
// 			id: "location.longitude",
// 			name: "Branch longitude",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.location?.lga && Formik.touched.location?.longitude
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.location.longitude,
// 			onBlur: Formik.handleBlur,

// 			disabled: addNewBranchResult.isLoading,
// 			error: Formik.errors.location?.longitude,
// 			touched: Formik.touched.location?.longitude,
// 		},

// 		{
// 			id: "location.state",
// 			name: "Branch state",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.location?.state && Formik.touched.location?.state
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.location?.state,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.location?.state,
// 			touched: Formik.touched.location?.state,
// 		},
// 		{
// 			id: "branchManager.firstName",
// 			name: "Branch manager first name",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.branchManager?.firstName &&
// 				Formik.touched.branchManager?.firstName
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.branchManager.firstName,
// 			onBlur: Formik.handleBlur,

// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.branchManager?.firstName,
// 			touched: Formik.touched.branchManager?.firstName,
// 		},
// 		{
// 			id: "branchManager.lastName",
// 			name: "Branch manager last name",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors?.branchManager?.lastName &&
// 				Formik.touched?.branchManager?.lastName
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values?.branchManager?.lastName,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors?.branchManager?.lastName,
// 			touched: Formik.touched?.branchManager?.lastName,
// 		},
// 		{
// 			id: "branchManager.email",
// 			name: "Branch manager email",
// 			type: "email",
// 			styles: `${styles} ${
// 				Formik.errors?.branchManager?.email &&
// 				Formik.touched.branchManager?.email
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values?.branchManager?.email,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.branchManager?.email,
// 			touched: Formik.touched.branchManager?.email,
// 		},
// 		{
// 			id: "branchManager.password",
// 			name: "Branch manager's password",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.branchManager?.password &&
// 				Formik.touched.branchManager?.password
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.branchManager?.password,
// 			onBlur: Formik.handleBlur,
// 			disabled: addNewBranchResult?.isLoading,
// 			error: Formik.errors.branchManager?.password,
// 			touched: Formik.touched.branchManager?.password,
// 		},
// 	];

// 	return (
// 		<form
// 			onSubmit={Formik.handleSubmit}
// 			className="w-full flex flex-col justify-center items-center px-4 h-full">
// 			{step === 0 ? (
// 				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
// 					{FormData.slice(0, 6).map((dt, i) => (
// 						<FormInput
// 							id={dt.id}
// 							name={dt.name}
// 							type={dt.type}
// 							styles={dt.styles}
// 							labelStyles={dt.labelStyles}
// 							onChange={dt.onChange}
// 							value={dt.value}
// 							onBlur={dt.onBlur}
// 							disabled={dt.disabled}
// 							error={dt.error}
// 							touched={dt.touched}
// 						/>
// 					))}
// 				</div>
// 			) : null}
// 			{step === 1 ? (
// 				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
// 					{FormData.slice(-5).map((dt, i) => (
// 						<FormInput
// 							id={dt.id}
// 							name={dt.name}
// 							type={dt.type}
// 							styles={dt.styles}
// 							labelStyles={dt.labelStyles}
// 							onChange={dt.onChange}
// 							value={dt.value}
// 							onBlur={dt.onBlur}
// 							disabled={dt.disabled}
// 							error={dt.error}
// 							touched={dt.touched}
// 						/>
// 					))}
// 				</div>
// 			) : null}

// 			<div className="w-full">
// 				{step > 0 ? (
// 					<Button
// 						text="Back"
// 						disabled={addNewBranchResult.isLoading}
// 						showModal={addNewBranchResult.isLoading}
// 						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
// 						type="button"
// 						onClick={() => setStep((prev) => prev - 1)}
// 					/>
// 				) : null}

// 				<Button
// 					text={step < 1 ? "Next" : "Add New Branch"}
// 					disabled={addNewBranchResult?.isLoading}
// 					showModal={addNewBranchResult?.isLoading}
// 					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
// 					type="submit"
// 				/>
// 			</div>
// 		</form>
// 	);
// };
