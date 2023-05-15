import React, { ReactElement } from "react";
import ProfileCard from "src/components/ProfileCard";
import { ProfiledataType } from "src/helpers/alias";
import { HighlightOffOutlined, Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { ReviewComponents } from "src/components/ReviewComponents";

type ReviewDataType = {
	id: number;
	value: number | string;
	star: number | string;
}[];

export default function AttendantProfileInfo() {
	const ViewProfileData: ProfiledataType = [
		{
			id: 1,
			name: "Full Name",
			value: "Aliko, Zaria Road II",
		},
		{
			id: 2,
			name: "Email",
			value: "Zariaroad2@alikooil.com",
		},
		{
			id: 4,
			name: "Address",
			value: "Ado Batero Bridge, Zaria Road Kano",
		},
		{
			id: 3,
			name: "State",
			value: "Kano State",
		},
		{
			id: 5,
			name: "Branch Manager",
			value: "Abdulsamad Auwal",
		},
		{
			id: 6,
			name: "Phone number",
			value: "Abdulsamad Auwall",
		},
		{
			id: 7,
			name: "Phone number",
			value: "Abdulsamad Auwall",
		},
		{
			id: 8,
			name: "Phone number",
			value: "Abdulsamad Auwall",
		},
	];

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
			<article className="flex flex-cols lg:flex-row  gap-4">
				<div className=" lg:basis-[65%]">
					<ProfileCard
						data={ViewProfileData}
						showImage={true}
						imageURL="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
					/>
				</div>
				<div className="lg:basis-[35%] h-fit pt-4 pb-10  bg-white rounded-lg">
					<div className="p-4 flex items-center">
						<button
						// onClick={() => setShowAddModal(false)} disabled={false}
						>
							<HighlightOffOutlined className="text-black cursor-pointer mr-6" />
						</button>
						<h3 className="text-[14px] font-bold text-black">
							Ratings and Reviews(235)
						</h3>
					</div>
					<hr />
					<ReviewCard reviewData={reviewData} />
				</div>
			</article>
		</section>
	);
}

export function ReviewCard({
	reviewData,
}: {
	reviewData: ReviewDataType;
}): ReactElement {
	return (
		<div>
			<div className="mt-4 text-[#1E1E1E]">
				<h3 className="text-[16px] text-black">Ratings Summary</h3>
			</div>

			<div className="px-6 h-[25%] mt-5 flex justify-between items-center">
				<div className="basis-[60%]">
					<ReviewComponents reviewData={reviewData} />
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
