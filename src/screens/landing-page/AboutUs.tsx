import React from "react";
import { Layout } from ".";
import AboutImg from "../../assets/img/Pix.png";
import Map from "../../assets/img/Map.svg";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image1 from "../../assets/img/Image1.png";

const About = () => {
	return (
		<section className="lg:h-[50vh] z-10 max-w-screen overflow-hidden bg-primary ">
			<article className="w-full lg:h-[90%] mt-10 pb-10  mx-auto rounded-lg lg:px-4  py-4">
				<div className="lg:w-[70%] m-auto">
					<p className="md:leading-loose text-white text-[14px] md:text-lg text-center lg:text-[20px] px-4 lg:px-0">
						We are FULEAP, a mobile app that connects you with the best fuel and
						energy deals in Nigeria. We help you find and compare prices of
						petrol, diesel, biofuel, and other fuels at nearby filling stations.
						You can filter your search results by fuel type, distance, price
						range, and user ratings. You can also view filling station details
						such as an address, contact information, opening hours, and
						available services
					</p>
				</div>
				<div className="h-full absolute top-top-[28rem]  lg:top-[38rem] w-full ">
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
				<div className="lg:w-1/2 m-auto mt-36  lg:mt-56">
					<h1 className="font-bold text-2xl md:text-3xl lg:text-5xl lg:leading-normal text-center text-primary">
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
						className="lg:w-[40%] w-[80%] object-contain"
						alt=""
						loading="lazy"
					/>
				</div>
			</article>
		</section>
	);
};

const Team = () => {
	const team = [
		{ id: 1, image: Image1, name: "Jenny Wilson" },
		{ id: 2, image: Image1, name: "Eleanor Pena" },
		{ id: 3, image: Image1, name: "Robert Fox" },
		{ id: 4, image: Image1, name: "Robert Fox" },
		{ id: 5, image: Image1, name: "Robert Fox" },
		{ id: 6, image: Image1, name: "Robert Fox" },
	];
	const settings = {
		className: "flex flex-row w-full lg:w-[90%] lg:mx-14 text-black",
		infinite: true,
		centerPadding: "50px",
		// slidesToShow: 4,
		swipeToSlide: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 2,
				},
			},
		],
	};
	return (
		<section className="lg:h-full max-w-screen overflow-hidden  ">
			<article className="w-full py-6">
				<div className="h">
					<h1 className="font-bold text-2xl md:text-[64px] text-primary my-10">
						Our Success Team
					</h1>
					<div className="w-full h-full flex">
						<Slider {...settings}>
							{team.map((v) => {
								return (
									<div key={v.id} className="h-96 p-2 w-full">
										<img
											src={v.image}
											className="h-[85%] w-full object-cover mb-4 rounded-xl"
											alt=""
										/>
										<h4 className="text-black font-bold text-sm lg:text-xl">
											{v.name}
										</h4>
									</div>
								);
							})}
						</Slider>
					</div>
				</div>
			</article>
		</section>
	);
};
export default function AboutUs() {
	const MissionVision = [
		{
			id: 1,
			name: "Our Mission",
			desc: "Premiere automated ecosystem of the downstream supply chain, automobile and other energy sources",
		},
		{
			id: 2,
			name: "Our Vision",
			desc: "To create An all-in-one information sharing, and on demand software solution, that connects digital and physical players of the downstream supply chain, automobile, and other energy sources, relevant regulatory bodies.",
		},
	];
	return (
		<main className="max-w-screen overflow-x-hidden">
			<Layout>
				<>
					<section className="lg:h-[30vh] max-w-screen overflow-hidden">
						<article className="w-full flex flex-col lg:flex-row lg:justify-between  h-[90%] mt-10 pb-10  mx-auto rounded-lg lg:px-4 bg-white py-4">
							<div className="lg:w-1/2 m-auto">
								<h1 className="font-bold text-2xl md:text-2xl  lg:text-5xl lg:leading-tight text-primary text-center">
									We’re here to gurantee your success
								</h1>
								<span className="w-full inline-block h-1 rounded-full bg-[#D0D5DD]" />
							</div>
						</article>
					</section>
					<About />
					<EveryWhere />

					<section className="lg:h-full max-w-screen overflow-hidden">
						<article className="lg:w-[96%] flex flex-col justify-between gap-y-4  h-[90%] mt-10 pb-10  mx-auto rounded-lg lg:px-4 bg-white py-4">
							{MissionVision.map((v) => (
								<div key={v.id} className="lg:w-[70%] lg:pl-10 px-4 text-start">
									<h1 className="font-bold text-xl md:text-3xl lg:text-5xl lg:leading-tight text-primary  ">
										{v.name}
									</h1>
									<span className="w-full inline-block h-1 rounded-full bg-[#D0D5DD]" />
									<div className="mt-5">
										<p className="text-darkgray text-sm md:text-base">
											{v.desc}
										</p>
									</div>
								</div>
							))}
						</article>
					</section>
					<Team />
				</>
			</Layout>
		</main>
	);
}
