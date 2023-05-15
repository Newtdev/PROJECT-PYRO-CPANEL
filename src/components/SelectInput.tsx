import { FilterList } from "@mui/icons-material";
import React, { ChangeEventHandler, ReactElement } from "react";

export type SelectType = {
	id: string | number;
	value: string;
	label: string;
	[x: string]: any;
};

export const SelectInput = (props: {
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
