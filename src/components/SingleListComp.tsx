const SingleListComp = ({ name, value }: { name: string; value: string }) => (
	<div className="flex flex-col justify-center items-center gap-y-4">
		<div className="w-[49px] h-[49px] rounded-full bg-emerald-900">
			<img src="" alt="" />
		</div>
		<div>
			<p className="text-sm text-center">{name}</p>
			<h6 className="text-center mt-2 ">{value}</h6>
		</div>
	</div>
);

export default SingleListComp;
