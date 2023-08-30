import React, { ReactNode } from "react";
import Image from "./Image";
import Logo from "src/assets/img/logo.svg";

export default function AuthWrapper({
	children,
	name,
}: {
	children: ReactNode;
	name: string;
}) {
	return (
		<section className="w-screen h-screen">
			<article className="h-full w-full flex flex-col justify-center backgroundImage">
				<div className=" mx-auto flex h-[96%] max-h-[790px] rounded-[30px] flex-col items-center w-[90%] sm:max-w-[570px] bg-white">
					<div className=" mt-[53px]">
						<div className="mb-6">
							<Image image={Logo} width={120} height={62} styles="mx-auto" />
						</div>
						<h1 className="text-[20px] font-normal leading-[30px] text-black">
							{name}
						</h1>
					</div>
					{children}
				</div>
			</article>
		</section>
	);
}
