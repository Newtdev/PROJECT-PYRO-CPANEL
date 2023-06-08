// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { ReactElement, useState } from "react";

import EnhancedTable from "src/components/Table";
import { Data, TransactionsType } from "src/helpers/alias";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import { DropDownComponent } from "src/screens/dashboard/layout/Main";

type TabType = { id: string | number; value: string; label: string };

export interface HeadCellTypes {
	id: string;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement | any;
	referenceId?: string | number;
}

interface WalletProps {
	rows: any;
	headCells: readonly HeadCellTypes[];
	showCard?: boolean;
	tabData?: TabType[];
	handleRowClick: (
		e: React.MouseEvent<HTMLElement>,
		name: { [index: string]: string | number }
	) => void;
	accountInformation: {
		balance: number;
		amountIn: number;
		amountOut: number;
	};
	paginationData: { totalPage: number; limit: number; page: number };
	handleChangePage: (event: unknown, newPage: number) => void;
}

export default function ViewWalletComp(props: WalletProps) {
	const [selected, setSelected] = React.useState<readonly string[]>([]);

	// TABLE FILTER TAB

	// CONFIRMATION OF WHAT IS SELECTED
	const isSelected = (data: string) => selected.indexOf(data) !== -1;

	let dataToChildren: any = {
		rows: props.rows,
		headCells: props.headCells,
		handleRowClick: props.handleRowClick,
		showFlag: false,
		isSelected,
		handleChangePage: props.handleChangePage,
		// handleClick,
		// handleSelectAllClick,
		selected,
		paginationData: props.paginationData,
	};

	return (
		<section className="h-full w-full">
			<article className="w-full">
				{props.showCard ? (
					<div className="w-full flex flex-col gap-6 lg:flex-row">
						{/* <BalanceCard {...props.accountInformation} /> */}
						<InflowCard {...props.accountInformation} />
					</div>
				) : null}
				<div className="h-fit w-full">
					<div>
						<EnhancedTable {...dataToChildren} />
					</div>

					{/* FLAG A HQ */}
				</div>
			</article>
		</section>
	);
}

// export const BalanceCard = (props: { balance: number }) => {
// 	const [showPassword, setShowPassword] = useState<boolean>(false);

// 	const handleClickShowPassword = () => {
// 		setShowPassword(() => !showPassword);
// 	};

// 	const handleMouseDownPassword = (
// 		event: React.MouseEvent<HTMLButtonElement>
// 	) => {
// 		event.preventDefault();
// 	};

// 	return (
// 		<div className="bg-[#636685] h-[152px] w-[50%] max-w-[442px] rounded-[20px]">
// 			<div className="flex flex-row p-6 items-center h-full">
// 				<div className="text-start overflow-auto basis-[70%] text-white pl-4 ">
// 					{showPassword ? (
// 						<h2 className="text-[40px] font-bold">
// 							{CurrencyFormatter(Number(props?.balance))}
// 						</h2>
// 					) : (
// 						<p className="text-[40px] font-bold">**********</p>
// 					)}

// 					<h3 className="text-[20px] font-bold">Balance</h3>
// 				</div>
// 				<div className=" basis-[30%]">
// 					<IconButton
// 						size="large"
// 						aria-label="toggle password visibility"
// 						onClick={handleClickShowPassword}
// 						sx={{ color: "white" }}
// 						onMouseDown={handleMouseDownPassword}
// 						edge="end">
// 						{showPassword ? (
// 							<VisibilityOff fontSize="medium" color="inherit" />
// 						) : (
// 							<Visibility fontSize="medium" />
// 						)}
// 					</IconButton>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

export const InflowCard = (props: { amountIn: number; amountOut: number }) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectText, setSelectedText] = useState<string>("This month");

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<div className="h-[128px] basis-[60%] rounded-[10px] bg-white grid grid-cols-3 gap-x-10 justify-items-center content-center mt-3 pl-6">
			<div className="text-start text-[#002E66]">
				<h3 className="text-[14px]">Inflow</h3>
				<h2 className="text-[24px] font-bold">
					{CurrencyFormatter(props.amountIn)}
				</h2>
			</div>
			<div className="text-start text-[#002E66] ">
				<h3 className="text-[14px] font-bold">Outflow</h3>
				<h2 className="text-[24px] font-bold ">
					{CurrencyFormatter(props.amountOut)}
				</h2>
			</div>
			<div className="relative flex items-center h-full w-full ">
				<DropDownComponent
					expanded={expanded}
					handleExpandClick={handleExpandClick}
					text={selectText}>
					<div className="h-26 bg-white shadow-lg absolute right-0 top-14 w-44 text-[#393939]">
						<div className="text-start w-full py-2 transition-all hover:bg-[#D9D9D9] hover:scale-[1.1] p-4">
							{/* <Link to="/">View Profile</Link> */}
						</div>
						{["7 days", "This Month", "Last 60 days", "Last 90 days"].map(
							(d) => {
								return (
									<div
										className="text-start p-4  transition-all hover:bg-[#D9D9D9] hover:scale-[1.1]"
										onClick={() => {
											setSelectedText(d);
											handleExpandClick();
										}}>
										<p>{d}</p>
									</div>
								);
							}
						)}
					</div>
				</DropDownComponent>
			</div>
		</div>
	);
};
