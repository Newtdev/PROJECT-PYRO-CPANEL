export default function ReceiptCard(props: any) {
	function splitByUpperCase(str: string): string {
		const result = str
			.trim()
			.split(/(?=[A-Z])/)
			.join(" ")
			.trim()
			.toUpperCase();

		return result;
	}
	return (
		<div className="w-full h-full  rounded-lg text-[14px] py-6">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
				{Object.entries(props?.data)?.map((dt: any) => {
					return (
						<div key={dt.id}>
							<h2 className="text-black">{splitByUpperCase(dt[0])}</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg"></span>
							<h2 className="text-[#002E66]">{dt[1]}</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
}
