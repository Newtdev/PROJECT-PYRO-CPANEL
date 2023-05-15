import { ChangeEventHandler, ReactElement } from "react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { Data } from "src/helpers/alias";
import { SearchInput } from "src/components/inputs";
import { FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface HeadCellTypes {
	id: keyof Data;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement | any;
	referenceId?: string | number;
	doneby?: string;
}

const rows: Data[] = [
	{
		id: 1,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 2,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 3,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 4,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 5,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 6,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 7,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 8,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 9,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 10,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
	{
		id: 12,
		name: "John Wick",

		usage: "Frequently",
		lastUsed: new Date().getTime().toString(),
	},
];

const headCells: readonly HeadCellTypes[] = [
	{
		id: "name",
		minWidth: 170,
		label: "Name",
	},
	{
		id: "usage",
		minWidth: 170,
		label: "Usage Frequency",
	},
	{
		id: "lastUsed",
		minWidth: 170,
		label: "Last Used",
	},
];

type SelectType = {
	id: string | number;
	value: string;
	label: string;
	[x: string]: any;
};

const SelectInput = (props: {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	filteredValue: string;
	tabData: SelectType[];
}): ReactElement => {
	return (
		<div className="border border-gray-200 rounded-lg px-2">
			<FilterList />
			<select
				className="w-36 py-2 px-4 bg-transparent"
				value={props.filteredValue}
				onChange={props.onChange}>
				<option value={""}>Filter</option>
				{props?.tabData?.map((dt: SelectType) => (
					<option key={dt.id} value={dt?.value.trim()}>
						{dt?.label.trim()}
					</option>
				))}
			</select>
		</div>
	);
};

const Transactions = () => {
	const { handleRowClick } = useHandleRowClick(fn);
	const navigate = useNavigate();

	function fn(data: { [index: string]: string | number }) {
		navigate(`/user/${data.name}`, { state: data?.name });
	}
	const [searchValue, setSearchValue] = useState<string>("");
	const [filteredValue, setFilteredValue] = useState<string>("");

	const handleSelectChange = (event: { target: { value: string } }) => {
		setFilteredValue(event.target.value);
	};

	// TABLE FILTER TAB
	const tabData: SelectType[] = [
		{ id: 1, value: "All", label: "All" },
		{ id: 2, value: "New", label: "New Registered" },
	];

	const props = {
		rows,
		headCells,
		handleRowClick,
		accountInformation: {
			balance: 0,
			amountIn: 0,
			amountOut: 0,
		},
	};
	return (
		<section>
			<article>
				<div className=" mt-6 h-20">
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
					<div className="h-full w-full bg-white mt-6 shadow-lg rounded-t-lg">
						<div className="h-full w-full flex justify-between items-center py-6 px-6">
							<div>
								<SelectInput
									tabData={tabData}
									filteredValue={filteredValue}
									onChange={handleSelectChange}
								/>
							</div>

							<div className="flex w-[30%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
								<SearchInput
									name="branch-search"
									placeholder="Search for Branch, HQ, User"
									value={searchValue}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										const target = e.target;
										setSearchValue(target.value);
									}}
								/>
							</div>
						</div>
						<ViewWalletComp {...props} />
					</div>
				</div>
			</article>
		</section>
	);
};

export default Transactions;
