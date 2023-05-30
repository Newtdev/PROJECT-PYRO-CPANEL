import { Close } from "@mui/icons-material";
import { Fragment, useCallback } from "react";
import Image from "./Image";

export const ShowVideoAndImage = ({
	media,
	type,
	removeImage,
}: {
	media: string[] | any;
	type: string;
	removeImage: (i: number | string) => void;
}) => {
	return (
		<>
			{type.toLowerCase() === "image" && media.length > 0 ? (
				<div className="w-full flex  items-center overflow-x-auto py-2 h-fit">
					{media?.map((_v: string, i: React.Key) => {
						return (
							<div className="p-2 relative" key={i}>
								<div
									className="px-1 py-1 rounded-full text-red-600 w-fit bg-transparent cursor-pointer"
									onClick={() => removeImage(i)}>
									<Close fontSize="small" />
								</div>
								<Image
									image={_v || ""}
									width={200}
									height={200}
									styles="h-24 object-cover"
								/>
							</div>
						);
					})}
				</div>
			) : null}
			{type.toLowerCase() === "video" &&
			media.length > 0 &&
			media.length === 1 ? (
				<div className="flex items-center overflow-x-auto py-2 h-full">
					{media?.map((_v: string, i: React.Key) => {
						return (
							<Fragment key={i}>
								<video width={"100%"} src={_v} controls></video>
							</Fragment>
						);
					})}
				</div>
			) : null}
		</>
	);
};
