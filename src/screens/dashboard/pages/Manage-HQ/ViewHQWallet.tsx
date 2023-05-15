import React, { ReactElement, useState } from "react";
import ReceiptCard from "src/components/ReceiptCard";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { Data } from "src/helpers/alias";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import useHandleRowClick from "src/hooks/useHandleRowClick";

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

export default function ViewHQWallet() {
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const [transactionData, setTransactionData] = useState<{}>({});

	function fn(data: { [index: string]: string | number }) {
		setShowModal((prev) => !prev);
		setTransactionData(data);
	}
	const props = {
		rows,
		headCells,
		handleRowClick,
		accountInformation: {
			balance: 500000,
			amountIn: 2100000,
			amountOut: 100000000,
		},
	};

	const data = {
		ref: "1234567890",
		accountNumber: 1234567890,
		accountName: "Thomas Ejembi",
		bank: "Polaris Bank",
		amount: "2000",
		vat: "3000",
		status: "pending",
		transactionTime: "2/3/2023",
	};
	return (
		<>
			<ViewWalletComp {...props} />;
			{showModal ? (
				<ReceiptCard data={transactionData} setShowModal={setShowModal} />
			) : null}
		</>
	);
}
