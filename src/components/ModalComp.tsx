import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "./Button";

interface modalType {
	styles?: string | undefined;
	children: ReactNode;
}

export const Modal = ({
	styles = "absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-[300]",
	children,
}: modalType) => {
	return createPortal(<div className={styles}>{children}</div>, document.body);
};

// FLAG MODAL
export const FlagModal = ({
	info,
	onClose,
	onConfirmation,
}: {
	onClose: React.MouseEventHandler<HTMLButtonElement>;
	onConfirmation: React.MouseEventHandler<HTMLButtonElement>;
	info: string;
}) => {
	return (
		<div className="w-[322px] h-[125px] bg-white rounded-[12px]  shadow-2xl flex justify-center items-center flex-col">
			<div className="text-[#1E1E1E] text-[14px]">{info}</div>
			<div className="mt-4 text-[14px]">
				<Button
					text="No"
					className="px-6 bg-[#FF1400] w-[119px] text-white h-[41px] rounded-full"
					showIcon={false}
					type="button"
					onClick={onClose}
				/>
				<Button
					text="Yes"
					className="px-6 bg-[#00C000] text-white w-[119px] h-[41px] rounded-full ml-6"
					showIcon={false}
					type="button"
					onClick={onConfirmation}
				/>
			</div>
		</div>
	);
};
