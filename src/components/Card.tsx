import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { cardBtnType, cardType } from "src/helpers/alias";
import Image from "./Image";

export const DashboardCards = (props: cardType): ReactElement => (
	<div className="h-[134px] rounded-lg bg-white py-4 px-6 flex flex-col justify-between  shadow-lg">
		<div className="flex items-center ">
			<Image image={props.icon} width={32} height={32} styles="mr-4" />
			<p className="text-[14px] font-[600] leading-[21px] text-black">
				{props.name}
			</p>
		</div>
		<div>
			<h1 className="text-start text-[#737587] text-[32px] font-[600]">
				{props.amount}
			</h1>
		</div>
	</div>
);

export const CardButton = (props: cardBtnType) => {
	const navigate = useNavigate();
	return (
		<div
			className="rounded-lg bg-white py-4 px-6 flex flex-col justify-between  shadow-lg cursor-pointer"
			onClick={() => navigate(props.link)}
			style={{ height: props.height }}>
			<div className="flex items-center justify-center h-full ">
				<Image image={props.icon} width={30} height={30} styles="mr-4" />
				<p className="text-[16px] font-[400] leading-[21px] text-[#002E66]">
					{props.name}
				</p>
			</div>
		</div>
	);
};
