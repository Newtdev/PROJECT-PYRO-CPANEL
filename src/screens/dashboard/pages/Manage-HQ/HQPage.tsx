import React, { Fragment, useMemo, useState } from "react";
import { cardBtnType } from "src/helpers/alias";
import walletBtn from "src/assets/img/walletbtn.svg";
import User from "src/assets/img/User.svg";
import Attendant from "src/assets/img/Attendanticon.svg";
import { CardButton } from "src/components/Card";
import ProfileCard from "src/components/ProfileCard";
import useCustomLocation from "src/hooks/useCustomLocation";
import { useFetchSingleHQQuery } from "src/api/manageHQApiSlice";
import { LoaderContainer } from "src/components/LoaderContainer";
import HqBranch from "./HqBranch";

export default function HQPage() {
	const { routePath } = useCustomLocation();

	const [cardName, setCardName] = useState<string>("view profile");

	const singleHqResult = useFetchSingleHQQuery(routePath?.id);
	console.log("single hq result", singleHqResult);
	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: User,
			name: "View Profile",
		},

		{
			id: 2,
			icon: walletBtn,
			name: "Admin Info",
		},
		{
			id: 3,
			icon: Attendant,
			name: "Branches",
		},
	];

	const handledAPIResponse = useMemo(() => {
		const singleResult = singleHqResult?.currentData?.hqProfile || {};

		return {
			hqInfo: {
				name: singleResult.name,
				email: singleResult.email,
				hqAddress: singleResult.hqAddress,
				state: singleResult.state,
				phoneNumber: singleResult.phoneNumber,
				totalBranches: singleResult.totalBranches,
				status: singleResult.status?.status,
			},
			hqUsers: singleResult?.hqUsers,
			stationBranch: singleResult?.stationBranches,
		};
	}, [singleHqResult]);

	interface AdminInfoType {
		[index: string]: string | number;
	}

	const handleAdminInfo = (data: AdminInfoType) => {
		return (
			{
				firstName: data.firstName,
				lastName: data?.lastName,
				email: data?.email,
				role: data?.role,
				phoneNumber: data?.phoneNumber,
			} || {}
		);
	};

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
									activeBtn={cardName}
									onClick={() => setCardName(dt?.name)}
									// showCard={cardName}
								/>
							</Fragment>
						))}
					</>
				</div>
				<LoaderContainer data={singleHqResult}>
					{cardName.toLowerCase() === "view profile" ? (
						<ProfileCard
							showBanner={false}
							data={handledAPIResponse?.hqInfo || {}}
							imageURL=""
							showImage={false}
						/>
					) : null}
					{cardName.toLowerCase() === "admin info" ? (
						<>
							<ProfileCard
								showBanner={false}
								showHeader={true}
								header="HQ Admin Information"
								data={handleAdminInfo(handledAPIResponse?.hqUsers[0]) || {}}
								imageURL=""
								showImage={false}
							/>
						</>
					) : null}
					{cardName.toLowerCase() === "branches" ? (
						<HqBranch branchInfo={handledAPIResponse?.stationBranch || []} />
					) : null}
				</LoaderContainer>
			</article>
		</section>
	);
}
