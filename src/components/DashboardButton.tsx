import { ReactElement } from "react";
import { cardType } from "src/helpers/alias";

export const DashboardCardsButton = (props: cardType): ReactElement => (
	<div className="h-fit rounded-lg bg-white py-4 px-6 flex flex-col justify-between gap-y-6  shadow-lg">
		<div className="flex items-center ">
			<img src={props.icon} width={32} height={32} className="mr-4" alt="" />
			<p className="text-[14px] font-[600] leading-[21px] text-black">
				{props.name}
			</p>
		</div>
		<div>
			<h1 className="text-start text-[#737587] text-xl font-[600]">
				{props.amount}
			</h1>
		</div>
		<div className="h-12 w-[80%]">{props?.children}</div>
	</div>
);
