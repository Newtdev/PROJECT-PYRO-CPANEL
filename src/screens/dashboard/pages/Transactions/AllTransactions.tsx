import { ReactElement, useMemo } from "react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import ViewWalletComp from "src/components/ViewWalletComponent";
import {
	Category,
	CurrencyFormatter,
	handleDateFormat,
} from "src/helpers/helperFunction";
import { TransactionsType } from "src/helpers/alias";
import ReceiptCard from "src/components/ReceiptCard";
import { SelectInput, SelectType } from "src/components/SelectInput";
import {
	useExportAllTransactionsQuery,
	useGetAllTransactionsQuery,
} from "src/api/transactionsApiSlice";
import { TableLoader } from "src/components/LoaderContainer";
import { CustomTabs } from "src/components/CustomTab";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { SearchInput } from "src/components/inputs";
import { useDebounce } from "src/hooks/useDebounce";

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
		id: "created",
		minWidth: 170,
		label: "Transaction Date",
	},
	{
		id: "name",
		minWidth: 170,
		label: "Station Name",
	},
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

// TRANSACTION TABLE FILTER INFORMATION
const filterData: SelectType[] = [
	{ id: 1, value: "available_balance", label: "Available balance " },
	{ id: 2, value: "bank_transfer", label: "Bank transfer" },
	{ id: 3, value: "card_deposit", label: "Card deposit " },
	{ id: 4, value: "user_transfer", label: "User transfer" },
	{ id: 5, value: "pending", label: "Pending" },
	{ id: 6, value: "successful", label: "Successful" },
	{ id: 7, value: "reversed", label: "Reversed" },
	{ id: 8, value: "withdrawal", label: "Withdrawal" },
	{ id: 9, value: "top_up", label: "Top up" },
	{ id: 10, value: "remit", label: "Remit" },
];

// TAB DATA FOR TABLE TAB
const tabData: { id: number; value: string; label: string }[] = [
	{ id: 1, value: "one", label: "Station branch" },
	{ id: 2, value: "two", label: "Users" },
];

const Transactions = () => {
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const [filterValue, setFilterValue] = useState<string>("");
	const { debouncedValue } = useDebounce(filterValue, 700);

	const [info, setInfo] = useState({
		page: 1,
		source: "user_transfer",
	});
	const [value, setValue] = useState({
		tab: "one",
		who: "stations",
		for: "station_branch",
		populate: "stationBranch",
	});

	const [transactionData, setTransactionData] = useState<{}>({});

	function fn(data: { [index: string]: string | number }) {
		setTransactionData(data);
		setShowModal((prev) => !prev);
	}

	// HANDLE CHANGE FOR TABLE TAB
	const handleSelectChange = (event: { target: { value: string } }) => {
		setInfo((prev) => {
			return { ...prev, source: event.target.value };
		});
	};
	const allTransactionsResult = useGetAllTransactionsQuery({
		...{ ...info, ...value, debouncedValue },
	});
	const exportTransactionResult = useExportAllTransactionsQuery({
		...{ ...info, ...value },
	});

	// HANDLE TAB CHANGE
	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue((prevState) => {
			return {
				...prevState,
				tab: newValue,
				who: newValue === "two" ? "users" : "stations",
				for: newValue === "two" ? "" : "station_branch",
			};
		});
	};

	const handledAPIResponse = useMemo(() => {
		const transactions = allTransactionsResult?.currentData?.transactions || [];

		return transactions?.data?.reduce(
			(acc: { [index: string]: string }[], cur: TransactionsType) => [
				...acc,
				{
					created: format(new Date(cur.createdAt), "dd/mm/yyyy hh:mm:ss"),
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
	const handleChangePage = (event: unknown, newPage: number) => {
		setInfo((prev) => {
			return { ...prev, page: newPage };
		});
	};

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

	// HANDLE DATA EXPORT TO CSV

	const handleExportToCSV = useMemo(
		() => exportTransactionResult?.currentData?.transactions?.data,
		[exportTransactionResult]
	);
	return (
		<section>
			<article>
				<div className=" mt-6 ">
					<div className="w-full flex justify-between items-center">
						<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
							<SearchInput
								name="branch-search"
								placeholder="Search"
								value={filterValue}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const target = e.target;

									setFilterValue(() => target.value);
								}}
							/>
						</div>
						<div className="w-[109px]  h-11">
							<CSVLink data={handleExportToCSV ?? []}>
								<Button
									text="Export"
									className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
									type="button"
									showIcon={false}
									onClick={() => console.log("add branch")}
								/>
							</CSVLink>
						</div>
					</div>
					<div className="h-full  w-full bg-white mt-6 shadow-lg rounded-t-lg">
						<div className="h-full w-full flex justify-between items-center py-6 px-6">
							<div>
								<CustomTabs
									value={value.tab}
									tabData={tabData}
									handleChange={handleTabChange}
								/>
							</div>

							<div>
								<SelectInput
									tabData={filterData}
									filteredValue={info.source}
									onChange={handleSelectChange}
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
