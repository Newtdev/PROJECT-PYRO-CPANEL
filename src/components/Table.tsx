import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { Data } from "src/helpers/alias";
import { Flag } from "@mui/icons-material";
import { Pagination } from "@mui/material";

type Order = "asc" | "desc";

interface HeadCell {
	id: string | number;
	label: string;
	minWidth: number;
}
interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	headCells: HeadCell[];
	showFlag?: boolean | undefined;
	showCheckBox?: boolean | undefined;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		showFlag,
		showCheckBox,
	} = props;
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					{showCheckBox ? (
						<Checkbox
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								"aria-label": "select all desserts",
							}}
						/>
					) : null}
				</TableCell>
				{props.headCells?.map((headCell: any) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						sx={{ color: "#1E1E1E" }}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				{showFlag ? (
					<>
						<TableCell padding="checkbox" className="pl-6">
							<Flag color="error" className="ml-3" />
						</TableCell>
					</>
				) : null}
			</TableRow>
		</TableHead>
	);
}

export default function EnhancedTable({
	headCells,
	rows,
	handleRowClick,
	showFlag,
	isSelected,
	selected,
	handleSelectAllClick,
	handleClick,
	showCheckBox,
	handleChangePage,
	paginationData,
}: any) {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2, paddingX: 2 }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={"medium"}>
						<EnhancedTableHead
							numSelected={selected?.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							headCells={headCells}
							showFlag={showFlag}
							showCheckBox={showCheckBox}
						/>
						<TableBody>
							{rows?.map((row: any, index: number) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}>
										<TableCell padding="checkbox">
											{showCheckBox ? (
												<Checkbox
													color="primary"
													onClick={(event) => handleClick(event, row.id)}
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby": labelId,
													}}
												/>
											) : null}
										</TableCell>
										{headCells.map(
											(column: { [index: string]: string | number }) => {
												const value = row[column.id];
												return (
													<>
														<TableCell
															component="th"
															id={labelId}
															scope="row"
															padding="normal"
															key={column.id}
															onClick={(e) => handleRowClick(e, row)}
															// align={column.align}
															style={{
																color: "#002E66",
																fontFamily: "Poppins",
																fontSize: "14px",
																fontWeight: "400",

																minWidth: column.minWidth,
															}}>
															{value}
														</TableCell>
													</>
												);
											}
										)}
										{showFlag ? (
											<>
												<TableCell
													component="th"
													id={labelId}
													scope="row"
													padding="normal"
													onClick={(e) => handleRowClick(e, row.name)}
													style={{
														color: "#002E66",
														fontFamily: "Poppins",
														fontSize: "14px",
														fontWeight: "400",
													}}>
													<Flag color="error" />
												</TableCell>
											</>
										) : null}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>

				<Pagination
					count={paginationData?.totalPage}
					page={paginationData?.page}
					onChange={handleChangePage}
					className="py-4 w-fit ml-auto"
				/>
			</Paper>
		</Box>
	);
}
