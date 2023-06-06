import { BarChartComp, Chart } from "src/components/Chart";
import { cardData, data, datas } from "src/helpers/data";
import { Fragment } from "react";
import { CardButton, DashboardCards } from "src/components/Card";
import branchBtn from "src/assets/img/branchbtn.svg";
import walletBtn from "src/assets/img/walletbtn.svg";
import { cardBtnType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Constant";

const Dashboard = () => {
	const cardBtnData: cardBtnType[] = [
		{
			id: 1,
			icon: branchBtn,
			name: "Branches",
			link: APP_ROUTE.BRANCHES,
		},
		{
			id: 2,
			icon: walletBtn,
			name: "View Wallet",
			link: APP_ROUTE.VIEW_WALLET,
		},
	];

	return (
		<section>
			{/* <LoaderContainer /> */}
			<article className="w-full h-full flex flex-col justify-between overflow-y-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-2 py-3">
					<div className="h-full">
						<div className="h-[432px] bg-white flex flex-col justify-between  shadow-md rounded-2xl p-6">
							<div>
								<div>
									<h1 className="text-start text-[18px] font-bold text-[#252733]">
										Transaction trend
									</h1>
								</div>
								<div className="w-full flex justify-between">
									<p className="text-[12px] text-[#9FA2B4]">30 Sept 2021</p>
									<div className="flex items-center">
										<div className="flex items-center mx-2">
											<span className="inline-block w-[19px] h-0.5 rounded-lg bg-[#002E66]"></span>
											<p className="text-[#9FA2B4] text-[12px] ml-2">Today</p>
										</div>
										<div className="flex items-center">
											<span className="inline-block w-[19px] h-0.5 rounded-lg bg-[#DFE0EB]"></span>
											<p className="text-[#9FA2B4] text-[12px] ml-2">
												Yesterday
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full h-full">
								<Chart height={0} width={0} data={data} />
							</div>
						</div>
					</div>
					<div className="h-full px-4 pb-4">
						<div className="h-[420px] grid grid-cols-2 gap-4 ">
							{cardData.map((dt) => (
								<Fragment>
									<DashboardCards
										name={dt.name}
										icon={dt.icon}
										amount={dt.amount}
									/>
								</Fragment>
							))}
							{cardBtnData.map((dt) => (
								<Fragment>
									<CardButton
										name={dt.name}
										icon={dt.icon}
										link={dt.link}
										height={"134px"}
									/>
								</Fragment>
							))}
						</div>
					</div>
				</div>

				<div className="h-[18rem] w-full pt-4 ">
					<BarChartComp data={datas} />
				</div>
			</article>
		</section>
	);
};

export default Dashboard;
