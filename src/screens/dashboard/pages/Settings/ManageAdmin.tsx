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
import { ErrorType } from "src/helpers/alias";
import { TableLoader } from "src/components/LoaderContainer";
import {
	handleDateFormat,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { useDebounce } from "src/hooks/useDebounce";
import {
	useAddAdminMutation,
	useGetAdminQuery,
	useGetAllAdminQuery,
} from "src/api/setttingsApislice";
import { nanoid } from "nanoid";

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
	confirmPassword: Yup.string().label("Password").required(),
	role: Yup.string<"super_admin" | "sub_admin">().defined(),

	// stationHQ.
});
export type AddAdminTypes = Yup.InferType<typeof AddbranchValidation>;

const AddNewHQ = (props: { close: () => void }) => {
	const [AddAdmin, addNewResult] = useAddAdminMutation();

	const generatedPassword = nanoid();

	async function addNewAdmin(values: AddAdminTypes) {
		try {
			const response = await AddAdmin(values).unwrap();
			if (response) {
				props.close();
			}
			SuccessNotification(response?.data?.message);
		} catch (error: ErrorType | any) {
			props.close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<AddAdminTypes>({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
			role: "super_admin",
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
	];

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full overflow-y-auto pt-48">
			<div className="grid grid-cols-1 w-full gap-x-2 content-center">
				{FormData.slice(0, 4).map((dt, i) => (
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
				<div>
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
						error={Formik.errors.password}
						touched={Formik.touched.password}
					/>
					<Button
						text="Generate password"
						disabled={addNewResult.isLoading}
						// showModal={loginResult.isLoading}
						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
						type="button"
						onClick={() => {
							Formik.setFieldValue("password", generatedPassword);
							Formik.setFieldValue("confirmPassword", generatedPassword);
						}}
					/>
					<PasswordInput
						width="w-full"
						id="confirmPassword"
						name={"Confirm password"}
						type={"text"}
						styles={` ${
							Formik.errors.password && Formik.touched.password
								? "border-red-500"
								: "border-gray-300"
						}`}
						labelStyles={labelStyles}
						onChange={Formik.handleChange}
						value={Formik.values.password}
						onBlur={Formik.handleBlur}
						disabled={addNewResult.isLoading}
						error={Formik.errors.password}
						touched={Formik.touched.password}
					/>
				</div>
				<SelectInput
					labelStyles={labelStyles}
					data={[
						"super_admin",
						"sub_admin",
						"HQ_admin",
						"transaction_admin",
						"support_admin",
					]}
					disabled={addNewResult.isLoading}
					value={Formik.values.role}
					onChange={Formik.handleChange}
					name="Select role"
					id="role"
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
	);
};
const ManageAdmin = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");

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

	const adminListQueryResult = useGetAllAdminQuery({
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

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	// TABLE FILTER TAB

	function fn(data: { [index: string]: string | number }) {
		return;
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
			totalPage: adminListQueryResult?.currentData?.data?.totalPages,
			limit: adminListQueryResult?.currentData?.data?.limit,
			page: adminListQueryResult?.currentData?.data?.page,
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
								text="Add admin"
								className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-start pl-4"
								type="button"
								showIcon={true}
								onClick={() => setShowAddModal(true)}
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
								<div className="flex justify-end items-center h-11 text-sm pr-12 cursor-pointer w-full">
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
								<div className="w-[50%] max-w-[511px] h-[90%] flex flex-col justify-center rounded-[20px] pb-10  bg-white">
									<div className="w-full h-16 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
										<h1>Add Admin</h1>
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
									<AddNewHQ close={closeAddHQModal} />
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
