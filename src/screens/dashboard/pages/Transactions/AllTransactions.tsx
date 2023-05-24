import { ReactElement, useMemo } from "react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import ViewWalletComp from "src/components/ViewWalletComponent";
import {
	CurrencyFormatter,
	handleDateFormat,
} from "src/helpers/helperFunction";
import { TransactionsType } from "src/helpers/alias";
import { SearchInput } from "src/components/inputs";
import ReceiptCard from "src/components/ReceiptCard";
import { SelectInput, SelectType } from "src/components/SelectInput";
import { useGetAllTransactionsQuery } from "src/api/transactionsApiSlice";
import { TableLoader } from "src/components/LoaderContainer";

interface HeadCellTypes {
	id: string;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement | any;
	referenceId?: string | number;
	doneby?: string;
}

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

const Transactions = () => {
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const [page, setPage] = useState({ newPage: 1 });

	const [transactionData, setTransactionData] = useState<{}>({});
	function fn(data: { [index: string]: string | number }) {
		setTransactionData(data);
		setShowModal((prev) => !prev);
	}
	const [searchValue, setSearchValue] = useState<string>("");
	const [filteredValue, setFilteredValue] = useState<string>("");

	const handleSelectChange = (event: { target: { value: string } }) => {
		setFilteredValue(event.target.value);
	};
	const allTransactionsResult = useGetAllTransactionsQuery({ page });

	const handledAPIResponse = useMemo(() => {
		const transactions = allTransactionsResult?.currentData?.transactions || [];
		return transactions?.data?.reduce(
			(acc: { [index: string]: string }[], cur: TransactionsType) => [
				...acc,
				{
					referenceId: cur.meta?.reference,
					doneby: cur.meta?.payerName,
					walletId: cur.meta.walletNumber,
					type: cur.type,

					category: cur.category,
					amount: CurrencyFormatter(Number(cur?.amount)),

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

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage((prev) => {
			return { ...prev, newPage };
		});
	};
	// TABLE FILTER TAB
	const tabData: SelectType[] = [
		{ id: 1, value: "Pending", label: "Pending " },
		{ id: 2, value: "HQ", label: "HQ" },
		{ id: 3, value: "Branch", label: "Branch " },
		{ id: 4, value: "Users", label: "Users " },
		{ id: 5, value: "Success", label: "Success" },
		{ id: 6, value: "Failed", label: "Failed" },
	];

	const props = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick,
		accountInformation: {
			balance: 0,
			amountIn: 0,
			amountOut: 0,
		},
		handleChangePage,
		paginationData: {
			totalPage: allTransactionsResult?.currentData?.transactions?.totalPages,
			limit: allTransactionsResult?.currentData?.transactions?.limit,
			page: allTransactionsResult?.currentData?.transactions?.page,
		},
	};
	return (
		<section>
			<article>
				<div className=" mt-6 h-20">
					<div className="w-fit flex items-center">
						<div className="w-[109px]  h-11">
							<Button
								text="Export"
								className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
								type="button"
								showIcon={false}
								onClick={() => console.log("add branch")}
							/>
						</div>
					</div>
					<div className="h-full w-full bg-white mt-6 shadow-lg rounded-t-lg">
						<div className="h-full w-full flex justify-between items-center py-6 px-6">
							<div>
								<SelectInput
									tabData={tabData}
									filteredValue={filteredValue}
									onChange={handleSelectChange}
								/>
							</div>

							<div className="flex w-[30%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
								<SearchInput
									name="branch-search"
									placeholder="Search for Branch, HQ, User"
									value={searchValue}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										const target = e.target;
										setSearchValue(target.value);
									}}
								/>
							</div>
						</div>
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
};

export default Transactions;
