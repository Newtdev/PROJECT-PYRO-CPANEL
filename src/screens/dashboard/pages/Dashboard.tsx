import revenue from "src/assets/img/revenue.svg";
import totalTransactions from "src/assets/img/totalTransactions.svg";
import attendant from "src/assets/img/attendant.svg";
import { Fragment, useState } from "react";
import { DashboardCards } from "src/components/Card";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import { useDashboardInfoQuery } from "src/api/authApiSlice";
import { LoaderContainer } from "src/components/LoaderContainer";
import { cardType } from "src/helpers/alias";
import { DashboardCardsButton } from "src/components/DashboardButton";
import { Button } from "src/components/Button";
import { FormModal } from "src/components/ModalComp";
import AddProducts from "src/components/AddProducts";
import AddAmenities from "src/components/AddAmenities";

const Dashboard = () => {
	const response = useDashboardInfoQuery("");
	const [showModal, setShowModal] = useState(false);
	const [showAmenities, setShowAmenities] = useState(false);

	function handleShowModal() {
		setShowModal((prevState) => !prevState);
	}
	function handleShowAmenities() {
		setShowAmenities((prevState) => !prevState);
	}
	const cardData: cardType[] = [
		{
			id: 1,
			icon: revenue,
			amount: CurrencyFormatter(Number("12000")),
			name: "Total Revenue",
		},
		{
			id: 2,
			icon: totalTransactions,
			amount: CurrencyFormatter(Number("12000")),
			name: "Total HQ Transactions",
		},

		{
			id: 3,
			icon: attendant,
			amount: response?.data?.data.stationBranches,
			name: "Station Branches",
		},
	];

	return (
		<LoaderContainer data={response}>
			<section>
				{/* <LoaderContainer /> */}
				<article className="w-full h-full flex flex-col justify-between overflow-y-auto ">
					<div className="py-3">
						<div className="h-full px-4 pb-4 w-full">
							<div className="h-full grid grid-cols-3 gap-4 ">
								{cardData.map((dt) => (
									<Fragment>
										<DashboardCards
											name={dt.name}
											icon={dt.icon}
											amount={dt.amount}
										/>
									</Fragment>
								))}
							</div>
							<div className="w-full grid grid-cols-3 mt-6 gap-x-6 ">
								<DashboardCardsButton
									name="Products"
									amount=""
									icon={attendant}>
									<Button
										className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
										text={"Add Product"}
										onClick={handleShowModal}
										type="button"
									/>
								</DashboardCardsButton>
								<DashboardCardsButton
									name="Add Amenities"
									amount=""
									icon={attendant}>
									<Button
										className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
										text="Add Amenities"
										type="button"
										onClick={handleShowAmenities}
									/>
								</DashboardCardsButton>
							</div>
						</div>
					</div>
				</article>
				{showModal ? (
					<FormModal name={"Add Products"} onClick={handleShowModal}>
						<AddProducts onClose={handleShowModal} />
					</FormModal>
				) : null}
				{showAmenities ? (
					<FormModal name={"Add Products"} onClick={handleShowAmenities}>
						<AddAmenities onClose={handleShowAmenities} />
					</FormModal>
				) : null}
			</section>
		</LoaderContainer>
	);
};

export default Dashboard;
