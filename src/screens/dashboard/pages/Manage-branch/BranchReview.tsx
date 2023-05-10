import { Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { ReviewComponents } from "src/components/ReviewComponents";
import { ReviewDataType } from "src/helpers/alias";

export default function BranchReview() {
	const reviewData: ReviewDataType = [
		{
			id: 1,
			value: "30",
			star: 5,
		},
		{
			id: 2,
			value: "40",
			star: 4,
		},
		{
			id: 3,
			value: "60",
			star: 3,
		},
		{
			id: 4,
			value: "90",
			star: 2,
		},
		{
			id: 5,
			value: "40",
			star: 1,
		},
	];

	return (
		<section>
			<article className="flex flex-cols lg:flex-row gap-4  bg-white rounded-lg mt-10 h-screen">
				<div className="lg:basis-[65%]  grid grid-cols-2 mt-10 gap-4 px-4">
					<div className="h-fit mt-6 border px-2 py-4 border-[#636685] rounded-xl">
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
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ex
								a veritatis aut magnam ullam! Perspiciatis facilis ab nisi, rem
								odio voluptatum maiores officiis aliquid atque quo delectus,
								debitis quae.
							</p>
						</div>
					</div>
					<div className="h-fit mt-6 border p-4 border-red-500 rounded-xl">
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
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ex
								a veritatis aut magnam ullam! Perspiciatis facilis ab nisi, rem
								odio voluptatum maiores officiis aliquid atque quo delectus,
								debitis quae.
							</p>
						</div>
					</div>
				</div>

				{/* RATING REVIEWS */}
				<div className="lg:basis-[35%] h-fit pt-4 pb-10">
					<div className="px-6 h-[25%] mt-5 flex flex-col">
						<div className="my-4 text-[#1E1E1E]">
							<h3 className="text-[16px] text-black">Ratings Summary</h3>
						</div>
						<ReviewComponents reviewData={reviewData} />

						<div className="self-start mt-4">
							<div className="flex items-center justify-center">
								<small className="text-[24px]">4.5</small>
								<small className="">
									<Star className="text-[#FFB400] text-center text-[24px] align-middle" />
								</small>
							</div>
							<p className="text-[12px]">273 Reviews</p>
						</div>
					</div>

					{/* <ReviewCard reviewData={reviewData} /> */}
					{/* <ReviewCommentCard reviewData={reviewData} /> */}
				</div>
			</article>
		</section>
	);
}
