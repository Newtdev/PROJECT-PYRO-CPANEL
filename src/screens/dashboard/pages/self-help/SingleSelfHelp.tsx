import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

export default function SingleSelfHelp() {
	const location = useLocation();
	const data = location?.state;
	return (
		<section>
			<article className="flex gap-6 h-screen py-6 pr-6">
				<div className="h-full  basis-1/2 text-start  text-black">
					<h1 className="text-[30px] font-bold text-black">
						{data.title || ""}
					</h1>
					<br />
					<div className="mt-6">
						<p className="text-black ">{data.description || ""}</p>
					</div>
					<br />
					<ul>
						{data.body.map((v: any, i: number) => (
							<Fragment key={i + 1}>
								<ol className="font-bold text-black">Step {i + 1}</ol>
								<li className="pl-10 text-black">{v}</li>
							</Fragment>
						))}
					</ul>
				</div>
				<div className=" basis-1/2 ">
					<div className="h-[400px] w-full  rounded-lg">
						{data.media.map((v: any, i: number) => (
							<Fragment key={i + 1}>
								{v.type === "VIDEO" ? (
									<video
										width="100%"
										height="100%"
										className="h-full w-full"
										src={v.url}
										controls></video>
								) : (
									<div className="h-[400px] w-full  rounded-lg ">
										<img src={v.url} className="h-full w-full mt-4" alt="" />
									</div>
								)}
							</Fragment>
						))}
					</div>
				</div>
			</article>
		</section>
	);
}
