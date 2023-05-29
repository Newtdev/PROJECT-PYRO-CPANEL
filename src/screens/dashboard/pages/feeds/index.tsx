import { Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { ChangeEvent, Fragment, Key, useMemo } from "react";
import { useFetchAllFeedsQuery } from "src/api/feedsApiSlice";
import { Button } from "src/components/Button";
import Image from "src/components/Image";
import { FormInput, TextArea } from "src/components/inputs";
import { LoaderContainer } from "src/components/LoaderContainer";
import { Upload } from "src/components/Upload";
import { formatDateToSocialMediaStandard } from "src/helpers/helperFunction";
import * as Yup from "yup";

export default function Feeds() {
	const feedsResult = useFetchAllFeedsQuery("");

	const handleApiResponse = useMemo(() => {
		return feedsResult?.currentData?.feeds;
	}, [feedsResult]);

	return (
		<section>
			<article className="bg-white rounded-lg mt-10 h-screen">
				<div className=" flex items-center justify-end w-full">
					<div className="w-[189px] h-11 mr-6">
						<Button
							text="Add Feeds"
							className="h-full font-bold text-white rounded-[38px] w-full hover: bg-[#002E66] flex items-center justify-start pl-4 mt-4"
							type="button"
							showIcon={true}
							// onClick={() =>
							// 	navigate(APP_ROUTE.ADD_NEW_SELF_HELP, {
							// 		replace: true,
							// 		state: "Add New Self Help",
							// 	})
							// }
						/>
					</div>
				</div>
				<LoaderContainer data={feedsResult}>
					<div className="w-full h-fit grid grid-cols-2 mt-10 gap-6 px-10">
						{handleApiResponse?.data?.map(
							(
								_v: { createdAt: Date; title: string; body: string },
								i: Key
							) => {
								return (
									<div className="h-fit mt-6 border px-2 py-4 border-[#636685] rounded-xl">
										<div className="flex justify-end w-full pr-2 capitalize text-sm">
											{formatDateToSocialMediaStandard(_v?.createdAt)}
										</div>
										<div className="flex w-full justify-between items-center px-6 text-start text-[#1E1E1E] text-[12px] mt-4">
											<h4 className="font-bold text-xl">{_v?.title}</h4>
										</div>
										<div>
											<p className="text-justify text-sm px-6 leading-[20px] mt-3">
												{_v?.body}
											</p>
										</div>
										<div className="h-56 w-full px-2 mt-4">
											<Image
												image="https://static.vecteezy.com/packs/media/photo/hero-800px-9fbe463f.jpg"
												width={100}
												height={100}
												styles="w-full h-full object-cover rounded-lg"
											/>
										</div>
										<div className="flex justify-between items-center px-2 mt-4">
											<div className="mt-4 w-fit flex items-center text-sm text-black">
												<Image
													image="https://static.vecteezy.com/packs/media/photo/hero-800px-9fbe463f.jpg"
													styles="w-12 h-12 object-cover rounded-full mr-2"
												/>
												<h1>Thomas Ejembi</h1>
											</div>
											<div className="mt-4 cursor-pointer">
												<Delete fontSize="large" />
											</div>
										</div>
									</div>
								);
							}
						)}
					</div>
				</LoaderContainer>
			</article>
		</section>
	);
}

const AddNewSelfHelpValidation = Yup.object({
	title: Yup.string().label("Title").required(),
	description: Yup.string().label("Description").required(),
	type: Yup.string().label("Media type").required(),
	media: Yup.array().of(Yup.string().notRequired()),
	body: Yup.array().of(Yup.string().label("Body").required()),
});
export type selfHelpValidation = Yup.InferType<typeof AddNewSelfHelpValidation>;

const AddNewSelfHelp = () => {
	// const [AddNewSelfHelp, addNewResult] = useAddNewSelfHelpMutation();

	// async function addNewHQ(values: selfHelpValidation) {
	// 	try {
	// 		const response = await AddNewSelfHelp(values).unwrap();

	// 		SuccessNotification(response?.status);
	// 	} catch (error: any) {
	// 		handleNotification(error);
	// 	}
	// }

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
			// addNewHQ(values);
		},
	});
	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
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
			// disabled: addNewResult?.isLoading,
			error: Formik.errors.description,
			touched: Formik.touched.description,
		},
	];

	// async function uploadSelfImage(e: { [index: string]: string | any }) {
	// 	const type = e.target.files[0].type;
	// 	if (type === "video/mp3") {
	// 		Formik.setFieldValue("media", [await convert2base64(e.target.files[0])]);
	// 	} else {
	// 		Formik.setFieldValue("media", [
	// 			...(Formik.values?.media ?? []),
	// 			await convert2base64(e.target.files[0]),
	// 		]);
	// 	}
	// }

	return (
		<section>
			<form
				onSubmit={Formik.handleSubmit}
				className=" flex flex-col justify-center items-center px-4 h-fit w-2/3 mx-auto">
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
						// disabled={addNewResult?.isLoading}
						error={Formik.errors.title}
						touched={Formik.touched.title}
					/>
				</div>

				<TextArea {...FormData[0]} />

				<div className="flex-col w-full items-center justify-between ">
					<ShowVideoAndImage
						media={Formik.values?.media || []}
						type={Formik.values.type}
					/>
					<div className="w-full h-24 mt-4">
						<Upload
							name="avatar"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								// uploadSelfImage(e);
							}}
						/>
					</div>
				</div>

				<div className="w-full">
					<Button
						text={"Submit"}
						// disabled={addNewResult?.isLoading}
						// showModal={addNewResult?.isLoading}
						className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
			</form>
		</section>
	);
};

const ShowVideoAndImage = ({
	media,
	type,
}: {
	media: string[] | any;
	type: string;
}) => {
	return (
		<>
			{type.toLowerCase() === "image" && media.length > 0 ? (
				<div className="w-full flex  items-center overflow-x-auto py-2 h-fit">
					{media?.map((_v: string, i: React.Key) => {
						return (
							<Fragment key={i}>
								<Image
									image={_v || ""}
									width={200}
									height={200}
									styles="h-24 object-cover"
								/>
							</Fragment>
						);
					})}
				</div>
			) : null}
			{type.toLowerCase() === "video" &&
			media.length > 0 &&
			media.length === 1 ? (
				<div className="flex items-center overflow-x-auto py-2 h-full">
					{media?.map((_v: string, i: React.Key) => {
						return (
							<Fragment key={i}>
								<video width={"100%"} src={_v} controls></video>
							</Fragment>
						);
					})}
				</div>
			) : null}
		</>
	);
};
