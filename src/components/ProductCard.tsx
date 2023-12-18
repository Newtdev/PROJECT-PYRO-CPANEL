import { Fragment } from "react";
import {
	CurrencyFormatter,
	splitByUpperCase,
} from "src/helpers/helperFunction";
import CustomizedSwitches from "./SwitchComp";

export function ProductCard(props: any) {
	const { amenities, ...rest } = props?.data;
	return (
		<div className="w-full h-fit bg-white shadow-lg rounded-lg text-[14px] py-6">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
				{Object.keys(rest)?.map((dt, i) => (
					<Fragment key={i + 1}>
						<div>
							<h2 className="text-black capitalize">{splitByUpperCase(dt)}</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg capitalize"></span>
							<h2 className="text-[#002E66] capitalize">
								{CurrencyFormatter(rest[dt]?.price ?? 0)}
							</h2>

							<h2 className="text-[#002E66] capitalize">
								Available:
								{!rest[dt]?.isAvailable ? " NO" : " YES"}
							</h2>
							{props?.show ? <CustomizedSwitches off="off" on="on" /> : null}
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
}


