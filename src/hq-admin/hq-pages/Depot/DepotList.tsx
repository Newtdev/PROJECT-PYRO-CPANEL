import React, { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDepotListQuery } from "src/api/manageBranchAPISlice";
import { Button } from "src/components/Button";
import { LoaderContainer } from "src/components/LoaderContainer";
import { SearchInput } from "src/components/inputs";
import { APP_ROUTE, HQ_APP_ROUTE } from "src/helpers/Constant";
import useCustomLocation from "src/hooks/useCustomLocation";
import { useDebounce } from "src/hooks/useDebounce";

const DepotCard = ({ name, logo, address, id }: any) => {
	const navigate = useNavigate();

	function fn() {
		navigate(`/depot/${id}`, {
			state: name,
		});
	}
	return (
		<div
			className="flex flex-col justify-center items-center gap-y-5 py-10 shadow-lg rounded-2xl cursor-pointer"
			onClick={fn}>
			<div className="h-24 w-24 rounded-full bg-white">
				<img src={logo?.url} alt="log" className="w-full h-full" />
			</div>

			<div>
				<h2 className="text-xl font-bold text-primary">{name}</h2>
			</div>
			<div className="w-3/4">
				<h5 className="font-bold text-black">Location</h5>
				<p className="text-sm text-lightgray">{address}</p>
			</div>
		</div>
	);
};

export default function DepotList() {
	const [filteredValue, setFilteredValue] = useState<string>("");
	const { debouncedValue } = useDebounce(filteredValue, 700);
	const navigate = useNavigate();

	const depotListResult = useGetDepotListQuery({
		...(debouncedValue !== "" && { search: debouncedValue }),
	});
	const DepotListData = useMemo(
		() => depotListResult?.data?.depots,
		[depotListResult]
	);

	return (
		<section>
			<LoaderContainer data={depotListResult}>
				<article className="">
					<div className="flex justify-between items-center mt-6 h-20">
						<div className="flex w-[50%] h-11  max-w-[562px] items-center gap-2 rounded-[15px] border-2 border-[#D0D5DD] bg-[#D9D9D9] px-[18px]">
							<SearchInput
								name="branch-search"
								placeholder="Search for name"
								value={filteredValue}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const target = e.target;
									setFilteredValue(target.value);
								}}
							/>
						</div>
						<div className="w-fit flex items-center">
							<Button
								text="Orders"
								className="h-full font-bold text-white px-10 py-2 rounded-[38px] text-center w-full hover: bg-[#002E66] flex items-center justify-start "
								type="button"
								onClick={() => navigate(HQ_APP_ROUTE.REQUEST_LIST)}
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-10  lg:grid-cols-3 xxl:grid-cols-4 py-3 mt-6">
						{DepotListData?.data.map((dt: any, i: number) => (
							<Fragment key={i + 1}>
								<DepotCard {...dt} />
							</Fragment>
						))}
					</div>
				</article>
			</LoaderContainer>
		</section>
	);
}
