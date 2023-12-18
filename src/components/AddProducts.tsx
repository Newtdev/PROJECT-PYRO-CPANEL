import { useFormik } from "formik";
import React from "react";
import { Button } from "./Button";
import * as yup from "yup";
import { SelectInput } from "./inputs";
import { useAddProductsMutation } from "src/hq-admin/hq-api/hqTransactionApiSlice";
import { useAuth } from "src/hooks/useAuth";
import InputComp from "./InputComp";
import CustomizedSwitches from "./SwitchComp";
import {
	ErrorNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";

export default function AddProducts({ onClose }: any) {
	const { user } = useAuth();
	const [addProductMutation, result] = useAddProductsMutation();
	const formik = useFormik({
		initialValues: {
			products: [
				{
					name: "",
					unit: "",
					price: "",
					isAvailable: false,
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
				const response = await addProductMutation({
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
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="px-4">
				<InputComp
					label="Product name"
					placeholder="Product name"
					{...formik.getFieldProps(`products.${[0]}.name`)}
				/>
				<InputComp
					label="unit"
					placeholder="Product unit"
					{...formik.getFieldProps(`products.${[0]}.unit`)}
				/>

				<InputComp
					label="Price"
					placeholder="Product price"
					{...formik.getFieldProps(`products.${[0]}.price`)}
				/>

				<div>
					<label
						htmlFor=""
						className="block mb-[6px]  text-start font-normal text-[14px] text-black ml-5 my-6">
						Is The Product Available
					</label>
					<div className="pl-6">
						<CustomizedSwitches
							off="No"
							on="Yes"
							{...formik.getFieldProps(`products.${[0]}.isAvailable`)}
						/>
					</div>
				</div>
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

let data = [
	{ name: "Yes", value: true },
	{ name: "No", value: true },
];
