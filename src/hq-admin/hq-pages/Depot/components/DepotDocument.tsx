import React from "react";

export default function DepotDocuments({ legalDocs }: any) {
	return (
		<section>
			<article>
				<div className=" h-[30rem] w-full ">
					<img
						src={legalDocs?.certificateOfIncorporation?.url}
						alt="certificateOfIncorporation"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="bg-red-900 h-[30rem] w-full mt-10">
					<img
						src={legalDocs?.taxIdentificationNumber?.url}
						alt="taxIdentificationNumber"
						className="w-full h-full object-cover"
					/>
				</div>
			</article>
		</section>
	);
}
