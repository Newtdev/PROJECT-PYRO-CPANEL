import { Flag } from "@mui/icons-material";
import React, { useMemo } from "react";
import EnhancedTable from "src/components/Table";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button } from "src/components/Button";
import { FlagModal, Modal } from "src/components/ModalComp";
import { stringOrNumber } from "src/helpers/alias";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";

// TABLE HEADER TYPES
export interface HeadCellTypes {
	id: string;

	label: string;
	numeric?: boolean | null;
	minWidth: number;
}

// TABLE HEADER DETAILS
const headCells: readonly HeadCellTypes[] = [
	{
		id: "name",
		minWidth: 170,
		label: "Name",
	},
	{
		id: "phoneNumber",
		minWidth: 170,
		label: "Contact info",
	},
	{
		id: "address",
		minWidth: 170,
		label: "Address",
	},
	{
		id: "lga",
		minWidth: 170,
		label: "LGA",
	},
	{
		id: "latitude",
		minWidth: 170,
		label: "Latitude",
	},
	{
		id: "longitude",
		minWidth: 170,
		label: "Longitude",
	},
	{
		id: "state",
		minWidth: 170,
		label: "State",
	},
	{
		id: "status",
		minWidth: 170,
		label: "Status",
	},
];

interface HqBranchType {
	[x: string]: string | number | any;
	id: string;
	name: string;
	phoneNumber: string;
	status: "Active" | "Closed";

	lga: string;
	latitude: stringOrNumber;
	longitude: stringOrNumber;
	state: string;
	address: string;
	location?: {
		[index: string]: string | any;
	};
}

// ADD NEW BRANCH COMPONENTS
const HqBranch = (props: { branchInfo: HqBranchType[] }) => {
	const [value, setValue] = React.useState<string>("one");

	const handledAPIResponse = useMemo(() => {
		// let neededData: HqBranchType[] = [];
		const hqProfile = props?.branchInfo;
		return hqProfile?.reduce(
			(acc: HqBranchType[], cur: HqBranchType) => [
				...acc,
				{
					id: cur._id,
					name: cur.name,
					phoneNumber: cur.phoneNumber,
					status: cur.status,
					lga: cur?.location?.lga,
					address: cur.location?.address,
					latitude: cur.location?.latitude,
					longitude: cur.location?.longitude,
					state: cur.location?.state,
				},
			],
			[]
		);
	}, [props]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const navigate = useNavigate();

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// TABLE FILTER TAB
	const tabData: { id: string | number; value: string; label: string }[] = [
		{ id: 1, value: "one", label: "All" },
		{ id: 1, value: "two", label: "Most popular" },
	];

	function fn(data: { [index: string]: string | number }) {
		navigate(`/manageBranch/${data?.id}`, { state: data.name });
	}

	// CONFIRMATION OF WHAT IS SELECTED
	// const isSelected = (data: string) => selected.indexOf(name) !== -1;

	let dataToChildren: { [index: string]: string | number | any } = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick,
		showFlag: true,
		showCheckBox: true,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
	};

	return (
		<section>
			<article>
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
				<div className="h-fit bg-white w-full">
					<div className="h-full w-full">
						<div className="h-full w-full flex justify-between items-center py-6 shadow-lg rounded-t-lg ">
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
							<div className=" flex justify-end items-center h-11 text-sm pr-12 cursor-pointer">
								<Flag
									color="error"
									fontSize="large"
									onClick={() => setShowModal(true)}
								/>
							</div>
						</div>
						<div className="relative">
							<EnhancedTable {...dataToChildren} />
						</div>
					</div>

					{/* FLAG A HQ */}
					{showModal && (
						<Modal styles="absolute right-10 top-56">
							<FlagModal
								info="Are you sure you want to flag?"
								onClose={() => setShowModal(false)}
								onConfirmation={() => console.log(selected)}
							/>
						</Modal>
					)}
				</div>
			</article>
		</section>
	);
};

export default HqBranch;
