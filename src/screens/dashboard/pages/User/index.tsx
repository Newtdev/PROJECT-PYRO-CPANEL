import { ChangeEventHandler, ReactElement, useMemo } from "react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import ViewWalletComp from "src/components/ViewWalletComponent";
import { SearchInput } from "src/components/inputs";
import { FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchAllUserQuery } from "src/api/manageUserApi";
import { TableLoader } from "src/components/LoaderContainer";
import { useDebounce } from "src/hooks/useDebounce";

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
		}[] = [];
		const { data } = userResult?.currentData?.users || {};

		if (data) {
			for (const iterator of data) {
				neededData = [
					...neededData,
					{
						id: iterator.id,
						// createdAt,
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
		navigate(`/user/${data?.id}`, { state: data?.firstName });
	}

	const handleSelectChange = (event: { target: { value: string } }) => {
		setFilteredValue(event.target.value);
	};
	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	// TABLE FILTER TAB
	const tabData: SelectType[] = [
		{ id: 1, value: "All", label: "All" },
		{ id: 2, value: "New", label: "New Registered" },
	];

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
	return (
		<section>
			<article>
				<div className=" mt-6 h-20">
					<div className="w-fit flex items-center">
						<div className="w-[109px] h-11">
							<Button
								text="Export"
								className="h-full w-full font-bold bg-[#D0D5DD] rounded-lg hover: text-[#002E66] flex items-center justify-center"
								type="button"
								showIcon={false}
								onClick={() => console.log("add branch")}
							/>
						</div>
					</div>
					<div className="h-fit w-full bg-white mt-6 shadow-lg rounded-t-lg">
						<TableLoader data={userResult} tableData={handledAPIResponse || []}>
							<div className="h-full w-full bg-white flex justify-between items-center py-6 px-6">
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
						</TableLoader>
					</div>
				</div>
			</article>
		</section>
	);
};

export default Transactions;
