import { useFormik } from "formik";
import React from "react";
import { Button } from "./Button";

import { useAddProductsMutation } from "src/hq-admin/hq-api/hqTransactionApiSlice";
import { useAuth } from "src/hooks/useAuth";
import InputComp from "./InputComp";
import {
	ErrorNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import { IconButton, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { depotProducts } from "src/features/auth/authSlice";
import { RemoveCircle } from "@mui/icons-material";
import { useRequestDepotProductMutation } from "src/api/manageBranchAPISlice";

export default function RequestProduct({ onClose }: any) {
	const products = useSelector(depotProducts);

	const [requestProductMutation, result] = useRequestDepotProductMutation();
	const formik = useFormik({
		initialValues: {
			depot: products[0]?.depot,
			details: [
				{
					product: "",
					requestedVolume: 5,
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
				const response = await requestProductMutation(values).unwrap();
				SuccessNotification(response);
			} catch (error: any) {
				ErrorNotification(error?.data?.message);
			}

			onClose();
		},
	});
	function addMore() {
		formik.setFieldValue("details", [
			...formik.values.details,
			{ product: "", requestedVolume: 0 },
		]);
	}
	function removeAmenities(id: number) {
		formik.setFieldValue("details", [
			...formik.values.details.filter((_, i) => i !== id),
		]);
	}
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="px-4">
				{formik.values?.details.map((_, i) => (
					<div className="grid grid-cols-2 gap-x-2">
						<div>
							<label
								htmlFor=""
								className="block mb-[6px]  text-start font-normal text-[14px] text-black ml-5 my-6">
								Product details {i + 1}
							</label>
							<Select
								fullWidth
								className="rounded-full "
								sx={{ borderRadius: 1000 }}
								onChange={(_, value: any) =>
									formik.setFieldValue(
										`details.${[i]}.product`,
										value.props?.id
									)
								}>
								{products.map((dt: any, i: number) => (
									<MenuItem key={i + 1} id={dt._id} value={dt?.name}>
										{dt?.name}
									</MenuItem>
								))}
							</Select>
						</div>
						<div className="flex items-center ">
							<InputComp
								label="Request volume"
								placeholder="Request volume"
								{...formik.getFieldProps(`details.${[i]}.requestedVolume`)}
							/>
							<div className=" flex items-center gap-x-2 mt-12">
								<IconButton
									className="block "
									onClick={() => removeAmenities(i)}>
									<RemoveCircle />
								</IconButton>
							</div>
						</div>
					</div>
				))}
				<button className="mt-4 text-sm pl-3" type="button" onClick={addMore}>
					Add More
				</button>

				<div>
					<Button
						text="Add New Products"
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
