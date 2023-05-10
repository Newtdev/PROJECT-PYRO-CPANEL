import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import { ReactElement } from "react";
import { ReviewDataType } from "src/helpers/alias";

export function ReviewComponents({
	reviewData,
}: {
	reviewData: ReviewDataType;
}): ReactElement {
	return (
		<div className="">
			{reviewData.map((d) => (
				<div className="flex gap-4 items-center justify-between">
					<p>{d.star}</p>
					<div key={d.id} className="w-full my-3">
						<BorderLinearProgress
							variant="determinate"
							value={Number(d?.value)}
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
