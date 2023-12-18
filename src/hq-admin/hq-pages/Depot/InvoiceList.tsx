import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useDepotInvoiceListQuery,
	useDepotRequestListQuery,
} from "src/api/manageBranchAPISlice";
import { SearchInput } from "src/components/inputs";
import { TableLoader } from "src/components/LoaderContainer";
import { FlagModal, Modal } from "src/components/ModalComp";
import EnhancedTable from "src/components/Table";
import { FormType } from "src/helpers/alias";
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
import { useAddHqNewBranchMutation } from "src/hq-admin/hq-api/manageHqApiSlice";

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
		id: "orderCode",
		minWidth: 170,
		label: "Order code",
	},
	{
		id: "totalAmount",
		minWidth: 170,
		label: "Total amount",
	},
	{
		id: "depotName",
		minWidth: 170,
		label: "Depot name",
	},
	{
		id: "depotPhoneNumber",
		minWidth: 170,
		label: "Depot phone number",
	},
	{
		id: "email",
		minWidth: 170,
		label: "Depot email",
	},

	{
		id: "status",
		minWidth: 170,
		label: "Status",
	},
];

export default function InvoiceList() {
	const { user } = useAuth();
	const hqId = user?.stationHQ;
	const [filteredValue, setFilteredValue] = useState<string>("");
	const { debouncedValue } = useDebounce(filteredValue, 700);
	const [pagination, setPagination] = useState({ newPage: 1 });
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
	const [AddNewBranchRequest, addNewBranchResult] = useAddHqNewBranchMutation();
	const getDepotInvoice = useDepotInvoiceListQuery({
		// q: debouncedValue,
		stationHq: user?.stationHQ,
		...(pagination.newPage === 1 && { page: pagination.newPage }),
		// populate: "invoice,details.product,stationHq,depot",
	});
	console.log(
		"🚀 ~ file: InvoiceList.tsx:90 ~ InvoiceList ~ getDepotInvoice:",
		getDepotInvoice
	);

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
		const response = getDepotInvoice?.data;
		const normalizedAPIResponse = response?.data?.data?.reduce(
			(acc: any[], cur: any, i: number) => [
				...acc,
				{
					...cur,
					id: cur?.id,
					date: format(new Date(cur.createdAt), "d/MM/yyyy"),
					totalAmount: CurrencyFormatter(cur?.totalAmount),
					depotName: cur?.depot?.name,
					depotPhoneNumber: cur?.depot?.phoneNumber,
					email: cur?.depot?.email,
				},
			],
			[]
		);
		return { normalizedAPIResponse, response };
	}, [getDepotInvoice]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse);
	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	const navigate = useNavigate();

	// TABLE FILTER TAB

	function fn(data: { [index: string]: string | number }) {
		return;
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
				</div>
				<div className="h-fit bg-white w-full">
					<TableLoader
						data={getDepotInvoice}
						tableData={handledAPIResponse?.normalizedAPIResponse || []}>
						<div className="h-full w-full">
							<div className="relative">
								<EnhancedTable {...dataToChildren} />
							</div>
						</div>
					</TableLoader>
				</div>
			</article>
		</section>
	);
}

// REQUEST TO WITHDRAW MODAL
