import React, { Fragment, useState } from "react";
import { cardBtnType, ProfiledataType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";
import walletBtn from "src/assets/img/walletbtn.svg";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import Rating from "src/assets/img/Ratings.svg";
import { CardButton } from "src/components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import ProfileCard from "src/components/ProfileCard";

export default function SinglePage() {
	const path = useLocation();
	const navigate = useNavigate();
	const [showCard, setShowCard] = useState<boolean>(true);

	const routeData = useMemo(() => {
		let from = path.pathname.split("/")[1];
		let state = path.state;

		return { from, state };
	}, [path]);

	const BranchData: cardBtnType[] = [
		{
			id: 1,
			icon: User,
			name: "Branch Profile",
			link: APP_ROUTE.BRANCHES,
		},
		{
			id: 2,
			icon: walletBtn,
			name: "View Wallet",
			link: APP_ROUTE.VIEW_WALLET,
		},
		{
			id: 3,
			icon: Attendant,
			name: "Attendant Profile",
			// navigate(`/branch/${name}`, { state: name })
			link: `/branch/${routeData.state}/attendant`,
		},
		{
			id: 4,
			icon: Rating,
			name: "Ratings and Reviews",
			link: `/branch/${routeData.state}/reviews`,
		},
	];

	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: User,
			name: "View Profile",
			link: APP_ROUTE.BRANCHES,
		},
		{
			id: 2,
			icon: walletBtn,
			name: "View Wallet",
			link: APP_ROUTE.VIEW_WALLET,
		},
		{
			id: 3,
			icon: Attendant,
			name: "Branches",
			link: APP_ROUTE.VIEW_WALLET,
		},
	];

	const ViewProfileData: ProfiledataType = [
		{
			id: 1,
			name: "Full Name",
			value: "Aliko, Zaria Road II",
		},
		{
			id: 2,
			name: "Email",
			value: "Zariaroad2@alikooil.com",
		},
		{
			id: 4,
			name: "Address",
			value: "Ado Batero Bridge, Zaria Road Kano",
		},
		{
			id: 3,
			name: "State",
			value: "Kano State",
		},
		{
			id: 5,
			name: "Branch Manager",
			value: "Abdulsamad Auwal",
		},
		{
			id: 6,
			name: "Phone number",
			value: "Abdulsamad Auwall",
		},
	];
	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-screen px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					{routeData.from === "branch" ? (
						<>
							{BranchData.map((dt) => (
								<Fragment>
									<CardButton
										name={dt.name}
										icon={dt.icon}
										link={dt.link}
										height={"98px"}
										onClick={() => {
											if (dt.name === "Branch Profile") {
												setShowCard(!showCard);
											} else {
												navigate(dt.link, { state: dt.name });
											}
										}}
										showCard={showCard}
									/>
								</Fragment>
							))}
						</>
					) : null}
					{routeData.from !== "branch" ? (
						<>
							{HQData.map((dt) => (
								<Fragment>
									<CardButton
										name={dt.name}
										icon={dt.icon}
										link={dt.link}
										height={"98px"}
										onClick={() => {
											if (dt.name === "Branch Profile") {
												setShowCard(!showCard);
											} else {
												navigate(dt.link, { state: dt.name });
											}
										}}
									/>
								</Fragment>
							))}
						</>
					) : null}
				</div>
				{showCard ? (
					<ProfileCard data={ViewProfileData} showImage={false} />
				) : null}
			</article>
		</section>
	);
}
