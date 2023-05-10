import { HighlightOffOutlined } from "@mui/icons-material";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lines } from "src/components/Icons";
import { Modal } from "src/components/ModalComp";
import ReceiptCard from "src/components/ReceiptCard";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { Data } from "src/helpers/alias";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import useHandleRowClick from "src/hooks/useHandleRowClick";

export default function ViewHQWallet() {
	const navigate = useNavigate();
	// const [showReciptModal, setShowReciptModal] = useState(false);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);

	function fn(name: { [index: string]: string | number }) {
		console.log(name);
		setShowModal((prev) => !prev);
	}

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

	const rows: Data[] | null = [
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
				<Modal>
					<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
						<div className="w-[70%] flex flex-col justify-center rounded-[20px] pb-10 bg-white">
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

							<ReceiptCard data={data} />
						</div>
					</div>
				</Modal>
			) : null}
		</>
	);
}
