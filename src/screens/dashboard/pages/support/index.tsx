import React, { useMemo } from "react";
import { useFetchAllTicketQuery } from "src/api/supportApiSlice";

export default function Support() {
	const supportResult = useFetchAllTicketQuery("");

	const handleApiResponse = useMemo(() => {
		const result = supportResult?.currentData?.tickets ?? {};

		return {
			createdAt: result.createdAt,
			description: result.description,
			status: result.status,
			user: result.user,
		};
	}, [supportResult]);

	// console.log(handleApiResponse);
	return (
		<section>
			<article className="flex flex-cols lg:flex-row gap-4  bg-white rounded-lg mt-10 h-screen">
				<div className="lg:basis-[65%] h-fit grid grid-cols-2 mt-10 gap-4 px-4">
					<div className="h-fit mt-6 border px-2 py-4 border-[#636685] rounded-xl">
						<div className="flex w-full justify-between items-center px-6 text-start text-[#1E1E1E] text-[12px]">
							<div>
								<h4>sdojfosdifsd</h4>
								<p className="text-[#636685]">dksdiosdif</p>
							</div>
							<div></div>
						</div>
						<div>
							<p className="text-justify text-[12px] px-6 leading-[20px] mt-3">
								sdoisdihjfisdifusd
							</p>
						</div>
					</div>
				</div>
			</article>
		</section>
	);
}
