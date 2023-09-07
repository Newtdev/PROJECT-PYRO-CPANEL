import { Star } from "@mui/icons-material";
import {
	LinearProgress,
	linearProgressClasses,
	Rating,
	styled,
} from "@mui/material";
import React, { ReactElement } from "react";
import { ReviewDataType } from "src/helpers/alias";

export function ReviewCard({
	reviewData,
}: {
	reviewData: ReviewDataType;
}): ReactElement {
	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
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

	return (
		<div>
			<div className="mt-4 text-[#1E1E1E]">
				<h3 className="text-[16px] text-black">Ratings Summary</h3>
			</div>

			<div className="px-6 h-[25%] mt-5 flex justify-between items-center">
				<div className="basis-[60%]">
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

				<div className="basis-[40%] ">
					<div className="flex items-center justify-center">
						<small className="text-[24px]">4.5</small>
						<small className="">
							<Star className="text-[#FFB400] text-center text-[24px] align-middle" />
						</small>
					</div>
					<p className="text-[12px]">273 Reviews</p>
				</div>
			</div>
			<div className="h-fit mt-6">
				<div className="h-24  flex justify-center items-center">
					<h1 className="text-[#1E1E1E] text-[24px]">Reviews</h1>
				</div>
				<div className="flex w-full justify-between items-center px-6 text-start text-[#1E1E1E] text-[12px]">
					<div>
						<h4>Kristin Watson</h4>
						<p className="text-[#636685]">User</p>
					</div>
					<div>
						<Rating
							name="customized-10"
							size="small"
							defaultValue={5}
							max={5}
						/>
					</div>
				</div>
				<div>
					<p className="text-justify text-[12px] px-6 leading-[20px] mt-3">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ex a
						veritatis aut magnam ullam! Perspiciatis facilis ab nisi, rem odio
						voluptatum maiores officiis aliquid atque quo delectus, debitis
						quae.
					</p>
				</div>
			</div>
		</div>
	);
}
