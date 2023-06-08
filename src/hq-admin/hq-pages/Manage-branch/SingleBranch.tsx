import React, { Fragment, useState } from "react";
import { cardBtnType, FormType } from "src/helpers/alias";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import Rating from "src/assets/img/Ratings.svg";
import { CardButton } from "src/components/Card";
import { useMemo } from "react";
import ProfileCard from "src/components/ProfileCard";
import { LoaderContainer } from "src/components/LoaderContainer";
import useCustomLocation from "src/hooks/useCustomLocation";
import {
	CurrencyFormatter,
	handleNotification,
	splitByUpperCase,
	SuccessNotification,
} from "src/helpers/helperFunction";
import AttendantProfile from "src/screens/dashboard/pages/Manage-branch/AttendantProfile";
import BranchReview from "src/screens/dashboard/pages/Manage-branch/BranchReview";
import {
	useFetchSingleHQBranchQuery,
	useUpdateHqBranchDetailsMutation,
} from "src/hq-admin/hq-api/manageHqApiSlice";
import { FormModal } from "src/components/ModalComp";
import { AddNewBranch } from "./Components";
import Transaction from "../Transaction";

const BranchData: cardBtnType[] = [
	{
		id: 1,
		icon: User,
		name: "Branch Profile",
	},

	{
		id: 3,
		icon: Attendant,
		name: "Attendant Profile",
	},
	{
		id: 4,
		icon: Rating,
		name: "Ratings and Reviews",
	},
	{
		id: 5,
		icon: Rating,
		name: "Wallet Info",
	},
	{
		id: 5,
		icon: Rating,
		name: "Transactions",
	},
];

export default function SingleBranch() {
	const [tabName, setTabName] = useState<string>("branch profile");
	const [showModal, setShowModal] = useState(false);
	const { slicedPath } = useCustomLocation();
	const branchResult = useFetchSingleHQBranchQuery(slicedPath[2]);
	const station = branchResult?.currentData?.station;

	const [updateBranchDetails, updateBranchDetailsResult] =
		useUpdateHqBranchDetailsMutation();

	async function updateBranch(values: FormType) {
		try {
			const response = await updateBranchDetails(values).unwrap();
			if (response) {
				SuccessNotification(response?.data?.message);
				setShowModal(() => false);
			}
		} catch (error: any) {
			handleNotification(error);
		}
	}

	const handledAPIResponse = useMemo(() => {
		return {
			profileData: {
				name: station?.name,
				phoneNumber: station?.phoneNumber,
				lga: station?.location?.lga,
				address: station?.location?.address,
				latitude: station?.location?.latitude,
				longitude: station?.location?.longitude,
				state: station?.location?.state,
			},
			pumpAttendants: station?.pumpAttendants,
			rating: station?.ratings,
			account: station?.wallets?.availableBalance,
			walletInfo: {
				walletName: station?.wallets?.walletName,
				walletNumber: station?.wallets?.walletNumber,
				bankName: station?.wallets?.bankName,
			},
		};
	}, [branchResult]);

	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-screen px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					<>
						{BranchData.map((dt) => (
							<Fragment>
								<CardButton
									name={dt.name}
									icon={dt.icon}
									height={"98px"}
									activeBtn={tabName}
									onClick={() => setTabName(dt.name)}
									// showCard={showCard}
								/>
							</Fragment>
						))}
					</>
				</div>

				<LoaderContainer data={branchResult}>
					{tabName.toLowerCase() === "branch profile" ? (
						<ProfileCard
							data={handledAPIResponse.profileData || {}}
							onClick={() => setShowModal(true)}
							showImage={false}
						/>
					) : null}

					{tabName.toLowerCase() === "attendant profile" ? (
						<AttendantProfile
							attendantData={handledAPIResponse?.pumpAttendants}
						/>
					) : null}
					{tabName.toLowerCase() === "ratings and reviews" ? (
						<BranchReview ratings={handledAPIResponse.rating} />
					) : null}
					{tabName.toLowerCase() === "wallet info" ? (
						<BranchAccountBalance
							account={handledAPIResponse.account}
							info={handledAPIResponse}
						/>
					) : null}
					{tabName.toLowerCase() === "transactions" ? <Transaction /> : null}
				</LoaderContainer>

				{showModal ? (
					<FormModal
						name="Update branch details"
						onClick={() => setShowModal((prevState) => !prevState)}>
						<AddNewBranch
							makeApiRequest={(values) => updateBranch(values)}
							apiResult={updateBranchDetailsResult}
							initalValue={station}
						/>
					</FormModal>
				) : null}
			</article>
		</section>
	);
}

const BranchAccountBalance = (props: {
	account: string;
	info: { [index: string]: string | any };
}) => {
	return (
		<div className="p-4 basis-[60%] rounded-[10px] bg-white grid grid-cols-1 gap-x-10 justify-items-center content-center mt-6 pl-6">
			<div className="text-start text-[#002E66]">
				<h3 className="text-[14px]my-">Available Balance</h3>
				<h2 className="text-[24px] font-bold">
					{CurrencyFormatter(Number(props?.account))}
				</h2>
			</div>
			<div className="w-full mt-4 grid grid-cols-3 my-6">
				{Object.keys(props?.info.walletInfo)?.map((dt, i) => {
					return (
						<div key={i}>
							<h2 className="text-black capitalize">{splitByUpperCase(dt)}</h2>
							<h2 className="text-[#002E66] capitalize">
								{props?.info?.walletInfo[dt]}
							</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
};
