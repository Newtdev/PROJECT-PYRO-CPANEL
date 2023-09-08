import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button";
import { SearchInput } from "src/components/inputs";
import { TableLoader } from "src/components/LoaderContainer";
import { FlagModal, FormModal, Modal } from "src/components/ModalComp";
import EnhancedTable from "src/components/Table";
import { FormType, ManageBranchType } from "src/helpers/alias";
import {
	CurrencyFormatter,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";

import { useAuth } from "src/hooks/useAuth";
import { useDebounce } from "src/hooks/useDebounce";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useIsSelected from "src/hooks/useIsSelected";
import {
	useAddHqNewBranchMutation,
	useExportHQBranchQuery,
	useFetchHQBranchQuery,
} from "src/hq-admin/hq-api/manageHqApiSlice";
import { AddNewBranch } from "./Components";

export interface HeadCellTypes {
	id: string;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
}

// TABLE HEADER DETAILS
const headCells: readonly HeadCellTypes[] = [
	{
		id: "date",
		minWidth: 170,
		label: "Date",
	},
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

const initialValues = {
	// stationHQ: routePath?.id,
	name: "",
	phoneNumber: "",
	location: {
		state: "",
		latitude: "",
		longitude: "",
		address: "",
	},
	branchManager: {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
	},
};

export default function ManageHQBranch() {
	const { user } = useAuth();
	const hqId = user?.stationHQ;
	const [filteredValue, setFilteredValue] = useState<string>("");
	const { debouncedValue } = useDebounce(filteredValue, 700);
	const [pagination, setPagination] = useState({ newPage: 1 });
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
	const [AddNewBranchRequest, addNewBranchResult] = useAddHqNewBranchMutation();

	const fetchAllBranchResult = useFetchHQBranchQuery(
		{
			hqId: hqId,
			query: debouncedValue,
			page: pagination.newPage,
		},
		{ skip: !hqId }
	);

	const exportBranchResult = useExportHQBranchQuery({});

	async function addNewBranchFunct(values: FormType) {
		try {
			const response = await AddNewBranchRequest(values).unwrap();
			if (response) {
				SuccessNotification(response?.data?.message);
				setShowAddModal(() => false);
			}
		} catch (error: any) {
			setShowAddModal(() => false);
			handleNotification(error);
		}
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	const handledAPIResponse = useMemo(() => {
		const response = fetchAllBranchResult?.data;
		const normalizedAPIResponse = response?.data?.data?.reduce(
			(acc: ManageBranchType[], cur: ManageBranchType) => [
				...acc,
				{
					id: cur?.id,
					created: format(new Date(cur.createdAt), "d/MM/yyyy"),
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
	const { handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const navigate = useNavigate();

	// TABLE FILTER TAB

	function fn(data: { [index: string]: string | number }) {
		navigate(`/manage-branch/${data?.id}`, { state: data.name });
	}

	let dataToChildren: { [index: string]: string | number | any } = {
		rows: handledAPIResponse?.normalizedAPIResponse || [],
		headCells,
		handleRowClick,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
		handleChangePage,
		paginationData: {
			totalPage: handledAPIResponse?.response?.totalPages,
			limit: handledAPIResponse?.response?.limit,
			page: handledAPIResponse?.response?.page,
		},
	};

	const handleExportData = useMemo(
		() => exportBranchResult?.currentData,
		[exportBranchResult]
	);

	//BRANCH REGISTERED IS MORE THAN FIVE(5)
	const handleAddMoreBranch = () => {
		if (handledAPIResponse?.normalizedAPIResponse?.length <= 5) {
			setShowAddModal(true);
		} else {
			setShowPremiumModal((prevState) => !prevState);
		}
	};

	return (
		<section>
			<article>
				<div className="flex justify-between items-center mt-6 h-20">
					<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
						<SearchInput
							name="branch-search"
							placeholder="Search for name"
							value={filteredValue}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const target = e.target;
								setFilteredValue(target.value);
							}}
						/>
					</div>
					<div className="w-fit flex items-center">
						<div className="w-[189px] h-11 mr-6">
							<Button
								text="Add Branch"
								className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-start pl-4"
								type="button"
								showIcon={true}
								onClick={handleAddMoreBranch}
							/>
						</div>
						<div className="w-[109px] h-11">
							<CSVLink filename="branch_data" data={handleExportData ?? []}>
								<Button
									text="Export"
									className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
									type="button"
									showIcon={false}
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
					{showPremiumModal && (
						<Modal>
							<FlagModal
								info="Sorry You have exceeded the number of branches you can add on the free mode!"
								onClose={() => setShowPremiumModal(false)}
								onConfirmation={() => console.log(selected)}
							/>
						</Modal>
					)}
					{showAddModal ? (
						<FormModal
							name="Add branch"
							onClick={() => setShowAddModal((prevState) => !prevState)}>
							<AddNewBranch
								initalValue={initialValues}
								makeApiRequest={(values: FormType) => addNewBranchFunct(values)}
								apiResult={addNewBranchResult}
							/>
						</FormModal>
					) : null}
				</div>
			</article>
		</section>
	);
}

// REQUEST TO WITHDRAW MODAL
