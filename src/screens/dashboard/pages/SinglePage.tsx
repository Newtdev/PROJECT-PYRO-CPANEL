import React, { Fragment } from "react";
import { cardBtnType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";
import walletBtn from "src/assets/walletbtn.svg";
import User from "src/assets/User.svg";
import Attendant from "src/assets/Attendanticon.svg";
import Rating from "src/assets/Ratings.svg";
import { CardButton } from "src/components/Card";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function SinglePage() {
	const path = useLocation();

	const from = useMemo(() => path.pathname.split("/")[1], [path]);

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
			link: APP_ROUTE.VIEW_WALLET,
		},
		{
			id: 4,
			icon: Rating,
			name: "Ratings and Reviews",
			link: APP_ROUTE.VIEW_WALLET,
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
	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-full flex flex-col justify-between overflow-y-scroll px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					{from === "branch" ? (
						<>
							{BranchData.map((dt) => (
								<Fragment>
									<CardButton
										name={dt.name}
										icon={dt.icon}
										link={dt.link}
										height={"98px"}
									/>
								</Fragment>
							))}
						</>
					) : null}
					{from !== "branch" ? (
						<>
							{HQData.map((dt) => (
								<Fragment>
									<CardButton
										name={dt.name}
										icon={dt.icon}
										link={dt.link}
										height={"98px"}
									/>
								</Fragment>
							))}
						</>
					) : null}
				</div>
			</article>
		</section>
	);
}
