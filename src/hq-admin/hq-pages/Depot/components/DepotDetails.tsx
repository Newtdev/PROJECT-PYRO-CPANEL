import { format } from "date-fns";
import React from "react";

const DepotListComp = ({ name, value }: { name: string; value: string }) => (
	<div className="w-[30%] flex items-center justify-between  ml-14 py-3 my-2">
		<h3 className="text-darkgray ">{name}</h3>
		<h6 className="text-black font-semibold">{value}</h6>
	</div>
);

export default function DepotDetails({ depotDetails }: any) {
	return (
		<section className="w-full ">
			<article className="w-full">
				<DepotListComp name="Name" value={depotDetails?.name} />
				<DepotListComp name="Email" value={depotDetails?.email} />
				<DepotListComp name="Phone number" value={depotDetails?.phoneNumber} />
				<DepotListComp name="Address" value={depotDetails?.address} />
				<DepotListComp name="State" value={depotDetails?.state} />
				<DepotListComp
					name="Total staff"
					value={depotDetails?.totalDepotStaff}
				/>
				<DepotListComp
					name="Total product"
					value={depotDetails?.totalProducts}
				/>
				<DepotListComp
					name="Total request"
					value={depotDetails?.requests?.length}
				/>
			</article>
		</section>
	);
}
