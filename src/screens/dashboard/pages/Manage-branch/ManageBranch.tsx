import React, { useMemo, useState } from "react";
import { SearchInput } from "src/components/inputs";
import EnhancedTable from "src/components/Table";

import { Button } from "src/components/Button";
import { FlagModal, Modal } from "src/components/ModalComp";

import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import {
	useExportAllBranchQuery,
	useFetchAllBranchQuery,
} from "src/api/manageBranchAPISlice";
import { TableLoader } from "src/components/LoaderContainer";
import { useDebounce } from "src/hooks/useDebounce";
import { ManageBranchType } from "src/helpers/alias";
import { CSVLink } from "react-csv";

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

// ADD NEW BRANCH COMPONENTS
const ManageBranch = () => {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const { debouncedValue } = useDebounce(filteredValue, 700);
	const [pagination, setPagination] = useState({ newPage: 1 });

	const fetchAllBranchResult = useFetchAllBranchQuery({
		query: debouncedValue,
		page: pagination.newPage,
	});

	const exportBranchResult = useExportAllBranchQuery({});

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	const handledAPIResponse = useMemo(() => {
		const response = fetchAllBranchResult?.data;
		const normalizedAPIResponse = response?.stationBranches?.data?.reduce(
			(acc: ManageBranchType[], cur: ManageBranchType) => [
				...acc,
				{
					id: cur?.id,
					name: cur?.name,
					phoneNumber: cur?.phoneNumber,
					status: cur?.status,
					lga: cur?.location?.lga,
					address: cur?.location?.address,
					latitude: cur?.location?.latitude,
					longitude: cur?.location?.longitude,
					state: cur?.location?.state,
				},
			],
			[]
		);
		return { normalizedAPIResponse, response };
	}, [fetchAllBranchResult]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const navigate = useNavigate();

	// TABLE FILTER TAB

	function fn(data: { [index: string]: string | number }) {
		navigate(`/manage-branch/${data?.id}`, { state: data.name });
	}

	// CONFIRMATION OF WHAT IS SELECTED

	let dataToChildren: { [index: string]: string | number | any } = {
		rows: handledAPIResponse?.normalizedAPIResponse || [],
		headCells,
		handleRowClick,
		showFlag: true,
		showCheckBox: true,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
		handleChangePage,
		paginationData: {
			totalPage: handledAPIResponse?.response?.stationBranches?.totalPages,
			limit: handledAPIResponse?.response?.stationBranches?.limit,
			page: handledAPIResponse?.response?.stationBranches?.page,
		},
	};

	// HANDLE EXPORTING OF DATA

	const handleExportData = useMemo(
		() => exportBranchResult?.currentData,
		[exportBranchResult]
	);

	return (
		<section>
			<article>
				<div className="flex justify-between items-center mt-6 h-20">
					<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
						<SearchInput
							name="branch-search"
							placeholder="Search"
							value={filteredValue}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const target = e.target;
								setFilteredValue(target.value);
							}}
						/>
					</div>
					<div className="w-fit flex items-center">
						<div className="w-[109px] h-11">
							<CSVLink filename="Branch_data.csv" data={handleExportData ?? []}>
								<Button
									text="Export"
									className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
									type="button"
									showIcon={false}
									onClick={() => console.log("add branch")}
								/>
							</CSVLink>
						</div>
					</div>
				</div>
				<div className="h-fit bg-white w-full">
					<TableLoader
						data={fetchAllBranchResult}
						tableData={handledAPIResponse?.normalizedAPIResponse || []}>
						<div className="h-full w-full">
							<div className="relative">
								<EnhancedTable {...dataToChildren} />
							</div>
						</div>
					</TableLoader>

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

export default ManageBranch;
