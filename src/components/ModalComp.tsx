import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "./Button";

interface modalType {
	styles?: string | undefined;
	children: ReactNode;
}

export const Modal = ({
	styles = 'absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center"',
	children,
}: modalType) => {
	return createPortal(<div className={styles}>{children}</div>, document.body);
};

// FLAG MODAL
export const FlagModal = ({
	info,
	onClose,
	onConfirmation,
}: {
	onClose: React.MouseEventHandler<HTMLButtonElement>;
	onConfirmation: React.MouseEventHandler<HTMLButtonElement>;
	info: string;
}) => {
	return (
		<div className="w-[322px] h-[125px] bg-white rounded-[12px]  shadow-2xl flex justify-center items-center flex-col">
			<div className="text-[#1E1E1E] text-[14px]">{info}</div>
			<div className="mt-4 text-[14px]">
				<Button
					text="No"
					className="px-6 bg-[#FF1400] w-[119px] text-white h-[41px] rounded-full"
					showIcon={false}
					type="button"
					onClick={onClose}
				/>
				<Button
					text="Yes"
					className="px-6 bg-[#00C000] text-white w-[119px] h-[41px] rounded-full ml-6"
					showIcon={false}
					type="button"
					onClick={onConfirmation}
				/>
			</div>
		</div>
	);
};

// ADD NEW BRANCH MODAL

// export const AddBranch = (props: any) => {
// 	const styles = `h-[38px] py-2 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] ${
// 		props.Formik.errors && props.Formik.touched
// 			? "border-red-500"
// 			: "border-gray-300"
// 	} bg-[#D9D9D9]`;
// 	const labelStyles =
// 		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";
// 	return (
// 		<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
// 			<div className="w-[50%] max-w-[511px] h-[599px] flex flex-col justify-center rounded-[20px] pb-10 bg-white">
// 				<div className="w-full h-24 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
// 					<h1>Add branch</h1>
// 					<HighlightOffOutlinedIcon
// 						fontSize="large"
// 						className="text-black cursor-pointer"
// 						onClick={() => props.setShowAddModal(false)}
// 					/>
// 				</div>
// 				<div className="w-full">
// 					<Lines />
// 				</div>

// 				{/* <Divider /> */}

// 				<form
// 					// onSubmit={props.Formik.handleSubmit}
// 					className="w-full flex flex-col justify-around items-center">
// 					<FormInput
// 						id="branchName"
// 						name="Branch Name"
// 						type="text"
// 						styles={styles}
// 						labelStyles={labelStyles}
// 						onChange={props.Formik.handleChange}
// 						value={props.Formik.values.email}
// 						onBlur={props.Formik.handleBlur}

// 						// disabled={loginResult.isLoading}
// 						// error={props.Formik.errors.email}
// 						// touched={props.Formik.touched.email}
// 					/>

// 					<FormInput
// 						id="adminEmail"
// 						name="Admin email"
// 						type="email"
// 						styles={styles}
// 						labelStyles={labelStyles}
// 						onChange={props.Formik.handleChange}
// 						value={props.Formik.values.email}
// 						onBlur={props.Formik.handleBlur}

// 						// disabled={loginResult.isLoading}
// 						// error={props.Formik.errors.email}
// 						// touched={props.Formik.touched.email}
// 					/>

// 					<FormInput
// 						id="branchAddress"
// 						name="Branch address/coordinate"
// 						type="text"
// 						styles={styles}
// 						labelStyles={labelStyles}
// 						onChange={props.Formik.handleChange}
// 						value={props.Formik.values.email}
// 						onBlur={props.Formik.handleBlur}

// 						// disabled={loginResult.isLoading}
// 						// error={props.Formik.errors.email}
// 						// touched={props.Formik.touched.email}
// 					/>
// 					<FormInput
// 						id="lga"
// 						name="Local Government Area"
// 						type="text"
// 						styles={styles}
// 						labelStyles={labelStyles}
// 						onChange={props.Formik.handleChange}
// 						value={props.Formik.values.email}
// 						onBlur={props.Formik.handleBlur}

// 						// disabled={loginResult.isLoading}
// 						// error={props.Formik.errors.email}
// 						// touched={props.Formik.touched.email}
// 					/>

// 					<FormInput
// 						id="state"
// 						name="State"
// 						type="text"
// 						styles={styles}
// 						labelStyles={labelStyles}
// 						onChange={props.Formik.handleChange}
// 						value={props.Formik.values.email}
// 						onBlur={props.Formik.handleBlur}

// 						// disabled={loginResult.isLoading}
// 						// error={props.Formik.errors.email}
// 						// touched={props.Formik.touched.email}
// 					/>

// 					<div className="w-[80%]">
// 						<Button
// 							text="Add Branch"
// 							// disabled={loginResult.isLoading}
// 							// showModal={loginResult.isLoading}
// 							className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
// 							type="submit"
// 						/>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
