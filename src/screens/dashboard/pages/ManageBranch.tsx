import { Flag } from "@mui/icons-material";
import { useState } from "react";
import { ReactElement } from "react";
import { FormInput, SearchInput } from "src/components/inputs";
import EnhancedTable from "src/components/Table";
import * as React from "react";
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
import { APP_ROUTE } from "src/helpers/Routes";

export interface HeadCellTypes {
	id: keyof Data;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
}

const rows: Data[] | null = [
	{
		id: 1,
		name: "Aliko Petroleaum",
		hq: "Aliko ",
		state: "Imo state",
	},
	{
		id: 2,
		name: "A Y M Shafa",
		hq: "Aliko ",
		state: "Delta state",
	},
	{
		id: 3,
		name: "Nigerian National Petroleum Commission",
		hq: "Aliko ",
		state: "Niger state",
	},
	{
		id: 4,
		name: "NNPC",
		hq: "Aliko ",
		state: "Ogun state",
	},
	{
		id: 5,
		name: "Nai",
		hq: "Aliko ",
		state: "Oyo state",
	},
	{
		id: 6,
		name: "Nae",
		hq: "Aliko ",
		state: "Ondo state",
	},
	{
		id: 7,
		name: "Naes",
		hq: "Aliko ",
		state: "Ondo state",
	},
	{
		id: 8,
		name: "Naess",
		hq: "Aliko ",
		state: "Ogun state",
	},
	{
		id: 9,
		name: "Naesss",
		hq: "Aliko ",
		state: "kaduna",
	},

	// { name: "Cupcake", calories: 'Aliko ', fat: 3.7, carbs: 67, protein: 4.3 },
];

const headCells: readonly HeadCellTypes[] = [
	{
		id: "name",
		minWidth: 170,
		label: "Name",
	},
	{
		id: "hq",
		minWidth: 170,
		label: "HQ",
	},
	{
		id: "state",
		minWidth: 170,
		label: "State",
	},
];

const ManageBranch = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [value, setValue] = React.useState<string>("one");
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const navigate = useNavigate();
	// console.log(filteredValue);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// TABLE FILTER TAB
	const tabData: { id: string | number; value: string; label: string }[] = [
		{ id: 1, value: "one", label: "All" },
		{ id: 1, value: "two", label: "Most popular" },
	];

	// CLICKING ON THE ROW OF A TABLE
	const handleRowClick = (
		event: React.MouseEvent<HTMLElement>,
		name: any
	): void => {
		if (event.currentTarget) {
			if (event.currentTarget.textContent === "") setShowModal(!showModal);
			else navigate(`/branch/${name}`, { state: name });

			// TODO: make API request to handle submission
			// for single and multiple
		}
	};

	// SELECT ALL THE ROWS ON THE FUNCTION
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows?.map((n: any) => n.name) as any;
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	// SELECT A SINGLE ROW ON TABLE
	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	// CONFIRMATION OF WHAT IS SELECTED
	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	let dataToChildren: any = {
		rows,
		headCells,
		handleRowClick,
		showFlag: true,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
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
				<div className="h-fit w-full">
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
