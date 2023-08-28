import { RemoveCircleOutlineSharp } from "@mui/icons-material";
import { useFormik } from "formik";
import { ChangeEvent, useCallback } from "react";
import { useAddNewSelfHelpMutation } from "src/api/selfHelpApislice";
import { Button } from "src/components/Button";

import { FormInput, SelectInput, TextArea } from "src/components/inputs";
import { ShowVideoAndImage } from "src/components/RenderImagePreview";
import { Upload } from "src/components/Upload";
import {
	convert2base64,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import * as Yup from "yup";

const AddNewSelfHelpValidation = Yup.object({
	title: Yup.string().label("Title").required(),
	description: Yup.string().label("Description").required(),
	type: Yup.string().label("Media type").required(),
	media: Yup.array().of(Yup.string().notRequired()),
	body: Yup.array().of(Yup.string().label("Body").required()),
});
export type selfHelpValidation = {
	title: string;
	description: string;
	type: "IMAGE" | "VIDEOS" | string;
	media: string[];
	body: string[];
};

const AddNewSelfHelp = () => {
	const [AddNewSelfHelp, addNewResult] = useAddNewSelfHelpMutation();

	async function addNewHQ(values: selfHelpValidation) {
		try {
			const response = await AddNewSelfHelp(values).unwrap();

			SuccessNotification(response?.status);
		} catch (error: any) {
			handleNotification(error);
		}
	}

	const Formik = useFormik<selfHelpValidation>({
		initialValues: {
			title: "",
			description: "",
			type: "",
			media: [],
			body: [""],
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddNewSelfHelpValidation,
		onSubmit: (values) => {
			addNewHQ(values);
		},
	});
	const styles =
		"h-[38px] py-6 rounded-full w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
		{
			id: "description",
			name: "Description",
			styles: `${styles} ${
				Formik.errors.description && Formik.touched.description
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.description,
			onBlur: Formik.handleBlur,
			disabled: addNewResult?.isLoading,
			error: Formik.errors.description,
			touched: Formik.touched.description,
		},
	];

	async function uploadSelfImage(e: { [index: string]: string | any }) {
		const type = e.target.files[0].type;
		if (type === "video/mp3") {
			Formik.setFieldValue("media", [await convert2base64(e.target.files[0])]);
		} else {
			Formik.setFieldValue("media", [
				...(Formik.values?.media ?? []),
				await convert2base64(e.target.files[0]),
			]);
		}
	}

	const addMoreFAQ = useCallback(() => {
		Formik.setFieldValue("body", [...(Formik.values?.body || []), ""]);
	}, [Formik]);

	// REMOVE ITEM FAQS INPUT
	const removeMoreFAQ = useCallback(
		(id: number) => {
			const removedId = [...(Formik.values?.body || [])].filter(
				(_, i) => i !== id
			);
			Formik.setFieldValue("body", removedId);
		},
		[Formik]
	);

	//FILTER DELETE SELECTED IMAGE OR VIDEO
	const removeImage = useCallback(
		(id: number | string) => {
			const data = Formik.values.media?.filter(
				(_, i: string | number) => i !== id
			);
			Formik.setFieldValue("media", data);
		},

		[Formik]
	);
	return (
		<section>
			<form
				onSubmit={Formik.handleSubmit}
				className=" flex flex-col justify-center items-center px-10 mt-4 h-fit w-2/3 mx-auto bg-white py-4 rounded-lg ">
				<div className="grid grid-cols-1 w-full gap-x-2 content-center">
					<FormInput
						id="title"
						name="Title"
						type="text"
						styles={`${styles} ${
							Formik.errors.title && Formik.touched.title
								? "border-red-500"
								: "border-gray-300"
						}`}
						labelStyles={labelStyles}
						onChange={Formik.handleChange}
						value={Formik.values.title}
						onBlur={Formik.handleBlur}
						disabled={addNewResult?.isLoading}
						error={Formik.errors.title}
						touched={Formik.touched.title}
					/>
				</div>

				<TextArea {...FormData[0]} />
				<div className="w-full">
					<SelectInput
						id="type"
						data={["IMAGE", "VIDEO"]}
						labelStyles={labelStyles}
						name="Select type"
						onChange={Formik.handleChange}
						value={Formik.values.type}
					/>
				</div>
				<div className="flex-col w-full items-center justify-between ">
					<ShowVideoAndImage
						media={Formik.values?.media || []}
						type={Formik.values.type}
						removeImage={(id) => removeImage(id)}
					/>
					<div className="w-full h-24 mt-4">
						<Upload
							name="avatar"
							text="Click to upload Image"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								uploadSelfImage(e);
							}}
						/>
					</div>
				</div>
				<div className="w-full">
					{Formik.values.body?.map((_v, i) => (
						<div className="flex w-full flex-row items-center">
							<div className="w-full">
								<FormInput
									width="w-full"
									id={`body.[${i}]`}
									name={`Step ${i + 1}`}
									type="text"
									styles={styles}
									labelStyles={labelStyles}
									onChange={Formik.handleChange}
									value={Formik.values?.body[i]}
									onBlur={Formik.handleBlur}
									// disabled={_v.disabled}
									// error={Formik.errors?.faqs[i]?.question || ""}
									// touched={Formik.touched.faqs[i]?.question || ""}
								/>
							</div>

							<div
								className="flex items-center justify-evenly w-24 text-black cursor-pointer mt-14"
								onClick={() => removeMoreFAQ(i)}>
								<RemoveCircleOutlineSharp />
							</div>
						</div>
					))}
					<Button
						text="Add more steps"
						type="button"
						className="mr-auto py-2 px-6 rounded-lg cursor-pointer mt-6 text-white bg-[#002E66]"
						onClick={addMoreFAQ}
					/>
				</div>
				<div className="w-full">
					<Button
						text={"Submit"}
						disabled={addNewResult?.isLoading}
						showModal={addNewResult?.isLoading}
						className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
			</form>
		</section>
	);
};

export default AddNewSelfHelp;
