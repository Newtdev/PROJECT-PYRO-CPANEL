import { ReactElement } from "react";
import EnhancedTable from "src/components/Table";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button } from "src/components/Button";
import BranchWallet from "src/assets/img/BranchWallet.svg";
import HQWallet from "src/assets/img/HQWallet.svg";
import UserWallet from "src/assets/img/UserWallet.svg";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import { CardButton } from "src/components/Card";
import { cardBtnType } from "src/helpers/alias";
import { APP_ROUTE } from "src/helpers/Routes";

interface Data {
	id: string | number;
	name?: string;
	branch?: number | string;
	category?: string;
	flag?: string | ReactElement;
}
const rows: Data[] | null = [
	{
		id: 1,
		name: "Aliko Petroleaum",
		branch: 305,
		category: "Disel",
	},
	{
		id: 2,
		name: "A Y M Shafa",
		branch: 305,
		category: "Disel",
	},
	{
		id: 3,
		name: "Nigerian National Petroleum Commission",
		branch: 305,
		category: "Disel",
	},
	{
		id: 4,
		name: "NNPC",
		branch: 705,
		category: "Petrol",
	},
	{
		id: 5,
		name: "Nai",
		branch: 705,
		category: "Kerosene",
	},
	{
		id: 6,
		name: "Nae",
		branch: 705,
		category: "Kerosene",
	},
	{
		id: 7,
		name: "Naes",
		branch: 75,
		category: "Kerosene",
	},
	{
		id: 8,
		name: "Naess",
		branch: 759,
		category: "Kerosene",
	},
	{
		id: 9,
		name: "Naesss",
		branch: 759,
		category: "Kerosene",
	},

	// { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
];

interface HeadCell {
	id: keyof Data;
	label: string | ReactElement;
	minWidth: number;
}

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		minWidth: 170,
		label: "Name",
	},
	{
		id: "branch",
		minWidth: 170,
		label: "Branches",
	},
	{
		id: "category",
		minWidth: 170,
		label: "Category",
	},
];

const Transactions = () => {
	const [value, setValue] = React.useState<string>("one");
	const navigate = useNavigate();

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(rows);

	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// TABLE FILTER TAB
	const tabData: { id: string | number; value: string; label: string }[] = [
		{ id: 1, value: "one", label: "All" },
		{ id: 1, value: "two", label: "Most popular" },
	];
	function fn(data: { [index: string]: string | number }) {
		navigate(`/manageHQ/${data?.name}`, { state: data?.name });
	}

	const HQData: cardBtnType[] = [
		{
			id: 1,
			icon: HQWallet,
			name: "HQ Wallet",
			link: APP_ROUTE.BRANCHES,
		},

		{
			id: 2,
			icon: BranchWallet,
			name: "Branch Wallet",
			link: `/view/wallet`,
		},
		{
			id: 3,
			icon: UserWallet,
			name: "User Wallet",
			link: `/view/branch`,
		},
	];

	let dataToChildren: any = {
		rows,
		headCells,
		handleRowClick,
		showFlag: false,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
	};

	return (
		<section>
			<article>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					<>
						{HQData.map((dt) => (
							<CardButton
								name={dt.name}
								icon={dt.icon}
								link={dt.link}
								height={"98px"}
								// onClick={() => {
								// 	if (
								// 		dt.name.toString().toLocaleLowerCase() === "view profile"
								// 	) {
								// 		setShowCard(!showCard);
								// 	} else {
								// 		navigate(dt.link, { state: dt.name });
								// 	}
								// }}
								// showCard={showCard}
							/>
						))}
					</>
				</div>
				<div className="flex justify-between items-center mt-6 h-20">
					<div className="w-fit flex items-center">
						<div className="w-[109px]  h-11">
							<Button
								text="Export"
								className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
								type="button"
								showIcon={false}
								onClick={() => console.log("add branch")}
							/>
						</div>
					</div>
				</div>
				<div className="h-fit w-full">
					<div className="h-full w-full flex justify-between items-center py-6 shadow-lg rounded-t-lg bg-white">
						<div>
							<Box sx={{ width: "100%" }}>
								<Tabs
									value={value}
									onChange={handleChange}
									textColor="secondary"
									indicatorColor="secondary"
									className="px-4"
									aria-label="secondary tabs example">
									{tabData?.map((dt) => {
										return (
											<Tab
												sx={{
													fontSize: 14,
												}}
												key={dt.id}
												value={dt.value}
												label={dt.label}
											/>
										);
									})}
								</Tabs>
							</Box>
						</div>
					</div>
					<div className="relative">
						<EnhancedTable {...dataToChildren} />
					</div>
				</div>
			</article>
		</section>
	);
};

export default Transactions;
