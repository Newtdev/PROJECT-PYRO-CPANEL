import React, { useCallback, useState } from "react";

export default function useHandleRowClick(
	fn?: (name: { [index: string]: string | number }) => void
) {
	const [showModal, setShowModal] = useState<boolean>(false);

	const handleRowClick = useCallback(
		(
			event: React.MouseEvent<HTMLElement>,
			name: { [index: string]: string | number }
		) => {
			if (event.currentTarget) {
				if (event.currentTarget.textContent === "") setShowModal(!showModal);
				else {
					if (fn) {
						fn(name);
					}
					return;
				}
			}
		},
		[fn, showModal]
	);
	//
	return { showModal, setShowModal, handleRowClick };
}
