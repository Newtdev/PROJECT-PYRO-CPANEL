import React, { Fragment, useState } from "react";
import { cardBtnType, ProfiledataType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";
import walletBtn from "src/assets/img/walletbtn.svg";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import { CardButton } from "src/components/Card";
import { useNavigate } from "react-router-dom";
import ProfileCard from "src/components/ProfileCard";
import useCustomLocation from "src/hooks/useCustomLocation";

export default function HQPage() {
	const navigate = useNavigate();
	const { routePath } = useCustomLocation();

	const [showCard, setShowCard] = useState<boolean>(true);

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
			link: `/view/${routePath}/wallet`,
		},
		{
			id: 3,
			icon: Attendant,
			name: "Branches",
			link: `/view/${routePath}/branch`,
		},
	];
	// const ViewProfileData: ProfiledataType = [
	// 	{
	// 		id: 1,
	// 		name: "Full Name",
	// 		value: "Aliko, Zaria Road II",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Email",
	// 		value: "Zariaroad2@alikooil.com",
	// 	},
	// 	{
	// 		id: 4,
	// 		name: "Address",
	// 		value: "Ado Batero Bridge, Zaria Road Kano",
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "State",
	// 		value: "Kano State",
	// 	},
	// 	{
	// 		id: 5,
	// 		name: "Branch Manager",
	// 		value: "Abdulsamad Auwal",
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Phone number",
	// 		value: "Abdulsamad Auwall",
	// 	},
	// ];
	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-screen px-2">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					<>
						{HQData.map((dt) => (
							<Fragment>
								<CardButton
									name={dt.name}
									icon={dt.icon}
									link={dt.link}
									height={"98px"}
									onClick={() => {
										if (
											dt.name.toString().toLocaleLowerCase() === "view profile"
										) {
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
				</div>
				{/* {showCard ? (
					<ProfileCard
						showBanner={true}
						data={ViewProfileData}
						imageURL="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
						showImage={false}
					/>
				) : null} */}
			</article>
		</section>
	);
}
