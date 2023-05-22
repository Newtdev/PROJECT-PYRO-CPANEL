import { Delete } from "@mui/icons-material";
import React, { useState, useMemo } from "react";
import { ReactElement } from "react";
import { FormInput, SearchInput, TextArea } from "src/components/inputs";
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
import { TableLoader } from "src/components/LoaderContainer";
import {
	handleDateFormat,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { useDebounce } from "src/hooks/useDebounce";
import { useFetchAllSelfHelpQuery } from "src/api/selfHelpApislice";
import { Label } from "src/components/inputs";
import { Upload } from "src/components/Upload";

interface SelfHelpType {
	id: "title" | "description" | "likes" | "createdAt";
	label: string | ReactElement;
	minWidth: number;
}

const headCells: readonly SelfHelpType[] = [
	{
		id: "title",
		minWidth: 170,
		label: "Title",
	},
	{
		id: "description",
		minWidth: 170,
		label: "Description",
	},
	{
		id: "likes",
		minWidth: 170,
		label: "Likes",
	},
	{
		id: "createdAt",
		minWidth: 170,
		label: "Date",
	},
];

// YUP VALIDATION FOR ADD BRANCH TYPE

const SelfHelp = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const [value, setValue] = React.useState<string>("one");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [pagination, setPagination] = useState({ newPage: 1 });
	const navigate = useNavigate();
	const { debouncedValue } = useDebounce(filteredValue, 700);

	const hqQueryResult = useFetchAllSelfHelpQuery({
		query: debouncedValue,
		page: pagination.newPage,
	});

	// hqQueryResult?.currentData?.hqProfile?.totalData;
	const handledAPIResponse = useMemo(() => {
		const hqProfile = hqQueryResult?.currentData?.selfHelps || [];

		const neededData = hqProfile?.data?.reduce(
			(
				acc: { [index: string]: string }[],
				cur: { [index: string]: string }
			) => [
				...acc,
				{
					id: cur?.id,
					title: cur?.title,
					description: cur?.description,
					likes: `${cur?.likes.length} reactions`,
					createdAt: handleDateFormat(cur?.createdAt),
				},
			],
			[]
		);

		return { hqProfile, neededData };
	}, [hqQueryResult]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse?.neededData);

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
		rows: handledAPIResponse?.neededData || [],
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
								text="Add Self Help"
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
									<Delete fontSize="large" onClick={() => setShowModal(true)} />
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
								info="Are you sure you want to Delete?"
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
										<h1>Create Self Help</h1>
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

export default SelfHelp;

const AddbranchValidation = Yup.object({
	title: Yup.string().label("Title").required(),
	description: Yup.string().label("Description").required(),
	type: Yup.string().label("Media type").required(),

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
		} catch (error: any) {
			props.close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<addBranchSchema>({
		initialValues: {
			title: "",
			description: "",
			type: "",
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
			id: "title",
			name: "Manager's firstname",
			type: "text",
			styles: `${styles} ${
				Formik.errors.title && Formik.touched.title
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.title,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.title,
			touched: Formik.touched.title,
		},
		{
			id: "description",
			name: "Description",
			styles: `${styles} ${
				Formik.errors.description && Formik.touched.description
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.description,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.description,
			touched: Formik.touched.description,
		},
	];

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full">
			{step === 0 ? (
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					<FormInput
						id="title"
						name="Manager's firstname"
						type="text"
						styles={`${styles} ${
							Formik.errors.title && Formik.touched.title
								? "border-red-500"
								: "border-gray-300"
						}`}
						labelStyles={labelStyles}
						onChange={Formik.handleChange}
						value={Formik.values.title}
						onBlur={Formik.handleBlur}
						disabled={addNewResult?.isLoading}
						error={Formik.errors.title}
						touched={Formik.touched.title}
					/>
				</div>
			) : null}
			<TextArea {...FormData[1]} />
			<div className="w-full">
				<Label name="Media type" styles={labelStyles} />
				<select className="mt-1 py-4 rounded-[38px] w-full border border-gray-300 px-4 text-[14px] bg-[#D9D9D9]">
					<option>Select Type</option>
					{["Image", "Video"].map((_v, i) => (
						<option key={i} value={_v}>
							{_v}
						</option>
					))}
				</select>
			</div>
			<div className="flex items-center justify-between">
				{/* <FormInput
					id="title"
					name="Manager's firstname"
					type="text"
					styles={`${styles} ${
						Formik.errors.title && Formik.touched.title
							? "border-red-500"
							: "border-gray-300"
					}`}
					labelStyles={labelStyles}
					onChange={Formik.handleChange}
					value={Formik.values.title}
					onBlur={Formik.handleBlur}
					disabled={addNewResult?.isLoading}
					error={Formik.errors.title}
					touched={Formik.touched.title}
				/>
				<Button
					text="Add file"
					disabled={addNewResult?.isLoading}
					showModal={addNewResult?.isLoading}
					className="h-[41px] mt-12 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/> */}
				{/* <Upload /> */}
			</div>
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
