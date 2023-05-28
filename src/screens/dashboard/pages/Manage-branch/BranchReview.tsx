import { Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useCallback, useMemo } from "react";
import { ReviewComponents } from "src/components/ReviewComponents";
import { ReviewDataType } from "src/helpers/alias";

export default function BranchReview(props: {
	ratings: {
		comment: string;
		rating: number;
		_id: string;
		user: {
			firstName: string;
			lastName: string;
			location: { state: string };
		};
	}[];
}) {
	const occurrences = useCallback(
		(num: number) => {
			const ratings = props?.ratings;

			const RatingAverage = ratings?.reduce(
				(
					acc: number,
					cur: { rating: number },
					index: any,
					array: string | any[]
				): any => Number((acc += cur.rating / array.length).toFixed(1)),
				0
			);
			const occurr = ratings?.reduce((acc: any, curr: any) => {
				return (
					acc[curr?.rating] ? ++acc[curr?.rating] : (acc[curr?.rating] = 1), acc
				);
			}, {});

			let totalCalStar = Math.ceil((occurr[num] * num * RatingAverage) / 100);
			return {
				RatingAverage,
				totalCalStar,
			};
		},
		[props]
	);

	// console.log(occurrences(2));

	return (
		<section>
			<article className="flex flex-cols lg:flex-row gap-4  bg-white rounded-lg mt-10 h-screen">
				<div className="lg:basis-[65%] h-fit grid grid-cols-2 mt-10 gap-4 px-4">
					{props.ratings?.map((dt, i) => (
						<div className="h-fit mt-6 border px-2 py-4 border-[#636685] rounded-xl">
							<div
								key={dt?._id}
								className="flex w-full justify-between items-center px-6 text-start text-[#1E1E1E] text-[12px]">
								<div>
									<h4>{`${dt?.user?.firstName} ${dt?.user?.lastName}`}</h4>
									<p className="text-[#636685]">{dt?.user?.location?.state}</p>
								</div>
								<div>
									<Rating
										name="customized-10"
										size="small"
										disabled
										defaultValue={dt.rating}
									/>
								</div>
							</div>
							<div>
								<p className="text-justify text-[12px] px-6 leading-[20px] mt-3">
									{dt?.comment}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* RATING REVIEWS */}
				<div className="lg:basis-[35%] h-fit pt-4 pb-10">
					<div className="px-6 h-[25%] mt-5 flex flex-col">
						<div className="my-4 text-[#1E1E1E]">
							<h3 className="text-[16px] text-black">Ratings Summary</h3>
						</div>
						<ReviewComponents review={(num: number) => occurrences(num)} />

						<div className="self-start mt-4">
							<div className="flex items-center justify-center">
								<small className="text-[24px]">
									{occurrences(0)?.RatingAverage || ""}
								</small>
								<small className="">
									<Star className="text-[#FFB400] text-center text-[24px] align-middle" />
								</small>
							</div>
							<p className="text-[12px]">273 Reviews</p>
						</div>
					</div>
				</div>
			</article>
		</section>
	);
}
