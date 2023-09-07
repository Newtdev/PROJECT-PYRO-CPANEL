import React, { useMemo, useRef, useState } from "react";
import { Button } from "src/components/Button";
import { TableLoader } from "src/components/LoaderContainer";
import ReceiptCard from "src/components/ReceiptCard";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { TransactionsType } from "src/helpers/alias";
import {
	Category,
	CurrencyFormatter,
	handleDateFormat,
} from "src/helpers/helperFunction";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import { useGetAllHQTransactionsQuery } from "src/hq-admin/hq-api/hqTransactionApiSlice";
import { HeadCellTypes } from "../Manage-branch";

const headCells: readonly HeadCellTypes[] = [
	{
		id: "walletId",
		minWidth: 170,
		label: "Wallet ID",
	},
	{
		id: "referenceId",
		minWidth: 170,
		label: "Reference",
	},
	{
		id: "amount",
		minWidth: 170,
		label: "Transaction Amount (N)",
	},
	{
		id: "category",
		minWidth: 170,
		label: "Category",
	},
	{
		id: "type",
		minWidth: 170,
		label: "Type",
	},
	{
		id: "doneby",
		minWidth: 170,
		label: "Done By",
	},
	{
		id: "status",
		minWidth: 170,
		label: "Status",
	},
];

export default function Transaction({ id }: { id: string }) {
	const allTransactionsResult = useGetAllHQTransactionsQuery(id, { skip: !id });
	const [transactionData, setTransactionData] = useState<{}>({});
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);

	const handledAPIResponse = useMemo(() => {
		const transactions = allTransactionsResult?.currentData || [];

		return transactions?.data?.reduce(
			(acc: { [index: string]: string }[], cur: TransactionsType) => [
				...acc,
				{
					referenceId: cur.meta?.reference,
					doneby: cur.meta?.payerName,
					walletId: cur.meta.walletNumber,
					type: cur.type,
					category: Category[cur.category],
					amount: CurrencyFormatter(Number(cur?.amount)),
					name: cur?.stationBranch.name,

					status: (
						<p
							className={`${
								cur.status.toString().toLowerCase() === "pending"
									? "text-yellow-500"
									: cur.status.toString().toLowerCase() === "successful"
									? "text-green-500"
									: "text-red-500"
							}`}>
							{cur.status}
						</p>
					),
					createdAt: handleDateFormat(cur?.createdAt),
				},
			],
			[]
		);
	}, [allTransactionsResult]);

	// HANDLE CHANGE FOR PAGINATION
	function fn(data: { [index: string]: string | number }) {
		setTransactionData(data);
		setShowModal((prev) => !prev);
	}
	const props = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick,
		accountInformation: {
			balance: 0,
			amountIn: 0,
			amountOut: 0,
		},
		handleChangePage: () => null,
		paginationData: {
			totalPage: allTransactionsResult?.currentData?.data?.totalPages,
			limit: allTransactionsResult?.currentData?.data?.limit,
			page: allTransactionsResult?.currentData?.data?.page,
		},
	};
	return (
		<section>
			<article>
				<div className=" mt-6 ">
					<div className="w-fit flex items-center">
						<div className="w-[109px]  h-11">
							{handledAPIResponse > 0 ? (
								<Button
									text="Export"
									className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
									type="button"
									showIcon={false}
									onClick={() => console.log("add branch")}
								/>
							) : null}
						</div>
					</div>
					<div className="h-full  w-full bg-white mt-6 shadow-lg rounded-t-lg">
						<TableLoader
							data={allTransactionsResult}
							tableData={handledAPIResponse || []}>
							<ViewWalletComp {...props} />
						</TableLoader>
					</div>
				</div>
				{showModal ? (
					<ReceiptCard data={transactionData} setShowModal={setShowModal} />
				) : null}
			</article>
		</section>
	);
}
