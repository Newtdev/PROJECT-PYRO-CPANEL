import { ChangeEventHandler, ReactElement, useMemo } from "react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { SearchInput } from "src/components/inputs";
import { CompressOutlined, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
	useExportAllUserQuery,
	useFetchAllUserQuery,
} from "src/api/manageUserApi";
import { TableLoader } from "src/components/LoaderContainer";
import { useDebounce } from "src/hooks/useDebounce";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

interface HeadCellTypes {
	id: string;
	label: string;
	numeric?: boolean | null;
	minWidth: number;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement | any;
	referenceId?: string | number;
	doneby?: string;
}

const headCells: readonly HeadCellTypes[] = [
	{
		id: "created",
		minWidth: 170,
		label: "Reg Date",
	},
	{
		id: "firstName",
		minWidth: 170,
		label: "First name",
	},
	{
		id: "lastName",
		minWidth: 170,
		label: "Last name",
	},
	{
		id: "email",
		minWidth: 170,
		label: "Email",
	},
	{
		id: "gender",
		minWidth: 170,
		label: "Gender",
	},
	{
		id: "phoneNumber",
		minWidth: 170,
		label: "Phone number",
	},
	{
		id: "residentialAddress",
		minWidth: 170,
		label: "Address",
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
	const [pagination, setPagination] = useState({ newPage: 1 });
	const [searchValue, setSearchValue] = useState<string>("");
	const [filteredValue, setFilteredValue] = useState<string>("");
	const { debouncedValue } = useDebounce(searchValue, 700);

	const userResult = useFetchAllUserQuery({
		query: debouncedValue,
		page: pagination.newPage,
	});

	const exportUserResult = useExportAllUserQuery("");

	const handledAPIResponse = useMemo(() => {
		let neededData: {
			id: string;
			// createdAt,
			firstName: string;
			lastName: string;
			gender: "Male" | "Female";
			email: string;
			phoneNumber: string;
			residentialAddress: string;
			created: any;
		}[] = [];
		const { data } = userResult?.currentData?.users || {};

		if (data) {
			for (const iterator of data) {
				neededData = [
					...neededData,
					{
						id: iterator.id,
						created: format(new Date(iterator.createdAt), "dd/mm/yyyy"),
						firstName: iterator.firstName,
						lastName: iterator.lastName,
						gender: iterator.gender,
						email: iterator.email,
						phoneNumber: iterator.phoneNumber,
						residentialAddress: iterator.residentialAddress,
					},
				];
			}
			return neededData;
		}
	}, [userResult]);
	const { handleRowClick } = useHandleRowClick(fn);
	const navigate = useNavigate();

	function fn(data: { [index: string]: string | number }) {
		navigate(`/users/${data?.id}`, { state: data?.firstName });
	}

	const handleSelectChange = (event: { target: { value: string } }) => {
		setFilteredValue(event.target.value);
	};
	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	const props = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick,
		handleChangePage,
		paginationData: {
			totalPage: userResult?.currentData?.users?.totalPages,
			limit: userResult?.currentData?.users?.limit,
			page: userResult?.currentData?.users?.page,
		},
		accountInformation: {
			balance: 0,
			amountIn: 0,
			amountOut: 0,
		},
	};

	// HANDLE EXPORT ALL USER DATA

	const handleUserData = useMemo(
		() => exportUserResult.currentData?.users?.data,
		[exportUserResult]
	);

	return (
		<section>
			<article>
				<div className=" mt-6">
					<div className="w-full flex items-center justify-between">
						<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
							<SearchInput
								name="branch-search"
								placeholder="Search"
								value={searchValue}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const target = e.target;
									setSearchValue(target.value);
								}}
							/>
						</div>
						<div className="w-[109px] h-11">
							<CSVLink filename="Users_list.csv" data={handleUserData ?? []}>
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
					<div className="h-fit w-full bg-white mt-6 shadow-lg rounded-t-lg">
						<div className="h-full w-full bg-white flex justify-between items-center py-6 px-6"></div>
						<TableLoader data={userResult} tableData={handledAPIResponse || []}>
							<ViewWalletComp {...props} />
						</TableLoader>
					</div>
				</div>
			</article>
		</section>
	);
};

export default Transactions;
