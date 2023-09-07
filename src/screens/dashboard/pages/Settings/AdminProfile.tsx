import { Fragment, useState } from "react";
import { CardButton } from "src/components/Card";
import ProfileCard from "src/components/ProfileCard";
import { cardBtnType, ProfiledataType } from "src/helpers/alias";

export default function AdminProfile() {
	const [showCard, setShowCard] = useState<boolean>(false);
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
