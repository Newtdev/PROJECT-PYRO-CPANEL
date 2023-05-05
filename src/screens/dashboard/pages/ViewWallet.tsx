import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "src/components/inputs";
import EnhancedTable from "src/components/Table";
import { Data } from "src/helpers/alias";
import { CurrencyFormatter } from "src/helpers/helperFunction";
import { DropDownComponent } from "../layout/main";

export interface HeadCellTypes {
	id: keyof Data;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement | any;
	referenceId?: string | number;
}

const rows: Data[] | null = [
	{
		id: 1,
		amount: CurrencyFormatter(200000),
		type: "Transfer",
		status: <p className="text-yellow-500">Pending</p>,
		referenceId: "683928724647",
	},
	{
		id: 2,
		amount: CurrencyFormatter(200000),
		type: "Withdrawal",
		status: <p className="text-green-500">Successful</p>,
		referenceId: "683928724647",
	},
	{
		id: 3,
		amount: CurrencyFormatter(200000),
		type: "Transfer",
		status: <p className="text-yellow-500">Pending</p>,
		referenceId: "683928724647",
	},
	{
		id: 4,
		amount: CurrencyFormatter(200000),
		type: "Deposits",
		status: <p className="text-red-500">Failed</p>,
		referenceId: "683928724647",
	},
];

const addCellToRow = (): Data[] => {
	return rows?.map((dt) => {
		return {
			...dt,
			status: (
				<p
					className={`${
						dt?.status?.toString().toLowerCase() === "pending"
							? "text-yellow-500"
							: dt?.status?.toString().toLowerCase() === "successful"
							? "text-green-500"
							: "text-red-500"
					}`}>
					{dt.status}
				</p>
			),
		};
	});
};

const headCells: readonly HeadCellTypes[] = [
	{
		id: "amount",
		minWidth: 170,
		label: "Transaction Amount (N)",
	},
	{
		id: "type",
		minWidth: 170,
		label: "Type",
	},
	{
		id: "status",
		minWidth: 170,
		label: "Status",
	},
	{
		id: "referenceId",
		minWidth: 170,
		label: "Reference Id",
	},
];

export default function ViewWallet() {
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [value, setValue] = React.useState<string>("one");
	const [showModal, setShowModal] = useState<boolean>(false);
	const [filteredValue, setFilteredValue] = useState<string>("");
	const navigate = useNavigate();
	// console.log(filteredValue);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// TABLE FILTER TAB
	const tabData: { id: string | number; value: string; label: string }[] = [
		{ id: 1, value: "one", label: "Recent Transactions" },
	];

	// CLICKING ON THE ROW OF A TABLE
	const handleRowClick = (
		event: React.MouseEvent<HTMLElement>,
		name: any
	): void => {
		if (event.currentTarget) {
			if (event.currentTarget.textContent === "") setShowModal(!showModal);
			else navigate(`/branch/${name}`, { state: name });

			// TODO: make API request to handle submission
			// for single and multiple
		}
	};

	// SELECT ALL THE ROWS ON THE FUNCTION
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows?.map((n: any) => n.name) as any;
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	// SELECT A SINGLE ROW ON TABLE
	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	// CONFIRMATION OF WHAT IS SELECTED
	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	console.log(addCellToRow);
	let dataToChildren: any = {
		rows: addCellToRow(),
		headCells,
		handleRowClick,
		showFlag: false,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
	};

	return (
		<section className="h-screen w-full">
			<article className="w-full">
				<div className="w-full flex gap-6 flex-row">
					<BalanceCard />
					<InflowCard />
				</div>
				<div className="h-fit w-full bg-white mt-6">
					<div className="h-full w-full flex justify-between items-center py-6 shadow-lg rounded-t-lg px-3">
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

						<div className="flex w-[30%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
							<SearchInput
								name="branch-search"
								placeholder="Search for names, branches, category"
								value={filteredValue}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const target = e.target;
									setFilteredValue(target.value);
								}}
							/>
						</div>
					</div>
					<div className="relative">
						<EnhancedTable {...dataToChildren} />
					</div>

					{/* FLAG A HQ */}
				</div>
			</article>
		</section>
	);
}

const BalanceCard = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShowPassword(() => !showPassword);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<div className="bg-[#636685] h-[152px] w-[50%] max-w-[442px] rounded-[20px]">
			<div className="flex flex-row p-6 items-center h-full">
				<div className="text-start overflow-auto basis-[70%] text-white pl-4 ">
					{showPassword ? (
						<h2 className="text-[40px] font-bold">
							{CurrencyFormatter(12390000)}
						</h2>
					) : (
						<p className="text-[40px] font-bold">**********</p>
					)}

					<h3 className="text-[20px] font-bold">Balance</h3>
				</div>
				<div className=" basis-[30%]">
					<IconButton
						size="large"
						aria-label="toggle password visibility"
						onClick={handleClickShowPassword}
						sx={{ color: "white" }}
						onMouseDown={handleMouseDownPassword}
						edge="end">
						{showPassword ? (
							<VisibilityOff fontSize="medium" color="inherit" />
						) : (
							<Visibility fontSize="medium" />
						)}
					</IconButton>
				</div>
			</div>
		</div>
	);
};

const InflowCard = () => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectText, setSelectedText] = useState<string>("This month");

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<div className="h-[128px] basis-[60%] rounded-[10px] bg-white grid grid-cols-3 gap-x-10 justify-items-center content-center mt-3 pl-6">
			<div className="text-start text-[#002E66]">
				<h3 className="text-[14px]">Inflow</h3>
				<h2 className="text-[24px] font-bold">{CurrencyFormatter(12390000)}</h2>
			</div>
			<div className="text-start text-[#002E66]">
				<h3 className="text-[14px] font-bold">Outflow</h3>
				<h2 className="text-[24px] font-bold">{CurrencyFormatter(12390000)}</h2>
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
						{/* <div className="text-start p-4  transition-all hover:bg-[#D9D9D9] hover:scale-[1.1]">
							<p>This Month</p>
						</div> */}
						{/* <Button /> */}
					</div>
				</DropDownComponent>
			</div>
		</div>
	);
};
