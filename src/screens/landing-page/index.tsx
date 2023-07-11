import React, { Fragment, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { HeroComp } from "src/components/HeroComponent";
import Phone2 from "../../assets/img/Phone2.svg";
import Phone from "../../assets/img/phone.svg";
import Logo from "../../assets/img/logo.svg";
import Icon1 from "../../assets/img/Icon1.svg";
import Icon2 from "../../assets/img/Icon2.svg";
import Icon3 from "../../assets/img/Icon3.svg";
import Payment1 from "../../assets/img/Payment1.svg";
import Payment2 from "../../assets/img/Payment2.svg";
import Payment3 from "../../assets/img/Payment3.svg";
import Payment4 from "../../assets/img/Payment4.svg";
import Photo1 from "../../assets/img/Photo.svg";
import image from "../../assets/img/DoubleImage.svg";
import FooterLogo from "../../assets/img/FooterLogo.svg";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import twitter from "../../assets/img/twitter.svg";
import linkedin from "../../assets/img/linkedin.svg";

function Menu() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	);
}

const links = [
	{ id: 1, link: "services", name: "Services" },
	{ id: 2, link: "about", name: "About Us" },
	{ id: 3, link: "contact", name: "Contact Us" },
	{ id: 4, link: "blog", name: "Blog" },
];
const FooterLinks = [
	{ id: 1, link: "/", name: "Home" },
	{ id: 2, link: "about", name: "About Us" },
	{ id: 3, link: "contact", name: "Contact" },
	{ id: 4, link: "policy", name: "Privacy policy" },
	{ id: 4, link: "terms", name: "Terms of use" },
];

const socialMediaLink = [
	{ id: 1, link: "/", icon: facebook },
	{ id: 2, link: "/", icon: twitter },
	{ id: 1, link: "/", icon: linkedin },
	{ id: 1, link: "/", icon: instagram },
];

// WEBSITE LAYOUT
export const Layout = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const [show, setShow] = useState(true);

	const slide = !show ? "translate-x-full" : "translate-x-0";
	return (
		<section>
			<header className="w-screen h-16 lg:h-24 overflow-x-hidden">
				<nav className="h-full w-full overflow-x-hidden flex justify-between items-center px-3 lg:px-8  py-4">
					<Link className="block" to="/">
						<img src={Logo} className="h-14 lg:h-20" alt="" />
					</Link>
					<div
						className="block lg:hidden cursor-pointer "
						onClick={() => setShow((prevState) => !prevState)}>
						<Menu />
					</div>
					<ul className=" hidden lg:flex justify-between items-center w-[40%] bg-primary h-14 px-10 rounded-[1.6rem]  transition-all py-1">
						{links.map((v) => (
							<li
								className=" text-white  font-bold text-start hover:shadow-lg transition-all"
								key={v.id}>
								<Link to={v.link}>{v.name}</Link>
							</li>
						))}
					</ul>

					{/* Mobile navigation */}
					<div
						className={`absolute top-16 lg:hidden left-0 ${slide} transition-all h-screen w-screen bg-[rgba(1,24,83,0.62)] overflow-hidden`}>
						<ul className={`${slide} bg-primary h-[35%] transition-all py-1`}>
							{links.map((v) => (
								<li
									className="my-2 py-3 text-white lg:font-bold  text-start px-3 hover:shadow-lg transition-all"
									key={v.id}>
									<Link to={v.link}>{v.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>
			</header>
			{children}
			<footer className="bg-primary">
				<article className="w-[96%] h-[35vh] md:h-[40vh] mx-auto rounded-lg mt-0.5 grid grid-cols-1 gap-6 md:px-0 overflex-x-hidden">
					<div className="h-full w-full">
						<div className="">
							<img
								src={FooterLogo}
								className="w-[60%] md:w-[240px] object-contain mx-auto"
								alt=""
							/>
						</div>
						<div className="md:w-[40%] lg:w-[40%] mx-auto">
							<ul className="flex justify-between items-center w-full">
								{FooterLinks.map((v) => (
									<li
										className="text-white text-[9px] md:text-sm font-bold text-start hover:shadow-lg transition-all"
										key={v.id}>
										<Link to={v.link}>{v.name}</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="text-[9px] md:text-sm mt-4 text-white md:my-6">
							<p>
								With FULEAP, you can streamline your operations, enhance your
								customer experience, and maximize profits.
							</p>
						</div>
						<div className="flex justify-center items-center mt-4">
							{socialMediaLink.map((v) => (
								<Link to={v.link}>
									<img
										key={v.id}
										src={v.icon}
										className="h-6 w-6 md:w-10 mr-2"
										alt=""
									/>
								</Link>
							))}
						</div>
					</div>
				</article>
				<div className="w-full flex justify-between items-end">
					{[1, 2].map((_, i) => (
						<span
							key={i}
							className={`inline-block w-[40%] md:w-[45%] h-3 bg-black ${
								i === 0 ? "rounded-tr-xl" : "rounded-tl-xl"
							}`}></span>
					))}
				</div>
			</footer>
		</section>
	);
};

// HERO SECTION
const Hero = () => (
	<section className="lg:h-[80vh]  max-w-screen overflow-hidden">
		{/* <article className="lg:px-4"> */}
		<HeroComp
			header="Are you prepared to commence refueling your vehicle"
			desc="We provide a seamless and efficient approach that offers
						convenience, timeliness, and trust for the effective management in
						the supply chain process."
			img={Phone}
		/>
	</section>
);
//SECTION ONE
const HowWeWork = () => {
	const work = [
		{
			id: 1,
			image: Icon1,
			name: "Creat an account",
			desc: "With Fuleap, you can access and monitor your fuel consumption and also access reports, invoices, and notifications from your mobile device. Join Fuleap today to save time and money on your fuel needs.",
		},
		{
			id: 2,
			image: Icon2,
			name: "Fund  your wallet",
			desc: "Don’t let low funds slow u down. You can fund your wallet easily with a credit card, debit card, or bank account. Fuleap is the smart way to fuel up.",
		},
		{
			id: 3,
			image: Icon3,
			name: "Pay a filling station",
			desc: "Fuleap into the future and pay for fuel with your phone. Just scan the QR code, confirm and go. Its fast, easy and secure. Don’t miss out on Fuleap.",
		},
	];
	return (
		<section>
			<article className="w-[96%] mx-auto bg-gray lg:h-[70vh] mt-4 lg:mt-0 rounded-lg py-3 lg:py-0">
				<div className="lg:h-1/3 w-full bg-section bg-fit bg-no-repeat"></div>
				<div className="grid grid-col-1 lg:grid-cols-3 lg:gap-x-6 lg:px-2">
					{work?.map(
						(v: {
							image: string | undefined;
							id: number;
							desc: string;
							name: string;
						}) => (
							<div
								key={v.id}
								className="flex flex-col items-center mx-4 my-4 lg:my-0">
								<img
									src={v.image}
									alt="img"
									className="mx-auto w-24 lg:w-1/2"
								/>
								<h3 className="text-lg lg:text-3xl text-primary font-bold mb-2 mt-4">
									{v.name}
								</h3>
								<p className="text-sm lg:text-base px-6">{v.desc}</p>
							</div>
						)
					)}
				</div>
			</article>
		</section>
	);
};

//SECTION TWO
const Payment = () => {
	return (
		<section className="lg:h-[60vh]  max-w-screen overflow-hidden">
			<article className="w-[96%] flex flex-col lg:flex-row lg:justify-between  h-[90%] mt-10 pb-10  mx-auto rounded-lg bg-white lg:px-4">
				<div className="basis-[100%] lg:basis-[55%] text-left px-2 lg:px-6 py-20  flex flex-col  lg:justify-evenly">
					<h1 className="font-bold text-xl lg:text-4xl lg:leading-tight text-primary text-center lg:text-start">
						Receive payment easily from customers on mobile
					</h1>
					<div className="w-full lg:my-6 mt-6 mb-1 px-1 lg:pr-16">
						<p className=" text-black text-center text-sm lg:text-left lg:text-base leading-normal lg:pr-16">
							Get paid faster and easier by your customers. Generate a QR code
							and let them scan and pay. Fuleap transfers the money to your
							walletinstantly and securely. Fuleap is the smart way to get paid.
							Try it today.
						</p>
					</div>
				</div>
				<div className="basis-[90%] lg:basis-[45%]">
					<img
						src={Phone2}
						alt="phone"
						className="w-[80%] lg:w-fit object-cover mx-auto"
					/>
				</div>
			</article>
		</section>
	);
};

//SECTION THREE
const Records = () => {
	const record = [
		{ id: 1, count: "12.00", name: "Downloaded" },
		{ id: 2, count: "$10 M", name: "Transactions" },
		{ id: 3, count: "1.000", name: "Feedback" },
	];
	return (
		<section className="lg:h-[256px]  max-w-screen overflow-hidden">
			<article className="w-[96%] flex flex-col lg:flex-row lg:justify-around lg:items-center bg-gray h-[90%] mt-10 pb-10  mx-auto rounded-lg  lg:px-4 text-center py-4">
				{record.map((v) => (
					<div
						key={v.id}
						className="  p-4 my-1 md:border-r md:border-[#D8D8D8] md: px-10">
						<h1 className="font-bold text-primary text-3xl md:text-4xl lg:text-5xl">
							{v.count}
						</h1>
						<p className="text-darkgray text-xs md:text-sm lg:text-base mt-2">
							{v.name}
						</p>
						<span className="inline-block md:hidden w-[80%] h-0.5 bg-[#D8D8D8] rounded-full" />
					</div>
				))}
			</article>
		</section>
	);
};

// SECTION FOUR
const StationOnline = () => {
	return (
		<section className="lg:h-[60vh]  max-w-screen overflow-hidden">
			<article className="w-[96%] h-full flex flex-col lg:flex-row lg:justify-center lg:items-center mt-10 pb-10  mx-auto rounded-lg bg-lightPurple lg:px-4">
				<div className="h-1/2 w-full py-4 px-3 mt-2 lg:w-[50%] lg:m-auto lg:px-10 t">
					<h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-primary lg:mb-6">
						What you can do with Aptfuel as a service provider
					</h1>
					<h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4 text-[#3D3269] lg:mb-6">
						Take your stations online
					</h1>
					<p className="text-sm md:text-base lg:text-lg text-darkgray ">
						Get paid faster and easier by your customers. Generate a QR code and
						let them scan and pay. Fuleap transfers the money to your wallet
						instantly and securely. Fuleap is the smart way to get paid. Try it
						today.
					</p>
				</div>
			</article>
		</section>
	);
};

//FIFTH SECTION

const PaymentMethod = () => {
	const method = [
		{
			id: 1,
			name: "Collect payment from all stations",
			desc: "Get paid faster and easier by your customers. Generate a QR code and let them scan and pay. Fuleap transfers the money to your wallet instantly and securely. Fuleap is the smart way to get paid. Try it today.",
			image: Payment1,
		},
		{
			id: 2,
			name: "Withdraw to bank",
			desc: "Get paid faster and easier by your customers. Generate a QR code and let them scan and pay. Fuleap transfers the money to your wallet instantly and securely. Fuleap is the smart way to get paid. Try it today.",
			image: Payment2,
		},
		{
			id: 3,
			name: "Manage your stations",
			desc: "Get paid faster and easier by your customers. Generate a QR code and let them scan and pay. Fuleap transfers the money to your wallet instantly and securely. Fuleap is the smart way to get paid. Try it today.",
			image: Payment3,
		},
		{
			id: 4,
			name: "Set your stations location",
			desc: "Get paid faster and easier by your customers. Generate a QR code and let them scan and pay. Fuleap transfers the money to your wallet instantly and securely. Fuleap is the smart way to get paid. Try it today.",
			image: Payment4,
		},
	];
	return (
		<section className="lg:h-full  max-w-screen overflow-hidden">
			<article className="w-[96%] h-full mx-auto rounded-lg mt-10 lg:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6  lg:py-4">
				{method.map((v) => (
					<div className="bg-gray rounded-xl py-10" key={v.id}>
						<div className="w-[80%] mx-auto">
							<img src={v.image} alt="" className="w-[90%] h-1/2" />
							<h1 className="font-bold text-primary  text-xl lg:text-3xl text-left my-4">
								{v.name}
							</h1>
							<p className="text-left text-sm">{v.desc}</p>
						</div>
					</div>
				))}
			</article>
		</section>
	);
};

const Star = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-4 h-4 md:w-10 md:h-10 text-[#FFB545]">
			<path
				fillRule="evenodd"
				d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
				clipRule="evenodd"
			/>
		</svg>
	);
};
// REVIEWS
const Review = () => {
	const reviews = [
		{ id: 1, photo: Photo1, name: "Nattasha", content: "" },
		{ id: 2, photo: Photo1, name: "Joe Cook", content: "" },
		{ id: 3, photo: Photo1, name: "Jessica Jobs", content: "" },
	];
	return (
		<section className="lg:h-full max-w-screen overflow-hidden ">
			<article className="w-[96%] h-full mx-auto rounded-lg mt-10 lg:mt-6 grid grid-cols-1 gap-6 py-10  lg:py-36 bg-lightPurple ">
				{reviews.map((v) => (
					<div
						key={v.id}
						className="w-[90%] lg:h-[340px] bg-white max-w-[950px] mx-auto rounded-2xl">
						<div className="w-[90%] h-20 md:h-32 mt-3 border-b border-darkgray mx-auto  flex justify-between items-center">
							<div className="flex justify-between items-center">
								<img
									src={Photo1}
									alt=""
									className="h-10 w-10 md:h-16 md:w-16 rounded-full mr-3"
								/>
								<h3 className="font-bold text-sm lg:text-xl text-darkPurple">
									{v.name}
								</h3>
							</div>
							<div className="flex">
								{[1, 2, 3, 4, 5].map((i) => (
									<Fragment key={i}>
										<Star />
									</Fragment>
								))}
							</div>
						</div>
						<div className="w-[90%] mx-auto text-darkgray md:mt-4 py-4 md:pr-10">
							<p className="text-left text-xs md:text-base">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<p className="text-left text-xs md:text-base">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
				))}
			</article>
		</section>
	);
};

//REVIEW OVERVIEW
const Ratings = () => {
	const rate = [
		{ id: 1, rate: "4.5/5", text: "On the iOS App Store" },
		{ id: 2, rate: "4.8/5", text: "On the Android Play Store." },
	];
	return (
		<section className="lg:h-48 max-w-screen overflow-hidden my-14">
			<article className="h-full mx-auto rounded-lg mt-10 lg:mt-6 ">
				<div className="w-full md:w-1/2 mx-auto flex flex-col justify-between items-center md:flex-row md:items-center md:justify-evenly">
					{rate.map((v) => (
						<div
							key={v.id}
							className="md:w-56  flex flex-col justify-center items-center py-4 md:py-2">
							<h1 className="font-bold text-primary text-3xl md:text-4xl lg:text-6xl">
								{v.rate}
							</h1>
							<div className="flex my-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<Fragment key={i}>
										<Star />
									</Fragment>
								))}
							</div>
							<p className="text-primary font-bold">{v.text}</p>
						</div>
					))}
				</div>
			</article>
		</section>
	);
};

const Check = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className="w-6 h-6 text-[#FFFF00]">
		<path
			fillRule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
			clipRule="evenodd"
		/>
	</svg>
);

// BEFORE THE FOOTER
const FastWay = () => {
	const details = [
		{ id: 1, name: "Get directions to stations" },
		{ id: 2, name: "Check best prices for gas" },
		{ id: 3, name: "Get real time update" },
		{ id: 4, name: "Get gas delivered (coming soon)" },
		{ id: 5, name: "Pay for gas with a click" },
	];
	return (
		<section className="lg:h-[60vh] max-w-screen overflow-hidden bg-black">
			<article className="w-[96%] h-full mx-auto rounded-lg mt-10 lg:mt-6 grid grid-cols-1 gap-6 px-2 md:px-0 ">
				<div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
					<div className="basis-[100%] lg:basis-[50%] text-left ">
						<div className="w-full  lg:w-[70%] mx-auto mb-3 lg:mb-0">
							<h1 className="font-bold text-2xl lg:text-4xl text-[#8C8C8C]">
								The fastest way to get gas{" "}
								<span className="text-white">is with Fuleap.</span>
							</h1>
							<p className="text-[13.3px] text-white my-6  md:text-left">
								Feels great in low Lorem ipsum dolor sit amet, consectetur
								adipisicing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua.light n
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 w-full text-white">
								{details?.map((v) => (
									<div
										key={v.id}
										className="flex items-center gap-x-1  text-sm">
										<Check />
										<p>{v.name}</p>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="basis-[100%] lg:basis-[50%] mt-6 md:mt-0">
						<img
							src={image}
							alt=""
							className="lg:h-[70%] lg:w-[70%] object-contain"
						/>
					</div>
				</div>
			</article>
		</section>
	);
};
const LandingPage = (): ReactElement => {
	return (
		<main className="max-w-screen overflow-x-hidden">
			<Layout>
				<Fragment>
					<Hero />
					<HowWeWork />
					<Payment />
					<Records />
					<StationOnline />
					<PaymentMethod />
					<Review />
					<Ratings />
					<FastWay />
				</Fragment>
			</Layout>
		</main>
	);
};

export default LandingPage;
