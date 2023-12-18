import { format } from "date-fns";
import React, { useMemo } from "react";
import { TableLoader } from "src/components/LoaderContainer";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { CurrencyFormatter } from "src/helpers/helperFunction";

const headCells: any[] = [
	{
		id: "name",
		minWidth: 170,
		label: "Product name",
	},

	{
		id: "quantity",
		minWidth: 100,
		label: "Quantity",
	},
	{
		id: "price",
		minWidth: 100,
		label: "Price",
	},
	{
		id: "unitOfMeasurement",
		minWidth: 100,
		label: "Unit",
	},
	{
		id: "status",
		minWidth: 100,
		label: "Status",
	},
];

export default function DepotProducts({ products }: any) {
	const handledAPIResponse = useMemo(
		() =>
			products?.reduce(
				(
					acc: any,
					curr: { createdAt: string | number | Date; price: number }
				) => [
					...acc,
					{
						...curr,

						price: CurrencyFormatter(curr?.price),
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

	// HANDLE EXPORT ALL USER DATA

	// const handleUserData = useMemo(
	// 	() => exportUserResult.currentData?.users?.data,
	// 	[exportUserResult]
	// );

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
