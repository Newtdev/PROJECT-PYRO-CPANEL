import { Fragment, useState } from "react";
import { CardButton } from "src/components/Card";
import ProfileCard from "src/components/ProfileCard";
import { cardBtnType, ProfiledataType } from "src/helpers/alias";

export default function AdminProfile() {
	const [showCard, setShowCard] = useState<boolean>(false);

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
	// 		name: "Username",
	// 		value: "Danzino",
	// 	},

	// 	{
	// 		id: 5,
	// 		name: "NIN",
	// 		value: "12345678909",
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Phone number",
	// 		value: "08171315754",
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Date Registered",
	// 		value: "08171315754",
	// 	},
	// ];
	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-screen px-2">
				{/* {showCard ? (
					<ProfileCard
						showBanner={false}
						data={ViewProfileData}
						imageURL="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
						showImage={true}
					/>
				) : null} */}
			</article>
		</section>
	);
}
