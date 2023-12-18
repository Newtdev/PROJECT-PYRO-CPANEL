import { useState } from "react";
import { Button } from "src/components/Button";
import { FormModal } from "src/components/ModalComp";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import Wallet from "src/assets/img/walletbtn.svg";
import { useAuth } from "src/hooks/useAuth";
import { useGetAllWalletRequestQuery } from "src/hq-admin/hq-api/hqTransactionApiSlice";

const WithDrawal = () => {
	const { user } = useAuth();
	const [showNotification, setShowNotification] = useState<boolean>(false);
	// console.log("sdihfosid", user?.stationHQ);
	const allTransactionsResult = useGetAllWalletRequestQuery(
		{ stationBranch: user?.stationHQ },
		{ skip: !user?.stationHQ }
	);

	// console.log("all result", allTransactionsResult);

	const handleWidthDrawal = () =>
		setShowNotification((prevState) => !prevState);

	return (
		<section>
			<article>
				<button
					onClick={handleWidthDrawal}
					className="w-full h-[74px] mt-3 shadow-lg bg-white rounded-lg flex items-center gap-10 px-6 font-bold text-primary text-sm">
					<img src={Wallet} alt="wallet" />
					<p>Bakkah Oil, Gwagwalada II is requesting a withdrawal</p>
					<span className="h-6 w-6 rounded-full bg-red-600 ml-auto"></span>
				</button>
			</article>
			{showNotification ? (
				<FormModal name="Withdrawal request" onClick={handleWidthDrawal}>
					<WidthDrawModal toggleState={handleWidthDrawal} />
				</FormModal>
			) : null}
		</section>
	);
};

export default WithDrawal;

const WidthDrawModal = ({ toggleState }: { toggleState: () => void }) => {
	return (
		<div className="w-full flex flex-col justify-center py-4 px-6 h-full text-sm gap-6">
			<div>
				<h1 className="text-lightgray">Branch Name</h1>
				<p>Gwarrimpa AV filling Branch</p>
			</div>
			<div>
				<h1 className="text-lightgray">Description</h1>
				<p>
					Hey boss, I know you won’t like this reason, but i really need that
					money to fund my girlfriend’s birthday, I love her so much and I would
					love to not mess with her, I hope you understand Boss
				</p>
			</div>
			<div>
				<h1 className="text-lightgray">Amount</h1>
				<p>{CurrencyFormatter(200000)}</p>
			</div>
			<div>
				<div className="w-full h-[41px] mb-[19px]">
					<Button
						text="Approve"
						className="h-full w-full font-bold  bg-primary rounded-full text-white flex items-center justify-center"
						type="button"
						showIcon={false}
					/>
				</div>
				<div className="w-full h-[41px]">
					<Button
						text="Decline"
						className="h-full w-full font-bold bg-white border border-red-600 text-red-600  rounded-full  flex items-center justify-center"
						type="button"
						showIcon={false}
						onClick={toggleState}
					/>
				</div>
			</div>
		</div>
	);
};
