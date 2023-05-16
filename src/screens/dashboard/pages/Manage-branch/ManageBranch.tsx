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
import { Data } from "src/helpers/alias";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import { useFetchAllBranchQuery } from "src/api/manageBranchAPISlice";
import { TableLoader } from "src/components/LoaderContainer";
import { useDebounce } from "src/hooks/useDebounce";

export interface HeadCellTypes {
	id: keyof Data;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
}

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
				const { id, name, phoneNumber, status, location, config } = iterator;

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
		navigate(`/branch/${data.name}`, { state: data.name });
	}

	// CONFIRMATION OF WHAT IS SELECTED
	// const isSelected = (data: string) => selected.indexOf(name) !== -1;

	let dataToChildren: { [index: string]: string | number | any } = {
		rows: handledAPIResponse?.neededData || [],
		headCells,
		handleRowClick,
		showFlag: true,
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
	// YUP VALIDATION FOR ADD BRANCH
	const AddbranchValidation = Yup.object({
		name: Yup.string().label("Name").required(),
		email: Yup.string().label("Email").email().required(),
		address: Yup.string().label("Address").required(),
		lga: Yup.string().label("LGA").required(),
		state: Yup.string().label("State").required(),
	});
	// YUP VALIDATION FOR ADD BRANCH TYPE
	type addBranchSchema = Yup.InferType<typeof AddbranchValidation>;

	const Formik = useFormik<addBranchSchema>({
		initialValues: {
			name: "",
			email: "",
			address: "",
			lga: "",
			state: "",
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddbranchValidation,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const styles =
		"h-[38px] py-2 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

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
								<div className="w-[50%] max-w-[511px] h-[599px] flex flex-col justify-center rounded-[20px] pb-10 bg-white">
									<div className="w-full h-24 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
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

									<form
										// onSubmit={Formik.handleSubmit}
										className="w-full flex flex-col justify-around items-center">
										<FormInput
											id="name"
											name="Branch Name"
											type="text"
											styles={`${styles} ${
												Formik.errors.name && Formik.touched.name
													? "border-red-500"
													: "border-gray-300"
											}`}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values.name}
											onBlur={Formik.handleBlur}

											// disabled={loginResult.isLoading}
											// error={Formik.errors.email}
											// touched={Formik.touched.email}
										/>

										<FormInput
											id="email"
											name="Admin email"
											type="email"
											styles={`${styles} ${
												Formik.errors.email && Formik.touched.email
													? "border-red-500"
													: "border-gray-300"
											}`}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values.email}
											onBlur={Formik.handleBlur}

											// disabled={loginResult.isLoading}
											// error={Formik.errors.email}
											// touched={Formik.touched.email}
										/>

										<FormInput
											id="address"
											name="Branch address/coordinate"
											type="text"
											styles={`${styles} ${
												Formik.errors.address && Formik.touched.address
													? "border-red-500"
													: "border-gray-300"
											}`}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values.address}
											onBlur={Formik.handleBlur}

											// disabled={loginResult.isLoading}
											// error={Formik.errors.email}
											// touched={Formik.touched.email}
										/>
										<FormInput
											id="lga"
											name="Local Government Area"
											type="text"
											styles={`${styles} ${
												Formik.errors.lga && Formik.touched.lga
													? "border-red-500"
													: "border-gray-300"
											}`}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values.lga}
											onBlur={Formik.handleBlur}

											// disabled={loginResult.isLoading}
											// error={Formik.errors.email}
											// touched={Formik.touched.email}
										/>

										<FormInput
											id="state"
											name="State"
											type="text"
											styles={`${styles} ${
												Formik.errors.state && Formik.touched.state
													? "border-red-500"
													: "border-gray-300"
											}`}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values.state}
											onBlur={Formik.handleBlur}

											// disabled={loginResult.isLoading}
											// error={Formik.errors.email}
											// touched={Formik.touched.email}
										/>

										<div className="w-[80%]">
											<Button
												text="Add Branch"
												// disabled={loginResult.isLoading}
												// showModal={loginResult.isLoading}
												className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
												type="submit"
											/>
										</div>
									</form>
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
