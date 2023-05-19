import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { ReviewDataType } from "src/helpers/alias";

export function ReviewComponents({
	review,
}: {
	review: (num: number) => { totalCalStar: number };
}): ReactElement {
	return (
		<div className="">
			{[1, 2, 3, 4, 5].map((d, id) => (
				<div className="flex gap-4 items-center justify-between">
					<p>{d}</p>
					<div key={id} className="w-full my-3">
						<BorderLinearProgress
							variant="determinate"
							value={review(d)?.totalCalStar || 0}
							className="py-2"
						/>
					</div>
				</div>
			))}
		</div>
	);
}
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "#FFB400" : "#308fe8",
	},
}));
