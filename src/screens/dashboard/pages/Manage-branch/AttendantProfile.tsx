import { Flag } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { Trash } from "src/components/Icons";
import { FlagModal, Modal } from "src/components/ModalComp";

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

export default function AttendantProfile(props: {
	attendantData: { [index: string]: string | any }[];
}) {
	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(props.attendantData);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const [showFlagModal, setShowFlagModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const { isSelected } = useIsSelected(selected);
	const navigate = useNavigate();

	const { slicedPath } = useCustomLocation();

	return (
		<section className="w-full h-screen">
			<article className="w-full h-full pt-6">
				<div>
					<div className="flex justify-between items-center w-full sm:w-[90%] md:w-[40%] lg:w-[25%] px-2">
						<button className="font-bold border-b border-[#FF9100] p-1 underline-offset-8">
							Actions
						</button>
						{/* row count: Data while the numSelected is the selected.length */}
						<Checkbox
							color="primary"
							indeterminate={
								selected.length > 0 &&
								selected.length < props.attendantData.length
							}
							checked={
								props.attendantData?.length > 0 &&
								selected.length === props.attendantData?.length
							}
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
					</div>
				</div>
				<>
					{props.attendantData.length === 0 ? (
						<div className="mt-24">
							<h1>No Attendant(s) Available</h1>
						</div>
					) : (
						<div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-4 mt-6">
							{props?.attendantData?.map((v) => (
								<div key={v?.id}>
									<div className="h-[157px] max-w-[429px] bg-white rounded-lg flex flex-row transition-all hover:border-2 hover:border-[#002E66]">
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
											<p className="text-[#1E1E1E] text-[14px]">
												{v?.phoneNumber}
											</p>
											<p className="text-[#4E8280] text-[12px]">1093 Orders</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</>

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
