import React, { Fragment, useMemo, useState } from "react";
import AdminProfile from "src/assets/img/AdminProfile.svg";
import ManageWebsite from "src/assets/img/ManageWebsite.svg";
import ManageAdmins from "src/assets/img/ManageAdmin.svg";
import ResetPasword from "src/assets/img/ResetPasword.svg";
import { CardButton } from "src/components/Card";
import { cardBtnType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";
import { useGetAdminQuery } from "src/api/setttingsApislice";
import ProfileCard from "src/components/ProfileCard";
import ManageAdmin from "./ManageAdmin";
import { LoaderContainer } from "src/components/LoaderContainer";

const Settings = () => {
	const [cardName, setName] = useState<string>("profile");
	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: AdminProfile,
			name: "Profile",
			link: APP_ROUTE.ADMIN_PROFILE,
		},

		{
			id: 2,
			icon: ManageAdmins,
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

	const adminResult = useGetAdminQuery("");

	const handledAPIResponse = useMemo(() => {
		const hqProfile = adminResult?.data?.data?.data[0];

		return {
			firstName: hqProfile?.firstName,
			lastName: hqProfile?.lastName,
			email: hqProfile?.email,
			role: hqProfile?.role,
			phoneNumber: hqProfile?.phoneNumber,
		};
	}, [adminResult]);

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
									onClick={() => setName(dt.name)}
								/>
							</Fragment>
						))}
					</>
				</div>
				<LoaderContainer data={adminResult}>
					{cardName.toLowerCase() === "profile" ? (
						<ProfileCard
							showBanner={false}
							data={handledAPIResponse || {}}
							imageURL=""
							showImage={true}
						/>
					) : null}
					{cardName.toLowerCase() === "manage admin" ? <ManageAdmin /> : null}
				</LoaderContainer>
			</article>
		</section>
	);
};

export default Settings;
