import React from "react";
import { ProfiledataType } from "src/helpers/alias";
import Image from "./Image";

interface ProfileType {
	data: ProfiledataType;
	showImage?: boolean | undefined;
	imageURL?: string;
	showBanner?: boolean | undefined;
}
export default function ProfileCard(props: ProfileType) {
	return (
		<div className="w-full h-fit bg-white shadow-lg rounded-lg text-[14px] py-6">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
				{!!props.showBanner ? (
					<div>
						<div className=" text-start ">
							<h2 className="text-black">Profile Picture</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
							<div className="h-20 w-20 mt-6">
								<Image
									image={props.imageURL || ""}
									width={"100%"}
									height={"100%"}
									styles="object-fit rounded-full"
								/>
							</div>
						</div>
					</div>
				) : null}
				{props?.data?.map((dt) => {
					return (
						<div key={dt.id}>
							<h2 className="text-black">{dt.name}</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
							<h2 className="text-[#002E66]">{dt.value}</h2>
						</div>
					);
				})}
			</div>
			{!!props.showImage ? (
				<div>
					<div className=" py-4 text-start px-4 lg:px-16">
						<h2 className="text-black">Profile Picture</h2>
						<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
						<div className="w-[147px] h-[166px] mt-6">
							<Image
								image={props.imageURL || ""}
								width={"100%"}
								height={"100%"}
								styles="object-fit"
							/>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
