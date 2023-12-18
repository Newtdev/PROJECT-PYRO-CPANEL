import React from "react";
import { useFormik } from "formik";
import { Button } from "./Button";
import { useAddAmenitiesMutation } from "src/hq-admin/hq-api/hqTransactionApiSlice";
import { useAuth } from "src/hooks/useAuth";
import InputComp from "./InputComp";

import {
	ErrorNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

export default function AddAmenities({ onClose }: any) {
	const { user } = useAuth();
	const [addAmenitiesMutation, result] = useAddAmenitiesMutation();
	const formik = useFormik({
		initialValues: {
			amenities: [
				{
					name: "",
				},
			],
		},
		validateOnBlur: true,
		validateOnChange: true,
		// validationSchema: yup.object().shape({
		// 	products: yup.array({
		// 		name: yup.string().label("Product name").required(),
		// 		unit: yup.string().label("Product unit").required(),
		// 		price: yup.string().label("Product price").required(),
		// 	}),
		// }),
		onSubmit: async (values) => {
			try {
				const response = await addAmenitiesMutation({
					id: user?.stationHQ,
					...values,
				}).unwrap();
				SuccessNotification(response);
			} catch (error: any) {
				ErrorNotification(error?.data?.message);
			}

			onClose();
		},
	});

	function addMore() {
		formik.setFieldValue("amenities", [...formik.values.amenities, {}]);
	}
	function removeAmenities(id: number) {
		formik.setFieldValue("amenities", [
			...formik.values.amenities.filter((_, i) => i !== id),
		]);
	}
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="px-4">
				{formik.values.amenities.map((d, i) => {
					return (
						<div className="flex items-center justify-between  gap-x-4">
							<div className="w-full">
								<InputComp
									label={`Amenities name ${i + 1}`}
									placeholder={`Amenities name ${i + 1}`}
									{...formik.getFieldProps(`amenities.${[i]}.name`)}
								/>
							</div>
							<div className="flex items-center  mt-12">
								<IconButton
									className="mt-6  block"
									onClick={() => removeAmenities(i)}>
									<RemoveCircle />
								</IconButton>
							</div>
						</div>
					);
				})}
				<div>
					<button className="mt-3" type="button" onClick={addMore}>
						Add More
					</button>
				</div>
				<div>
					<Button
						text="Add New Amenities"
						showModal={result.isLoading}
						// disabled={props.apiResult?.isLoading}
						// showModal={props.apiResult?.isLoading}
						className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
			</div>
		</form>
	);
}
