import { Delete } from "@mui/icons-material";
import React, { useState, useMemo } from "react";
import { ReactElement } from "react";
import { SearchInput } from "src/components/inputs";
import EnhancedTable from "src/components/Table";
import { Button } from "src/components/Button";
import { FlagModal, Modal } from "src/components/ModalComp";
import { useNavigate } from "react-router-dom";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useIsSelected from "src/hooks/useIsSelected";
import { TableLoader } from "src/components/LoaderContainer";
import {
	ErrorNotification,
	handleDateFormat,
} from "src/helpers/helperFunction";
import { useDebounce } from "src/hooks/useDebounce";
import {
	useDeleteSelfHelpMutation,
	useFetchAllSelfHelpQuery,
} from "src/api/selfHelpApislice";
import { APP_ROUTE } from "src/helpers/Constant";
import { format } from "date-fns";

interface SelfHelpType {
	id: "title" | "description" | "likes" | "createdAt";
	label: string | ReactElement;
	minWidth: number;
}

const headCells: readonly SelfHelpType[] = [
	{
		id: "createdAt",
		minWidth: 170,
		label: "Date",
	},
	{
		id: "title",
		minWidth: 170,
		label: "Title",
	},
	{
		id: "description",
		minWidth: 170,
		label: "Description",
	},
	{
		id: "likes",
		minWidth: 170,
		label: "Likes",
	},
];

// YUP VALIDATION FOR ADD BRANCH TYPE

const SelfHelp = () => {
	// const [filteredValue, setFilteredValue] = useState<string>("");
	const [pagination, setPagination] = useState({ newPage: 1 });
	const navigate = useNavigate();
	// const { debouncedValue } = useDebounce(filteredValue, 700);
	const [deleteSelfHelp, deleteSelfHelpResult] = useDeleteSelfHelpMutation();

	const hqQueryResult = useFetchAllSelfHelpQuery({
		page: pagination.newPage,
	});

	const handleDeleteSelfHelp = async (id: string) => {
		try {
			const result = await deleteSelfHelp(id);

			if (result) {
				setShowModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// hqQueryResult?.currentData?.hqProfile?.totalData;
	const handledAPIResponse = useMemo(() => {
		const hqProfile = hqQueryResult?.currentData?.selfHelps || [];

		const neededData = hqProfile?.data?.reduce(
			(
				acc: { [index: string]: string }[],
				cur: { [index: string]: string }
			) => [
				...acc,
				{
					id: cur?.id,
					createdAt: format(new Date(cur.createdAt), "dd/mm/yyyy"),
					title: cur?.title,
					description: cur?.description,
					media: cur?.media,
					body: cur?.body,
					likes: `${cur?.likes.length} reactions`,
				},
			],
			[]
		);

		return { hqProfile, neededData };
	}, [hqQueryResult]);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick(handledAPIResponse?.neededData);

	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { showModal, setShowModal, handleRowClick } = useHandleRowClick(fn);
	const { isSelected } = useIsSelected(selected);

	// API TO GET ALL HQ INFORMATION

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	// TABLE FILTER TAB

	function fn(data: { [index: string]: string | number }) {
		navigate(`/self-help/${data.title}`, { state: data });
	}
	let dataToChildren: any = {
		rows: handledAPIResponse?.neededData || [],
		headCells,
		handleRowClick,
		showFlag: false,
		showCheckBox: true,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
		handleChangePage,
		paginationData: {
			totalPage: handledAPIResponse?.hqProfile?.totalPages,
			limit: handledAPIResponse?.hqProfile?.limit,
			page: handledAPIResponse?.hqProfile?.page,
		},
	};

	return (
		<section>
			<article>
				<div className="flex justify-between items-center mt-6 h-20 ">
					<div className=" flex items-center justify-between w-full">
						<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
							<SearchInput
								name="branch-search"
								placeholder="Search"
								value={""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const target = e.target;
								}}
							/>
						</div>
						<div className="w-[189px] h-11 mr-6">
							<Button
								text="Add Self Help"
								className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-start pl-4"
								type="button"
								showIcon={true}
								onClick={() =>
									navigate(APP_ROUTE.ADD_NEW_SELF_HELP, {
										replace: true,
										state: "Add New Self Help",
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="h-fit w-full bg-white">
					<TableLoader
						data={hqQueryResult}
						tableData={handledAPIResponse?.neededData || []}>
						<div className="h-full w-full">
							<div className="h-full w-full flex justify-between items-center py-6 shadow-lg rounded-t-lg ">
								<div className=" w-full flex justify-end items-center h-11 text-sm pr-12 cursor-pointer">
									<Delete fontSize="large" onClick={() => setShowModal(true)} />
								</div>
							</div>

							<div className="relative">
								<EnhancedTable {...dataToChildren} />
							</div>
						</div>
					</TableLoader>

					{/* FLAG A HQ */}
					{showModal && (
						<Modal styles="absolute right-10 top-56">
							<FlagModal
								info="Are you sure you want to Delete?"
								showModal={deleteSelfHelpResult.isLoading}
								onClose={() => setShowModal(false)}
								onConfirmation={() => handleDeleteSelfHelp(selected.toString())}
							/>
						</Modal>
					)}
				</div>
			</article>
		</section>
	);
};

export default SelfHelp;
