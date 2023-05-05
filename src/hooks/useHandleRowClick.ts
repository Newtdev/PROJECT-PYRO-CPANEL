import React, { useCallback, useState } from "react";

export default function useHandleRowClick(fn?: (name: string) => void) {
	const [showModal, setShowModal] = useState<boolean>(false);

	const handleRowClick = useCallback(
		(event: React.MouseEvent<HTMLElement>, name: string) => {
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
