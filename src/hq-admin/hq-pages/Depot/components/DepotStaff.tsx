import { format } from "date-fns";
import React, { useMemo } from "react";
import { TableLoader } from "src/components/LoaderContainer";
import ViewWalletComp from "src/components/ViewWalletComponent";

const headCells: any[] = [
	{
		id: "createdAt",
		minWidth: 100,
		label: "Reg Date",
	},
	{
		id: "firstName",
		minWidth: 170,
		label: "First name",
	},

	{
		id: "lastName",
		minWidth: 100,
		label: "Last name",
	},
	{
		id: "email",
		minWidth: 100,
		label: "Email",
	},
	{
		id: "phoneNumber",
		minWidth: 100,
		label: "Phone number",
	},
	{
		id: "role",
		minWidth: 100,
		label: "Role",
	},
	{
		id: "systemCode",
		minWidth: 100,
		label: "System code",
	},
	{
		id: "status",
		minWidth: 100,
		label: "Status",
	},
];

export default function DepotStaff({ products }: any) {
	// console.log("isdhoisdoif", products);
	const handledAPIResponse = useMemo(
		() =>
			products?.reduce(
				(
					acc: any,
					curr: {
						createdAt: string | number | Date;
						price: number;
						accountStatus: { status: string };
					}
				) => [
					...acc,
					{
						...curr,
						createdAt: format(new Date(curr?.createdAt), "d-M-yyy h:m:s"),
						status: curr?.accountStatus?.status,
					},
				],
				[]
			),
		[products]
	);

	const props = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick: () => {},
		handleChangePage: () => {},
		paginationData: {
			totalPage: handledAPIResponse?.totalPages,
			limit: handledAPIResponse?.limit,
			page: handledAPIResponse?.page,
		},
	};

	return (
		<section className=" h-fit">
			<article className="w-full">
				<div className="mt-6">
					<div className="h-fit w-full bg-white mt-6 shadow-lg rounded-t-lg overflow-x-auto">
						<TableLoader
							data={handledAPIResponse}
							tableData={handledAPIResponse || []}>
							<ViewWalletComp
								accountInformation={{
									balance: 0,
									amountIn: 0,
									amountOut: 0,
								}}
								{...props}
							/>
						</TableLoader>
					</div>
				</div>
			</article>
		</section>
	);
}
