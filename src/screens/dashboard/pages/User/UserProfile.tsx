import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomLocation from "src/hooks/useCustomLocation";
import walletBtn from "src/assets/img/walletbtn.svg";
import User from "src/assets/img/User.svg";
import { cardBtnType, ProfiledataType } from "src/helpers/alias";
import ProfileCard from "src/components/ProfileCard";
import { CardButton } from "src/components/Card";
import { APP_ROUTE } from "src/helpers/Routes";

export default function UserProfile() {
	const navigate = useNavigate();
	const { routePath } = useCustomLocation();

	const [showCard, setShowCard] = useState<boolean>(true);

	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: User,
			name: "View Profile",
			link: APP_ROUTE.USER_PROFILE,
		},

		{
			id: 2,
			icon: walletBtn,
			name: "View Wallet",
			link: `/user/${routePath}/wallet`,
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
			name: "Username",
			value: "Danzino",
		},

		{
			id: 5,
			name: "NIN",
			value: "12345678909",
		},
		{
			id: 6,
			name: "Phone number",
			value: "08171315754",
		},
		{
			id: 6,
			name: "Date Registered",
			value: "08171315754",
		},
	];
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
										if (dt.name.toString().toLowerCase() === "view profile") {
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
				{showCard ? (
					<ProfileCard
						showBanner={false}
						data={ViewProfileData}
						imageURL="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
						showImage={true}
					/>
				) : null}
			</article>
		</section>
	);
}
