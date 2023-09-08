import React, { Fragment, useState } from "react";
import { cardBtnType, FormType, UpdateFormType } from "src/helpers/alias";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import MainProduct from "src/assets/img/MainProduct.svg";
import OtherProduct from "src/assets/img/OtherProduct.svg";
import Rating from "src/assets/img/Ratings.svg";
import { CardButton } from "src/components/Card";
import { useMemo } from "react";
import ProfileCard from "src/components/ProfileCard";
import { LoaderContainer } from "src/components/LoaderContainer";
import useCustomLocation from "src/hooks/useCustomLocation";
import {
	CurrencyFormatter,
	handleNotification,
	splitByUpperCase,
	SuccessNotification,
} from "src/helpers/helperFunction";
import AttendantProfile from "src/screens/dashboard/pages/Manage-branch/AttendantProfile";
import BranchReview from "src/screens/dashboard/pages/Manage-branch/BranchReview";
import {
	useFetchSingleHQBranchQuery,
	useUpdateHqBranchDetailsMutation,
} from "src/hq-admin/hq-api/manageHqApiSlice";
import { FormModal } from "src/components/ModalComp";
// import { AddNewBranch } from "./Components";
import Transaction from "../Transaction";
import { ProductCard } from "src/components/ProductCard";
import { Button } from "src/components/Button";
import { FormInput } from "src/components/inputs";
import { useFormik } from "formik";

const BranchData: cardBtnType[] = [
	{
		id: 1,
		icon: User,
		name: "Branch Profile",
	},

	{
		id: 3,
		icon: Attendant,
		name: "Attendant Profile",
	},
	{
		id: 4,
		icon: Rating,
		name: "Ratings and Reviews",
	},
	// {
	// 	id: 5,
	// 	icon: Rating,
	// 	name: "Wallet Info",
	// },
	{
		id: 5,
		icon: Rating,
		name: "Transactions",
	},
	{
		id: 6,
		icon: MainProduct,
		name: "Branch Main Products",
	},
	// {
	// 	id: 7,
	// 	icon: OtherProduct,
	// 	name: "Other Products",
	// },
];

export default function SingleBranch() {
	const [tabName, setTabName] = useState<string>("branch profile");
	const [showModal, setShowModal] = useState(false);
	const { slicedPath } = useCustomLocation();
	const branchResult = useFetchSingleHQBranchQuery(slicedPath[2]);

	const station = branchResult?.currentData?.station;

	const [updateBranchDetails, updateBranchDetailsResult] =
		useUpdateHqBranchDetailsMutation();

	async function updateBranch(values: FormType) {
		try {
			const response = await updateBranchDetails({
				id: slicedPath[2],
				...values,
			}).unwrap();
			if (response) {
				SuccessNotification(response?.data?.message);
				setShowModal(() => false);
			}
		} catch (error: any) {
			setShowModal(() => false);
			handleNotification(error);
		}
	}

	const handledAPIResponse = useMemo(() => {
		return {
			profileData: {
				name: station?.name,
				phoneNumber: station?.phoneNumber,
				lga: station?.location?.lga,
				address: station?.location?.address,
				latitude: station?.location?.latitude,
				longitude: station?.location?.longitude,
				state: station?.location?.state,
			},
			pumpAttendants: station?.pumpAttendants,
			rating: station?.ratings,
			account: station?.wallets?.availableBalance,
			config: station?.config,
			walletInfo: {
				walletName: station?.wallets?.walletName,
				walletNumber: station?.wallets?.walletNumber,
				bankName: station?.wallets?.bankName,
			},
		};
	}, [station]);

	const tabDetails = tabName.toLowerCase();
	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-screen px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					<>
						{BranchData.map((dt) => (
							<Fragment>
								<CardButton
									name={dt.name}
									icon={dt.icon}
									height={"98px"}
									activeBtn={tabName}
									onClick={() => setTabName(dt.name)}
									// showCard={showCard}
								/>
							</Fragment>
						))}
					</>
				</div>

				<LoaderContainer data={branchResult}>
					{tabDetails === "branch profile" ? (
						<ProfileCard
							data={handledAPIResponse.profileData || {}}
							onClick={() => setShowModal(true)}
							showImage={false}
							showButton={true}
						/>
					) : null}

					{tabDetails === "attendant profile" ? (
						<AttendantProfile
							attendantData={handledAPIResponse?.pumpAttendants}
						/>
					) : null}
					{tabDetails === "ratings and reviews" ? (
						<BranchReview ratings={handledAPIResponse.rating} />
					) : null}
					{tabDetails === "wallet info" ? (
						<BranchAccountBalance
							account={handledAPIResponse.account}
							info={handledAPIResponse}
						/>
					) : null}
					{tabDetails === "transactions" ? (
						<Transaction id={slicedPath[2]} />
					) : null}
					{tabDetails === "branch main products" ? (
						<ProductCard data={handledAPIResponse.config} show />
					) : null}
				</LoaderContainer>
				{showModal ? (
					<FormModal
						name="Update branch details"
						onClick={() => setShowModal((prevState) => !prevState)}>
						<AddNewBranch
							makeApiRequest={(values: any) => updateBranch(values)}
							apiResult={updateBranchDetailsResult}
							initalValue={station}
						/>
					</FormModal>
				) : null}
			</article>
		</section>
	);
}

const BranchAccountBalance = (props: {
	account: string;
	info: { [index: string]: string | any };
}) => {
	return (
		<div className="p-4 basis-[60%] rounded-[10px] bg-white grid grid-cols-1 gap-x-10 justify-items-center content-center mt-6 pl-6">
			<div className="text-start text-[#002E66]">
				<h3 className="text-[14px]my-">Available Balance</h3>
				<h2 className="text-[24px] font-bold">
					{CurrencyFormatter(Number(props?.account))}
				</h2>
			</div>
			<div className="w-full mt-4 grid grid-cols-3 my-6">
				{Object.keys(props?.info.walletInfo)?.map((dt, i) => {
					return (
						<div key={i}>
							<h2 className="text-black capitalize">{splitByUpperCase(dt)}</h2>
							<h2 className="text-[#002E66] capitalize">
								{props?.info?.walletInfo[dt]}
							</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const AddNewBranch = (props: any) => {
	const [step, setStep] = useState<number>(0);
	const initValue = props.initalValue;
	const Formik = useFormik<UpdateFormType>({
		initialValues: {
			name: initValue.name,
			// phoneNumber: initValue.phoneNumber,
			// location: {
			// 	lga: initValue.location.latitude,
			// 	latitude: initValue.location.latitude,
			// 	longitude: initValue.location.longitude,
			// 	address: initValue.location.address,
			// 	state: initValue.location.state,
			// },
		},
		validateOnBlur: true,
		validateOnChange: true,
		// validationSchema: AddbranchValidation[step],

		onSubmit: (values) => {
			props.makeApiRequest(values);
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
			// disabled: addNewBranchResult?.isLoading,
			error: Formik.errors.name,
			touched: Formik.touched.name,
		},
		// {
		// 	id: "phoneNumber",
		// 	name: "Branch contact info",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.phoneNumber && Formik.touched.phoneNumber
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.phoneNumber,
		// 	onBlur: Formik.handleBlur,
		// 	// disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors.phoneNumber,
		// 	touched: Formik.touched.phoneNumber,
		// },
		// {
		// 	id: "location.address",
		// 	name: "Branch Address",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.location?.address && Formik.touched.location?.address
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.location.address,
		// 	onBlur: Formik.handleBlur,
		// 	// disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors.location?.address,
		// 	touched: Formik.touched.location?.address,
		// },
		// {
		// 	id: "location.lga",
		// 	name: "Branch LGA",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.location?.lga && Formik.touched.location?.lga
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.location.lga,
		// 	onBlur: Formik.handleBlur,

		// 	// disabled: addNewBranchResult.isLoading,
		// 	error: Formik.errors.location?.lga,
		// 	touched: Formik.touched.location?.lga,
		// },
		// {
		// 	id: "location.latitude",
		// 	name: "Branch Latitude",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.location?.lga && Formik.touched.location?.latitude
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.location.latitude,
		// 	onBlur: Formik.handleBlur,

		// 	// disabled: addNewBranchResult.isLoading,
		// 	error: Formik.errors.location?.latitude,
		// 	touched: Formik.touched.location?.latitude,
		// },
		// {
		// 	id: "location.longitude",
		// 	name: "Branch longitude",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.location?.lga && Formik.touched.location?.longitude
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.location.longitude,
		// 	onBlur: Formik.handleBlur,

		// 	// disabled: addNewBranchResult.isLoading,
		// 	error: Formik.errors.location?.longitude,
		// 	touched: Formik.touched.location?.longitude,
		// },

		// {
		// 	id: "location.state",
		// 	name: "Branch state",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.location?.state && Formik.touched.location?.state
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.location?.state,
		// 	onBlur: Formik.handleBlur,
		// 	// disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors.location?.state,
		// 	touched: Formik.touched.location?.state,
		// },
		// {
		// 	id: "branchManager.firstName",
		// 	name: "Branch manager first name",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.branchManager?.firstName &&
		// 		Formik.touched.branchManager?.firstName
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.branchManager.firstName,
		// 	onBlur: Formik.handleBlur,

		// 	disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors.branchManager?.firstName,
		// 	touched: Formik.touched.branchManager?.firstName,
		// },
		// {
		// 	id: "branchManager.lastName",
		// 	name: "Branch manager last name",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors?.branchManager?.lastName &&
		// 		Formik.touched?.branchManager?.lastName
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values?.branchManager?.lastName,
		// 	onBlur: Formik.handleBlur,
		// 	disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors?.branchManager?.lastName,
		// 	touched: Formik.touched?.branchManager?.lastName,
		// },
		// {
		// 	id: "branchManager.email",
		// 	name: "Branch manager email",
		// 	type: "email",
		// 	styles: `${styles} ${
		// 		Formik.errors?.branchManager?.email &&
		// 		Formik.touched.branchManager?.email
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values?.branchManager?.email,
		// 	onBlur: Formik.handleBlur,
		// 	disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors.branchManager?.email,
		// 	touched: Formik.touched.branchManager?.email,
		// },
		// {
		// 	id: "branchManager.password",
		// 	name: "Branch manager's password",
		// 	type: "text",
		// 	styles: `${styles} ${
		// 		Formik.errors.branchManager?.password &&
		// 		Formik.touched.branchManager?.password
		// 			? "border-red-500"
		// 			: "border-gray-300"
		// 	}`,
		// 	labelStyles: labelStyles,
		// 	onChange: Formik.handleChange,
		// 	value: Formik.values.branchManager?.password,
		// 	onBlur: Formik.handleBlur,
		// 	disabled: addNewBranchResult?.isLoading,
		// 	error: Formik.errors.branchManager?.password,
		// 	touched: Formik.touched.branchManager?.password,
		// },
	];

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full">
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
						// disabled={dt.disabled}
						error={dt.error}
						touched={dt.touched}
					/>
				))}
			</div>

			<div className="w-full">
				<Button
					text="Update Branch Details"
					// disabled={addNewBranchResult?.isLoading}
					showModal={props.apiResult?.isLoading}
					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/>
			</div>
		</form>
	);
};
// 	makeApiRequest: (args: FormType) => void;
// 	apiResult: { isLoading: boolean };
// 	initalValue?: { [index: string]: string } | any;
// }) => {
// 	const [step, setStep] = useState<number>(0);

// 	const Formik = useFormik<FormType>({
// 		initialValues: { ...props.initalValue },
// 		validateOnBlur: true,
// 		validateOnChange: true,
// 		validationSchema: AddbranchValidation[step],

// 		onSubmit: (values) => {
// 			if (step === 1) {
// 				props.makeApiRequest(values);
// 				// addNewBranchFunct(values);
// 			} else {
// 				setStep((prev) => prev + 1);
// 			}
// 		},
// 	});

// 	const getLong = (value: number) => {
// 		Formik.setFieldValue("location.longitude", String(value));
// 	};
// 	const getLat = (value: number) => {
// 		Formik.setFieldValue("location.latitude", String(value));
// 	};

// 	const getAddress = (value: string) => {
// 		Formik.setFieldValue("location.address", value);
// 	};

// 	// useEffect(() => {
// 	// 	if (!props.initalValue) return;

// 	// 	// Formik.setValues({ ...props.initalValue });
// 	// }, []);

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
// 			disabled: props.apiResult?.isLoading,
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
// 			disabled: props.apiResult?.isLoading,
// 			error: Formik.errors.phoneNumber,
// 			touched: Formik.touched.phoneNumber,
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

// 			disabled: props.apiResult.isLoading,
// 			error: Formik.errors.location?.lga,
// 			touched: Formik.touched.location?.lga,
// 		},

// 		{
// 			id: "branchManager.name",
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

// 			disabled: props.apiResult?.isLoading,
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
// 			disabled: props.apiResult?.isLoading,
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
// 			disabled: props.apiResult?.isLoading,
// 			error: Formik.errors.branchManager?.email,
// 			touched: Formik.touched.branchManager?.email,
// 		},
// 		{
// 			id: "branchManager.phoneNumber",
// 			name: "Branch manager contact info",
// 			type: "text",
// 			styles: `${styles} ${
// 				Formik.errors.branchManager?.phoneNumber &&
// 				Formik.touched.branchManager?.phoneNumber
// 					? "border-red-500"
// 					: "border-gray-300"
// 			}`,
// 			labelStyles: labelStyles,
// 			onChange: Formik.handleChange,
// 			value: Formik.values.branchManager?.phoneNumber,
// 			onBlur: Formik.handleBlur,
// 			disabled: props.apiResult?.isLoading,
// 			error: Formik.errors.branchManager?.phoneNumber,
// 			touched: Formik.touched.branchManager?.phoneNumber,
// 		},
// 	];

// 	return (
// 		<form
// 			onSubmit={Formik.handleSubmit}
// 			className="w-full flex flex-col justify-center items-center px-4 h-full">
// 			{step === 0 ? (
// 				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
// 					{FormData.slice(0, 3).map((dt, i) => (
// 						<Fragment key={dt.id}>
// 							<FormInput
// 								id={dt.id}
// 								name={dt.name}
// 								type={dt.type}
// 								styles={dt.styles}
// 								labelStyles={dt.labelStyles}
// 								onChange={dt.onChange}
// 								value={dt.value}
// 								onBlur={dt.onBlur}
// 								disabled={dt.disabled}
// 								error={dt.error}
// 								touched={dt.touched}
// 							/>
// 							{i === 2 ? (
// 								<GoogleLocationInput
// 									getLat={getLat}
// 									getLong={getLong}
// 									getAddress={getAddress}
// 								/>
// 							) : null}
// 							{i === 2 ? (
// 								<SelectInput
// 									id="location.state"
// 									data={states}
// 									labelStyles={labelStyles}
// 									name="Select state"
// 									onChange={(e) =>
// 										Formik.setFieldValue("location.state", e.target.value)
// 									}
// 									value={Formik.values.location.state}
// 								/>
// 							) : null}
// 						</Fragment>
// 					))}
// 				</div>
// 			) : null}
// 			{step === 1 ? (
// 				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
// 					{FormData.slice(-4).map((dt, i) => (
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

// 					<PasswordInput
// 						width="w-full"
// 						id="password"
// 						name={"Password"}
// 						type={"text"}
// 						styles={` ${
// 							Formik.errors.branchManager?.password &&
// 							Formik.touched.branchManager?.password
// 								? "border-red-500"
// 								: "border-gray-300"
// 						}`}
// 						labelStyles={labelStyles}
// 						onChange={(e) => {
// 							Formik.setFieldValue("branchManager.password", e.target.value);
// 						}}
// 						value={Formik.values.branchManager?.password}
// 						onBlur={Formik.handleBlur}
// 						disabled={props.apiResult.isLoading}
// 						// error={Formik.errors.password}
// 						// touched={Formik.touched.password}
// 					/>
// 					<Button
// 						text="Generate password"
// 						disabled={props.apiResult.isLoading}
// 						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
// 						type="button"
// 						onClick={() => {
// 							Formik.setFieldValue(
// 								"branchManager.password",
// 								generatePassword()
// 							);
// 						}}
// 					/>
// 				</div>
// 			) : null}

// 			<div className="w-full">
// 				{step > 0 ? (
// 					<Button
// 						text="Back"
// 						disabled={props.apiResult.isLoading || false}
// 						showModal={props.apiResult.isLoading}
// 						className="h-[41px] mt-6 font-bold bg-white border border-[#002E66] rounded-[38px] w-full hover: text-[#002E66]"
// 						type="button"
// 						onClick={() => setStep((prev) => prev - 1)}
// 					/>
// 				) : null}

// 				<Button
// 					text={step < 1 ? "Next" : "Add New Branch"}
// 					disabled={props.apiResult?.isLoading}
// 					showModal={props.apiResult?.isLoading}
// 					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
// 					type="submit"
// 				/>
// 			</div>
// 		</form>
// 	);
// };
