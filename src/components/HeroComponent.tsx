import appStore from "../assets/img/appstore.svg";
import playstore from "../assets/img/googleplay.svg";

export const HeroComp = ({
	header = "Are you prepared to commence refueling your vehicle",
	desc = "We provide a seamless and efficient approach that offers",
	hide = true,
	img,
}: {
	header: string;
	desc: string;
	hide?: boolean;
	img: string;
}) => {
	return (
		<article className="w-[96%] flex flex-col lg:flex-row lg:justify-between  h-[90%] mt-10 pb-10  mx-auto rounded-lg bg-slate-400 lg:first-letter:px-4">
			<div className="basis-[100%] lg:basis-[55%] text-left px-2 lg:px-6 py-20  flex flex-col  lg:justify-evenly">
				<h1 className="font-bold text-3xl lg:text-5xl lg:leading-tight text-primary text-center lg:text-start">
					{header}
				</h1>
				<div className="w-full my-6 px-1 lg:pr-16">
					<p className=" text-black text-center lg:text-left lg:text-lg leading-normal lg:pr-16">
						{desc}
					</p>
				</div>

				{hide ? (
					<div className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center mt-4">
						<img
							src={playstore}
							alt="google play"
							className="mr-4 lg:mr-6 w-32 lg:w-36"
						/>
						<img src={appStore} alt="app store" className="w-32 lg:w-36" />
					</div>
				) : null}
			</div>
			<div className="basis-[90%] lg:basis-[45%]">
				<img
					src={img}
					alt="phone"
					className="w-[80%] lg:w-1/2 object-cover mx-auto"
				/>
			</div>
		</article>
	);
};
