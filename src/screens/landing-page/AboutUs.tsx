import React from "react";
import { Layout } from ".";
import AboutImg from "../../assets/img/Pix.png";
import Map from "../../assets/img/Map.svg";

const About = () => {
	return (
		<section className="lg:h-[50vh] z-10 max-w-screen overflow-hidden bg-primary">
			<article className="w-full  h-[90%] mt-10 pb-10  mx-auto rounded-lg lg:px-4  py-4">
				<div className="lg:w-[70%] m-auto">
					<p className="md:leading-loose text-white text-center lg:text-[20px] ">
						We are FULEAP, a mobile app that connects you with the best fuel and
						energy deals in Nigeria. We help you find and compare prices of
						petrol, diesel, biofuel, and other fuels at nearby filling stations.
						You can filter your search results by fuel type, distance, price
						range, and user ratings. You can also view filling station details
						such as an address, contact information, opening hours, and
						available services
					</p>
				</div>
				<div className="h-full absolute top-[38rem] w-full ">
					<img
						src={AboutImg}
						className="lg:h-[70%] w-full object-contain"
						alt=""
					/>
				</div>
			</article>
		</section>
	);
};

const EveryWhere = () => {
	return (
		<section className="lg:h-full max-w-screen overflow-hidden ">
			<article className="w-full">
				<div className="lg:w-1/2 m-auto lg lg:mt-56">
					<h1 className="font-bold text-3xl lg:text-5xl lg:leading-normal text-center text-primary">
						We’re here for you <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFE355] to-[#0B223D]">
							no matter where
						</span>{" "}
						you are
					</h1>
					<span className="w-full inline-block h-1 rounded-full bg-[#D0D5DD] " />
				</div>
				<div className="w-[90%] mx-auto flex justify-center items-center my-14">
					<img
						src={Map}
						className="w-[40%] object-contain"
						alt=""
						loading="lazy"
					/>
				</div>
			</article>
		</section>
	);
};

const Mission = () => {
	return (
		<section className="lg:h-full max-w-screen overflow-hidden ">
			<article className="w-full">
				<div className="lg:w-1/2 m-auto lg lg:mt-56">
					<h1 className="font-bold text-3xl lg:text-5xl lg:leading-normal text-center text-primary">
						We’re here for you <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CFE355] to-[#0B223D]">
							no matter where
						</span>{" "}
						you are
					</h1>
					<span className="w-full inline-block h-1 rounded-full bg-[#D0D5DD] " />
				</div>
				<div className="w-[90%] mx-auto flex justify-center items-center my-14">
					<img
						src={Map}
						className="w-[40%] object-contain"
						alt=""
						loading="lazy"
					/>
				</div>
			</article>
		</section>
	);
};
export default function AboutUs() {
	return (
		<main className="max-w-screen overflow-x-hidden">
			<Layout>
				<>
					<section className="lg:h-[30vh] max-w-screen overflow-hidden">
						<article className="w-full flex flex-col lg:flex-row lg:justify-between  h-[90%] mt-10 pb-10  mx-auto rounded-lg lg:px-4 bg-white py-4">
							<div className="lg:w-1/2 m-auto">
								<h1 className="font-bold text-3xl lg:text-5xl lg:leading-tight text-primary text-center ">
									We’re here to gurantee your success
								</h1>
								<span className="w-full inline-block h-1 rounded-full bg-[#D0D5DD]" />
							</div>
						</article>
					</section>
					<About />
					<EveryWhere />
				</>
			</Layout>
		</main>
	);
}
