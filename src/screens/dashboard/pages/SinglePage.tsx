import React, { Fragment, useState } from "react";
import { cardBtnType } from "src/helpers/alias";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import Rating from "src/assets/img/Ratings.svg";
import { CardButton } from "src/components/Card";
import { useMemo } from "react";
import ProfileCard from "src/components/ProfileCard";
import { LoaderContainer } from "src/components/LoaderContainer";
import { useFetchBranchQuery } from "src/api/manageBranchAPISlice";
import useCustomLocation from "src/hooks/useCustomLocation";

import AttendantProfile from "./Manage-branch/AttendantProfile";
import BranchReview from "./Manage-branch/BranchReview";
import {
	CurrencyFormatter,
	splitByUpperCase,
} from "src/helpers/helperFunction";

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
		id: 6,
		icon: Rating,
		name: "Branch Main Products",
	},
	{
		id: 7,
		icon: Rating,
		name: "Other Products",
	},
];

export default function SinglePage() {
	const [tabName, setTabName] = useState<string>("branch profile");
	const { routePath } = useCustomLocation();
	const branchResult = useFetchBranchQuery(routePath.id);

	const handledAPIResponse = useMemo(() => {
		const station = branchResult?.currentData?.station;

		return {
			profileData: {
				name: station?.name,
				phoneNumber: station?.phoneNumber,
				lga: station?.location?.lga,
				address: station?.location?.address,
				latitude: station?.location?.latitude,
				longitude: station?.location?.longitude,
				state: station?.location?.state,
				pumpCount: station?.config?.pumpCount,
				status: station?.status,
				openingTime: station?.config?.openTime?.from,
				closingTime: station?.config?.openTime?.to,
			},
			config: station?.config,
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
	const tab_name = tabName.trim().toLowerCase();
	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-screen px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					{/* {slicedPath[1] === "branch" ? ( */}
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
					{tab_name === "branch profile" ? (
						<ProfileCard
							data={handledAPIResponse.profileData || {}}
							showImage={false}
						/>
					) : null}
					{/* {tab_name === "view wallet" ? <ViewWallet /> : null} */}
					{tab_name === "attendant profile" ? (
						<AttendantProfile
							attendantData={handledAPIResponse?.pumpAttendants}
						/>
					) : null}
					{tab_name === "ratings and reviews" ? (
						<BranchReview ratings={handledAPIResponse.rating} />
					) : null}
					{tab_name === "wallet info" ? (
						<BranchAccountBalance
							account={handledAPIResponse.account}
							info={handledAPIResponse}
						/>
					) : null}
					{tab_name === "branch main products" ? (
						<ProductCard data={handledAPIResponse.config} />
					) : null}
				</LoaderContainer>
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
				{Object.keys(props?.info.walletInfo)?.map((dt, i) => (
					<div key={i + 1}>
						<h2 className="text-black capitalize">{splitByUpperCase(dt)}</h2>
						<h2 className="text-[#002E66] capitalize">
							{props?.info?.walletInfo[dt]}
						</h2>
					</div>
				))}
			</div>
		</div>
	);
};

function ProductCard(props: any) {
	return (
		<div className="w-full h-fit bg-white shadow-lg rounded-lg text-[14px] py-6">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
				{Object.keys(props?.data)?.map((dt, i) => (
					<Fragment key={i + 1}>
						{i > 1 ? (
							<div>
								<h2 className="text-black capitalize">
									{splitByUpperCase(dt)}
								</h2>
								<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg capitalize"></span>
								<h2 className="text-[#002E66] capitalize">
									{CurrencyFormatter(props?.data[dt]?.price ?? null)}
								</h2>

								<h2 className="text-[#002E66] capitalize">
									Available:
									{!props?.data[dt]?.isAvailable ? " NO" : " YES"}
								</h2>
							</div>
						) : null}
					</Fragment>
				))}
			</div>
		</div>
	);
}
