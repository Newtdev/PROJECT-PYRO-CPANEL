import React, { useState } from "react";
import { useChangeStatusMutation } from "src/api/manageBranchAPISlice";
import {
	handleNotification,
	splitByUpperCase,
	SuccessNotification,
} from "src/helpers/helperFunction";
import useCustomLocation from "src/hooks/useCustomLocation";
import { Button } from "./Button";
import Image from "./Image";
import { FlagModal, Modal } from "./ModalComp";

interface ProfileType {
	data: any;
	showImage?: boolean | undefined;
	imageURL?: string;
	showBanner?: boolean | undefined;
	showHeader?: boolean;
	header?: string;
	fn?: () => void;
	flag?: boolean;
	status?: string;
	showButton?: boolean;
	onClick?: () => void;
}

export default function ProfileCard(props: ProfileType) {
	const { slicedPath } = useCustomLocation();

	const [showModal, setShowModal] = useState<boolean>(false);

	const [changeStatus, changeStatusResult] = useChangeStatusMutation();
	const handleModal = () => setShowModal(() => !showModal);

	const handleSuspendModal = async () => {
		try {
			const response = await changeStatus({
				id: slicedPath[2],
				status:
					props?.data.status === "available" ? "unavailable" : "available",
			}).unwrap();
			if (response) {
				SuccessNotification(response?.data?.message);
				setShowModal(() => false);
			}
		} catch (error: any) {
			setShowModal(() => false);
			handleNotification(error);
		}
	};

	return (
		<div className="w-full h-fit bg-white shadow-lg rounded-lg text-[14px] py-6">
			{props.showHeader ? (
				<div className="my-3">
					<h1 className="text-bold text-lg text-black text-center">
						{props.header}
					</h1>
				</div>
			) : null}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
				{!!props.showBanner ? (
					<div>
						<div className=" text-start ">
							<h2 className="text-black">Profile Picture</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
							<div className="h-20 w-20 mt-6">
								<Image
									image={props.imageURL || ""}
									width={"100%"}
									height={"100%"}
									styles="object-cover rounded-full"
								/>
							</div>
						</div>
					</div>
				) : null}
				{Object.keys(props?.data)?.map((dt) => {
					return (
						<div key={props?.data?.id}>
							<h2 className="text-black capitalize">{splitByUpperCase(dt)}</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg capitalize"></span>
							<h2 className="text-[#002E66] capitalize">{props?.data[dt]}</h2>
						</div>
					);
				})}
			</div>
			{props.showButton ? (
				<div className="flex mt-6 items-center">
					<div className="h-11 ml-14">
						<Button
							text="Update branch details"
							className="h-full font-bold text-white rounded-[38px] px-6 hover: bg-[#002E66] flex items-center justify-center"
							type="button"
							showIcon={false}
							onClick={props.onClick}
						/>
					</div>
					{!!props.flag ? (
						<div className=" px-10">
							<div className="w-[189px] h-11">
								<Button
									text={
										props?.data?.status === "pending"
											? "Activate"
											: props?.data?.status === "available"
											? "Suspend"
											: "Unsuspend"
									}
									className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-center"
									type="button"
									onClick={handleModal}
								/>
							</div>
						</div>
					) : null}
				</div>
			) : null}
			{!!props.showImage ? (
				<div>
					<div className="py-4 text-start px-4 lg:px-16">
						<h2 className="text-black">Profile Picture</h2>
						<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
						<div className="w-36 h-36 rounded-full mt-6">
							{props?.imageURL ? (
								<Image
									image={props.imageURL || ""}
									width={"100%"}
									height={"100%"}
									styles="object-cover h-full rounded-full"
								/>
							) : (
								<div className="w-[90px] h-[90px] rounded-full self-center object-fit bg-[#D9D9D9] flex justify-center items-center">
									<h1 className="text-xl text-center font-extrabold">
										{props?.data?.firstName?.charAt(0) || ""}
										{props?.data?.lastName?.charAt(0) || ""}
									</h1>
								</div>
							)}
						</div>
					</div>
				</div>
			) : null}

			{showModal && (
				<Modal>
					<FlagModal
						info={`Are you sure you want to ${
							props?.data?.status === "available"
								? `Suspend ${props?.data?.name}`
								: props?.data?.status === "deactivated"
								? `activate ${props?.data?.name}`
								: `Unsuspend ${props?.data?.name}`
						}?`}
						onClose={handleModal}
						onConfirmation={handleSuspendModal}
						showModal={changeStatusResult?.isLoading}
					/>
				</Modal>
			)}
		</div>
	);
}
