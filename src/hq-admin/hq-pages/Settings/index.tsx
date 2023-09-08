import React, { Fragment, useMemo, useState } from "react";
import { cardBtnType } from "src/helpers/alias";
import { useAuth } from "src/hooks/useAuth";
import AdminProfile from "src/assets/img/AdminProfile.svg";
import ResetPasword from "src/assets/img/ResetPasword.svg";
import { CardButton } from "src/components/Card";
import ProfileCard from "src/components/ProfileCard";
import { ResetAdminInfo, ResetPassword } from "./Component";
import { FormModal } from "src/components/ModalComp";

export default function HqSetting() {
	const { user } = useAuth();

	const [cardName, setName] = useState<string>("profile");

	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: AdminProfile,
			name: "Profile",
		},
		{
			id: 4,
			icon: ResetPasword,
			name: "Update Profile",
		},
		{
			id: 4,
			icon: ResetPasword,
			name: "Update Password",
		},
	];

	const handledAPIResponse = useMemo(() => {
		return {
			profile: {
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email,
				role: user?.role,
				phoneNumber: user?.phoneNumber,
			},
			avatar: user?.avatar?.url,
			id: user?.id,
		};
	}, [user]);

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
									activeBtn={cardName}
									height={"98px"}
									onClick={() => setName(dt.name)}
								/>
							</Fragment>
						))}
					</>
				</div>

				{cardName.toLowerCase() === "profile" ? (
					<ProfileCard
						showBanner={false}
						data={handledAPIResponse?.profile || {}}
						showImage={true}
						imageURL={handledAPIResponse.avatar}
					/>
				) : null}
				{cardName.toLowerCase() === "update profile" ? (
					<FormModal name="Update Settings" onClick={() => setName("profile")}>
						<ResetAdminInfo
							data={handledAPIResponse}
							close={() => setName("profile")}
						/>
					</FormModal>
				) : null}
				{cardName.toLowerCase() === "update password" ? (
					<FormModal name="Update Password" onClick={() => setName("profile")}>
						<ResetPassword
							data={handledAPIResponse}
							close={() => setName("profile")}
						/>
					</FormModal>
				) : null}
			</article>
		</section>
	);
}
