import { Fragment } from "react";
import { CardButton } from "src/components/Card";
import ProfileCard from "src/components/ProfileCard";
import useCustomLocation from "src/hooks/useCustomLocation";
import React, { useState } from "react";
import AdminProfile from "src/assets/img/AdminProfile.svg";
import { cardBtnType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Constant";

const HQData: cardBtnType[] = [
	{
		id: 1,
		icon: AdminProfile,
		name: "Profile",
		link: APP_ROUTE.ADMIN_PROFILE,
	},
];

const SingleAdmin = () => {
	const [cardName] = useState<string>("profile");
	const { routePath } = useCustomLocation();
	const { id, ...rest } = routePath?.data;

	return (
		<section>
			<article>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					<>
						{HQData.map((dt) => (
							<Fragment>
								<CardButton
									name="Profile"
									icon={dt.icon}
									link={dt.link}
									activeBtn={cardName}
									height={"98px"}
								/>
							</Fragment>
						))}
					</>
				</div>
				;
				<ProfileCard showBanner={false} data={rest || {}} flag={true} />
			</article>
		</section>
	);
};

export default SingleAdmin;
