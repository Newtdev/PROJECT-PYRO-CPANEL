import { CircularProgress } from "@mui/material";
import { AddIcon } from "./Icons";

type buttonTypes = {
	text: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	className?: string;
	type: "button" | "submit" | "reset" | undefined;
	showModal?: boolean | undefined;
	showIcon?: boolean | undefined;
};

export const Button = ({
	text,
	onClick,
	disabled,
	className,
	type,
	showModal,
	showIcon,
}: buttonTypes) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={className}
			type={type}>
			{showIcon ? (
				<div className="mr-4">
					<AddIcon />
				</div>
			) : null}
			{!showModal ? (
				text
			) : (
				<CircularProgress size={20} className="mr-4" sx={{ color: "white" }} />
			)}
		</button>
	);
};
