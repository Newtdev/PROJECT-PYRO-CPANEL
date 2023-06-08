import React, { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomLocation from "src/hooks/useCustomLocation";
import walletBtn from "src/assets/img/walletbtn.svg";
import User from "src/assets/img/User.svg";
import { cardBtnType, ProfiledataType } from "src/helpers/alias";
import ProfileCard from "src/components/ProfileCard";
import { CardButton } from "src/components/Card";
import { APP_ROUTE } from "src/helpers/Constant";
import { useFetchUserQuery } from "src/api/manageUserApi";
import { LoaderContainer } from "src/components/LoaderContainer";

export default function UserProfile() {
	const { slicedPath } = useCustomLocation();
	const id = slicedPath[2];
	const userResult = useFetchUserQuery(id);

	const handleApiResponse = useMemo(() => {
		const result = userResult?.currentData?.user ?? {};

		return {
			profile: {
				firstName: result.firstName,
				lastName: result.lastName,
				email: result.email,
				gender: result.gender,
				phoneNumber: result.phoneNumber,
			},
			profilePicture: result?.profilePicture?.url,
		};
	}, [userResult]);

	const [showCard, setShowCard] = useState<boolean>(true);

	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: User,
			name: "View Profile",
			link: APP_ROUTE.USER_PROFILE,
		},
	];

	return (
		<section>
			<article className="w-full h-screen px-2">
				<LoaderContainer data={userResult}>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
						<>
							{HQData.map((dt) => (
								<Fragment>
									<CardButton
										name={dt.name}
										icon={dt.icon}
										link={dt.link}
										height={"98px"}
										activeBtn={"View Profile"}
										showCard={showCard}
									/>
								</Fragment>
							))}
						</>
					</div>

					{showCard ? (
						<ProfileCard
							showBanner={false}
							data={handleApiResponse?.profile || {}}
							imageURL={handleApiResponse?.profilePicture || ""}
							showImage={true}
						/>
					) : null}
				</LoaderContainer>
			</article>
		</section>
	);
}
