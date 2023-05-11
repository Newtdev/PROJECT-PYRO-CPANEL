import React, { useState } from "react";
import { useCallback } from "react";
import { Data } from "src/helpers/alias";

export default function useHandleSelectAllClick(data: Data[]) {
	const [selected, setSelected] = useState<string[]>([]);

	const handleSelectAllClick = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.checked) {
				const newSelected = data?.map((n: Data) => n.id) as string[];

				setSelected(newSelected);
				return;
			}
			setSelected([]);
		},
		[data]
	);

	return { handleSelectAllClick, selected, setSelected };
}

// const handleSelectAllClick = () => {
// 	if (event.target.checked) {
// 		const newSelected = rows?.map((n: any) => n.name) as any;
// 		setSelected(newSelected);
// 		return;
// 	}
// 	setSelected([]);
// };
