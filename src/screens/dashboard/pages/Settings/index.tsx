import React, { Fragment } from "react";
import AdminProfile from "src/assets/img/AdminProfile.svg";
import ManageWebsite from "src/assets/img/ManageWebsite.svg";
import ManageAdmin from "src/assets/img/ManageAdmin.svg";
import ResetPasword from "src/assets/img/ResetPasword.svg";

import { useNavigate } from "react-router-dom";

import { CardButton } from "src/components/Card";
import { cardBtnType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";

const Settings = () => {
	const navigate = useNavigate();
	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: AdminProfile,
			name: "Profile",
			link: APP_ROUTE.ADMIN_PROFILE,
		},

		{
			id: 2,
			icon: ManageAdmin,
			name: "Manage Admin",
			link: APP_ROUTE.MANAGE_ADMIN,
		},
		{
			id: 3,
			icon: ManageWebsite,
			name: "Manage Website",
			link: APP_ROUTE.MANAGE_WEBSITE,
		},
		{
			id: 4,
			icon: ResetPasword,
			name: "Reset Password",
			link: APP_ROUTE.RESET_PASSWORD,
		},
	];

	return (
		<section>
			<article>
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
										navigate(dt.link, { state: dt.name });
									}}
								/>
							</Fragment>
						))}
					</>
				</div>
			</article>
		</section>
	);
};

export default Settings;
