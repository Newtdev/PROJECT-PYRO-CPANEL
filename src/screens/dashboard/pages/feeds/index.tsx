import { Delete, HighlightOffOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import {
	useAddNewFeedsMutation,
	useFetchAllFeedsQuery,
} from "src/api/feedsApiSlice";
import { Button } from "src/components/Button";
import { Lines } from "src/components/Icons";
import Image from "src/components/Image";
import { FormInput, TextArea } from "src/components/inputs";
import { LoaderContainer } from "src/components/LoaderContainer";
import { Modal } from "src/components/ModalComp";
import { ShowVideoAndImage } from "src/components/RenderImagePreview";
import { Upload } from "src/components/Upload";
import {
	convert2base64,
	formatDateToSocialMediaStandard,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import * as Yup from "yup";

export default function Feeds() {
	const [showAddModal, setShowAddModal] = useState(false);
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
							onClick={() => setShowAddModal(true)}
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

				{showAddModal ? (
					<Modal>
						<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
							<div className="w-[50%] max-w-[511px] h-fit flex flex-col justify-center rounded-[20px] pb-10 bg-white">
								<div className="w-full h-12 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
									<h1>Create Feeds</h1>
									<button
										onClick={() => setShowAddModal(false)}
										disabled={false}>
										<HighlightOffOutlined
											fontSize="large"
											className="text-black cursor-pointer"
										/>
									</button>
								</div>
								<div className="w-full">
									<Lines />
								</div>

								{/* <Divider /> */}

								<AddNewSelfHelp close={() => setShowAddModal(false)} />
							</div>
						</div>
					</Modal>
				) : null}
			</article>
		</section>
	);
}

// ADD FEEDS
const AddNewFeedsValidation = Yup.object({
	title: Yup.string().label("Title").required(),
	body: Yup.string().label("body").required(),
	media: Yup.array().of(Yup.string().notRequired()),
});
export type newFeedsValidation = Yup.InferType<typeof AddNewFeedsValidation>;

const AddNewSelfHelp = ({ close }: { close: () => void }) => {
	const [addNewFeeds, addNewFeedsResult] = useAddNewFeedsMutation();

	async function SubmitNewFeeds(values: newFeedsValidation) {
		try {
			const response = await addNewFeeds(values).unwrap();
			if (response) {
				close();
			}
			SuccessNotification(response?.status);
		} catch (error: any) {
			close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<newFeedsValidation>({
		initialValues: {
			title: "",
			body: "",
			media: [],
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: AddNewFeedsValidation,
		onSubmit: (values) => {
			SubmitNewFeeds(values);
		},
	});
	const styles =
		"h-[38px] py-6 rounded-lg w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
		{
			id: "body",
			name: "Description",
			styles: `${styles} ${
				Formik.errors.body && Formik.touched.body
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.body,
			onBlur: Formik.handleBlur,
			disabled: addNewFeedsResult?.isLoading,
			error: Formik.errors.body,
			touched: Formik.touched.body,
		},
	];

	const uploadSelfImage = useCallback(
		async (e: any) => {
			const file = e.target.files[0];

			Formik.setFieldValue("media", [
				...(Formik.values?.media ?? []),
				await convert2base64(file),
			]);
		},
		[Formik]
	);

	const removeImage = useCallback(
		(id: number | string) => {
			if (Formik.values.media?.length === 1) return;

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
				className=" flex flex-col justify-center items-center px-4 h-fit w-full mx-auto">
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
						disabled={addNewFeedsResult?.isLoading}
						error={Formik.errors.title}
						touched={Formik.touched.title}
					/>
				</div>

				<TextArea {...FormData[0]} />

				<div className="flex-col w-full items-center justify-between overflow-x-auto ">
					<ShowVideoAndImage
						media={Formik.values?.media || []}
						type={"Image"}
						removeImage={(id) => removeImage(id)}
					/>
					<div className="w-full h-24 mt-4">
						<Upload
							name="avatar"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								uploadSelfImage(e);
							}}
						/>
					</div>
				</div>

				<div className="w-full">
					<Button
						text={"Submit"}
						disabled={addNewFeedsResult?.isLoading}
						showModal={addNewFeedsResult?.isLoading}
						className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
			</form>
		</section>
	);
};
