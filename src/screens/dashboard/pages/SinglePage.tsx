import React, { Fragment, useState } from "react";
import { cardBtnType } from "src/helpers/alias";
// import walletBtn from "src/assets/img/walletbtn.svg";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import Rating from "src/assets/img/Ratings.svg";
import { CardButton } from "src/components/Card";
import { useMemo } from "react";
import ProfileCard from "src/components/ProfileCard";
import { LoaderContainer } from "src/components/LoaderContainer";
import { useFetchBranchQuery } from "src/api/manageBranchAPISlice";
import useCustomLocation from "src/hooks/useCustomLocation";
// import ViewWallet from "./ViewWallet";
import AttendantProfile from "./Manage-branch/AttendantProfile";
import BranchReview from "./Manage-branch/BranchReview";

const pumpAttendants = [
	{
		_id: "64467c7fa0850b1b1682380f",
		firstName: "Thomas",
		lastName: "Ejembi",
		systemCode: "TE-ABU-AMA-Y6QLU9",
		stationHQ: "64467938f60f2c5b6c901e75",
		email: "thomas@ejembi.com",
		isEmailVerified: true,
		emailVerifiedAt: "2023-04-24T12:56:31.922Z",
		phoneNumber: "08157893145",
		role: "pump_attendant",
		meta: {
			stationBranch: "64467ab1f60f2c5b6c901e87",
			qrCode:
				"data:image/png;base64,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",
		},
		accountStatus: "confirmed",
		createdAt: "2023-04-24T12:56:31.925Z",
		updatedAt: "2023-04-24T12:56:31.953Z",
	},
];

export default function SinglePage() {
	const [tabName, setTabName] = useState<string>("branch profile");
	const { slicedPath } = useCustomLocation();
	const branchResult = useFetchBranchQuery(slicedPath[2]);

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
			},
			rating: station?.ratings,
		};
	}, [branchResult]);

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
	];

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
							showImage={false}
						/>
					) : null}
					{/* {tabName.toLowerCase() === "view wallet" ? <ViewWallet /> : null} */}
					{tabName.toLowerCase() === "attendant profile" ? (
						<AttendantProfile attendantData={pumpAttendants} />
					) : null}
					{tabName.toLowerCase() === "ratings and reviews" ? (
						<BranchReview ratings={handledAPIResponse.rating} />
					) : null}
				</LoaderContainer>
			</article>
		</section>
	);
}
