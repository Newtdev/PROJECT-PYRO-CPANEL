import React, { useMemo, useState } from "react";
import { Button } from "src/components/Button";
import useCustomLocation from "src/hooks/useCustomLocation";

import { format } from "date-fns";
import { LoaderContainer } from "src/components/LoaderContainer";

import {
	ErrorNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { useNavigate } from "react-router-dom";

import DepotProducts from "./components/DepotProducts";

import { useSingleDepotQuery } from "src/api/manageBranchAPISlice";
import { FormModal } from "src/components/ModalComp";
import RequestProduct from "src/components/RequestProduct";
import SingleListComp from "src/components/SingleListComp";

// TAB DATA FOR TABLE TAB
// const tabData: { id: number; value: string; label: string }[] = [
// 	{ id: 1, value: "one", label: "Depot Products" },
// ];

export default function SingleDepot() {
	const { slicedPath } = useCustomLocation();
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const getSingleDepotQuery = useSingleDepotQuery(slicedPath[2]);
	console.log(
		"🚀 ~ file: SingleDepot.tsx:35 ~ SingleDepot ~ getSingleDepotQuery:",
		getSingleDepotQuery
	);
	const [tab, setTab] = useState("one");

	const depotDetails = useMemo(
		() => getSingleDepotQuery?.data?.depot[0],
		[getSingleDepotQuery]
	);

	function handleDepotProductRequestModal() {
		setShowModal((prevState) => !prevState);
	}

	return (
		<section>
			<LoaderContainer data={getSingleDepotQuery}>
				<article>
					<div className="flex flex-col items-center gap-y-6">
						<div>
							<img
								src={depotDetails?.logo?.url}
								className="h-[97px] w-[97px]  rounded-full object-cover"
								alt=""
							/>
						</div>
						<div className="text-2xl ">
							<h3 className="text-darkGray">Deport name </h3>

							<h6 className="font-bold text-black mt-3">
								{depotDetails?.name}
							</h6>
						</div>
						<div className=" ">
							<Button
								className=" bg-primary text-white px-5 py-2 text-sm font-semibold  md:w-[150px] rounded-3xl"
								text="Request"
								type="button"
								onClick={handleDepotProductRequestModal}
							/>
						</div>
						<div>
							<div className="grid grid-cols-3 justify-content-center py-5">
								<SingleListComp
									name="Date added"
									value={format(
										new Date(depotDetails?.createdAt || null),
										"d-M-yyyy h:m:s"
									)}
								/>
								<SingleListComp
									name="Products"
									value={depotDetails?.totalProducts}
								/>

								<SingleListComp name="Location" value={depotDetails?.address} />
							</div>
						</div>
					</div>

					<DepotProducts products={depotDetails?.products} />
				</article>
			</LoaderContainer>
			{showModal ? (
				<FormModal
					name="Request for product"
					onClick={handleDepotProductRequestModal}>
					<RequestProduct onClose={handleDepotProductRequestModal} />
				</FormModal>
			) : null}
		</section>
	);
}
