import { ChangeEventHandler, ReactElement } from "react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import { Data } from "src/helpers/alias";
import { SearchInput } from "src/components/inputs";
import { FilterList, HighlightOffOutlined } from "@mui/icons-material";
import { Modal } from "src/components/ModalComp";
import ReceiptCard from "src/components/ReceiptCard";

interface HeadCellTypes {
	id: keyof Data;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement | any;
	referenceId?: string | number;
	doneby?: string;
}

const rows: Data[] = [
	{
		id: 1,
		amount: CurrencyFormatter(200000),
		type: "Transfer",
		doneby: "Zaria Road, Tambuwawa",
		status: <p className="text-yellow-500">Pending</p>,
		referenceId: "683928724647",
	},
	{
		id: 2,
		amount: CurrencyFormatter(200000),
		type: "Withdrawal",
		doneby: "Zaria Road, Tambuwawa",
		status: <p className="text-green-500">Successful</p>,
		referenceId: "683928724647",
	},
	{
		id: 3,
		amount: CurrencyFormatter(200000),
		type: "Transfer",
		doneby: "Zaria Road, Tambuwawa",
		status: <p className="text-yellow-500">Pending</p>,
		referenceId: "683928724647",
	},
	{
		id: 4,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwawa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 5,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 6,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 7,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 8,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 9,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 10,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
	{
		id: 12,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		doneby: "Zaria Road, Tambuwa",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
];

const headCells: readonly HeadCellTypes[] = [
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
	{
		id: "referenceId",
		minWidth: 170,
		label: "Reference Id",
	},
];

type SelectType = {
	id: string | number;
	value: string;
	label: string;
	[x: string]: any;
};

const SelectInput = (props: {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	filteredValue: string;
	tabData: SelectType[];
}): ReactElement => {
	return (
		<div className="border border-gray-200 rounded-lg px-2">
			<FilterList />
			<select
				className="w-36 py-2 px-4 bg-transparent"
				value={props.filteredValue}
				onChange={props.onChange}>
				<option value={""}>Filter</option>
				{props?.tabData?.map((dt: SelectType) => (
					<option key={dt.id} value={dt?.value.trim()}>
						{dt?.label.trim()}
					</option>
				))}
			</select>
		</div>
	);
};

const data = {
	ref: "1234567890",
	accountNumber: 1234567890,
	accountName: "Thomas Ejembi",
	bank: "Polaris Bank",
	category: "Branch",
	amount: "2000",
	vat: "3000",
	status: "pending",
	transactionTime: "2/3/2023",
};

// const useGetSelectedData = (data) => {
// 	const [transactionData, setTransactionData] = useState<{}>(data || {});

// 	return
// };
const Transactions = () => {
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);

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
		rows,
		headCells,
		handleRowClick,
		accountInformation: {
			balance: 0,
			amountIn: 0,
			amountOut: 0,
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
						<ViewWalletComp {...props} />
					</div>
				</div>
				{showModal ? (
					<Modal>
						<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
							<div className="w-[70%] mx-auto flex flex-col justify-center rounded-[20px] pb-10 bg-white">
								<div className="w-full px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
									<h1>Transaction</h1>
									<button onClick={() => setShowModal(false)} disabled={false}>
										<HighlightOffOutlined
											fontSize="large"
											className="text-black cursor-pointer"
										/>
									</button>
								</div>
								<div>
									<hr />
								</div>

								<ReceiptCard data={transactionData} />
							</div>
						</div>
					</Modal>
				) : null}
			</article>
		</section>
	);
};

export default Transactions;
