import { HighlightOffOutlined, Print } from "@mui/icons-material";
import { Modal } from "./ModalComp";

export default function ReceiptCard(props: any) {
	function splitByUpperCase(str: string): string {
		const result = str
			.trim()
			.split(/(?=[A-Z])/)
			.join(" ")
			.trim()
			.toUpperCase();

		return result;
	}
	return (
		<Modal>
			<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
				<div className="w-[70%] mx-auto flex flex-col justify-center rounded-[20px] pb-10 bg-white">
					<div className="w-full px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
						<h1>Transaction</h1>
						<button onClick={() => props.setShowModal(false)} disabled={false}>
							<HighlightOffOutlined
								fontSize="large"
								className="text-black cursor-pointer"
							/>
						</button>
					</div>
					<div>
						<hr />
					</div>

					<div className="w-full h-full  rounded-lg text-[14px] py-6">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
							{Object.entries(props?.data)?.map((dt: any) => {
								return (
									<div key={dt.id}>
										<h2 className="text-black">{splitByUpperCase(dt[0])}</h2>
										<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
										<h2 className="text-[#002E66]">{dt[1]}</h2>
									</div>
								);
							})}
						</div>
						<div className=" w-32 pr-4 flex justify-between ml-14 mt-16 items-center ">
							<Print />
							<h1>Print Recipt</h1>
						</div>
					</div>
					{/* <ReceiptCard data={transactionData} /> */}
				</div>
			</div>
		</Modal>
	);
}
