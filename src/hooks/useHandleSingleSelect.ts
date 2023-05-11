import React, { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";

export default function useHandleSingleSelect(
	selected: string[],
	setSelected: Dispatch<SetStateAction<string[]>>
) {
	const handleClick = useCallback(
		(event: React.MouseEvent<unknown>, name: string) => {
			const selectedIndex = selected.indexOf(name);
			let newSelected: string[] = [];
			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selected, name);
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selected.slice(1));
			} else if (selectedIndex === selected.length - 1) {
				newSelected = newSelected.concat(selected.slice(0, -1));
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(
					selected.slice(0, selectedIndex),
					selected.slice(selectedIndex + 1)
				);
			}

			setSelected(newSelected);
		},
		[selected, setSelected]
	);
	return { handleClick };
}
