import { Flag } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import { Lines, Star, Trash } from "src/components/Icons";
import { FlagModal, Modal } from "src/components/ModalComp";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { FormInput } from "src/components/inputs";
import * as Yup from "yup";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useIsSelected from "src/hooks/useIsSelected";
import { useNavigate } from "react-router-dom";
import useCustomLocation from "src/hooks/useCustomLocation";

interface dataType {
	id: number | string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

const data: dataType[] = [
	{
		id: 1,
		firstName: "Casar",
		phoneNumber: "239-454-2989",

		lastName: "Spearman",
	},
	{
		id: 2,
		firstName: "Holt",
		phoneNumber: "129-667-9496",

		lastName: "Molloy",
	},
	{
		id: 3,
		firstName: "Andras",
		phoneNumber: "346-305-2210",

		lastName: "Jacobbe",
	},
	{
		id: 4,
		firstName: "Tully",
		phoneNumber: "233-101-4059",

		lastName: "Earengey",
	},
	{
		id: 5,
		firstName: "Briggs",
		phoneNumber: "855-166-1582",

		lastName: "Le feaver",
	},
	{
		id: 6,
		firstName: "Abdel",
		phoneNumber: "680-728-4672",

		lastName: "Sprigging",
	},
	{
		id: 7,
		firstName: "Delaney",
		phoneNumber: "333-280-5466",

		lastName: "Greeson",
	},
	{
		id: 8,
		firstName: "Simon",
		phoneNumber: "123-398-3798",

		lastName: "Oxer",
	},
	{
		id: 9,
		firstName: "Levi",
		phoneNumber: "820-109-5899",

		lastName: "Molder",
	},
	{
		id: 10,
		firstName: "Geoffry",
		phoneNumber: "744-625-0000",

		lastName: "Voff",
	},
];
const AddAttendantValidation = Yup.object({
	firstName: Yup.string().label("First name").required(),
	lastName: Yup.string().label("Last name").required(),
	phoneNumber: Yup.string().label("Phone number").required(),
	password: Yup.string().label("Password").required(),
});

type addAttendantTypes = Yup.InferType<typeof AddAttendantValidation>;

export default function AttendantProfile() {
	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(data);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showFlagModal, setShowFlagModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const { isSelected } = useIsSelected(selected);
	const navigate = useNavigate();

	const { slicedPath } = useCustomLocation();

	// INDIVIDUAL PROFILE
	const styles =
		"h-[38px] py-2 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	return (
		<section className="w-full h-screen">
			<article className="w-full h-full pt-6">
				<div>
					<div className="flex justify-between items-center w-full sm:w-[90%] md:w-[70%] lg:w-[45%] px-2">
						<button className="font-bold border-b border-[#FF9100] p-1 underline-offset-8">
							Actions
						</button>
						{/* row count: Data while the numSelected is the selected.length */}
						<Checkbox
							color="primary"
							indeterminate={
								selected.length > 0 && selected.length < data.length
							}
							checked={data.length > 0 && selected.length === data.length}
							onChange={handleSelectAllClick}
							inputProps={{
								"aria-label": "select all desserts",
							}}
						/>
						<div className="p-2 rounded-lg bg-white cursor-pointer relative">
							<Flag
								color="error"
								onClick={() => {
									if (selected.length > 0) {
										setShowFlagModal(true);
										return;
									}
									return;
								}}
							/>
						</div>

						<div
							className="p-2 rounded-lg bg-white cursor-pointer"
							onClick={() => {
								if (selected.length > 0) {
									setShowDeleteModal(true);
									return;
								}
								return;
							}}>
							<Trash />
						</div>
						<div className="w-[189px] h-11">
							<Button
								text="Add Branch"
								className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-start pl-4"
								type="button"
								showIcon={true}
								onClick={() => {
									setShowAddModal(true);
								}}
							/>
						</div>
					</div>
				</div>
				<div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-4 mt-6">
					{data?.map((v) => (
						<div key={v?.id}>
							<div
								className="h-[157px] max-w-[429px] bg-white rounded-lg flex flex-row transition-all hover:border-2 hover:border-[#002E66]"
								onClick={() =>
									navigate(`/branch/${slicedPath[2]}/attendant/${v.id}`, {
										state: `${v?.firstName} ${v?.lastName}`,
									})
								}>
								<div className="basis-[40%] flex items-start justify-start">
									<Checkbox
										color="primary"
										onClick={(event) => {
											event.stopPropagation();
											handleClick(event, v.firstName);
										}}
										checked={isSelected(v.firstName)}
									/>
									<div className="w-[90px] h-[90px] rounded-full self-center object-fit bg-[#D9D9D9] flex justify-center items-center">
										<h1 className="text-xl text-center font-extrabold">
											{v.firstName.charAt(0)}
											{v.lastName.charAt(0)}
										</h1>
									</div>
								</div>
								<div className="basis-[60%] flex flex-col py-10 pl-4 justify-between items-start text-start">
									<h2 className="text-[#002E66] text-[16px] font-bold">
										{v?.firstName} {v?.lastName}
									</h2>
									<p className="text-[#1E1E1E] text-[14px]">{v?.phoneNumber}</p>
									<p className="text-[#4E8280] text-[12px]">1093 Orders</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{showFlagModal && (
					<Modal>
						<FlagModal
							info="Are you sure you want to flag?"
							onClose={() => setShowFlagModal(false)}
							onConfirmation={() => console.log(selected)}
						/>
					</Modal>
				)}
				{showDeleteModal && (
					<Modal>
						<FlagModal
							info="Are you sure you want to delete?"
							onClose={() => setShowDeleteModal(false)}
							onConfirmation={() => console.log(selected)}
						/>
					</Modal>
				)}
			</article>
		</section>
	);
}

// milk brother alpha tooth zebra cry they puzzle drip despair master under
