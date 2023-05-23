import {
	RemoveCircle,
	RemoveCircleOutlined,
	RemoveCircleOutlineSharp,
} from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { Formik, useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "src/components/Button";
import { AddIcon } from "src/components/Icons";
import { FormInput, Label } from "src/components/inputs";
import * as Yup from "yup";

const WebsiteInformationValidation = Yup.object({
	about: Yup.string().label("About us").notRequired(),
	mission: Yup.string().label("Mission").notRequired(),
	vision: Yup.string().label("Vision").notRequired(),
	contact: Yup.object({
		email: Yup.string().notRequired(),
		phone: Yup.string().notRequired(),
		address: Yup.string().notRequired(),
	}),
	socials: Yup.object({
		facebook: Yup.string().notRequired(),
		twitter: Yup.string().notRequired(),
		instagram: Yup.string().notRequired(),
		linkedin: Yup.string().notRequired(),
	}),
	faqs: Yup.array().of(
		Yup.object({
			question: Yup.string(),
			answer: Yup.string(),
		})
	),
});

export type WebsiteDetailsTypes = Yup.InferType<
	typeof WebsiteInformationValidation
>;

// REACT QUILL MODULE
const ReactQuillModule = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["clean"],
	],
};
// REACT QUILL FORMAL ARRAY
const ReactQuillFormat = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
];

type onChangeTypes = string;

type TabsTypes = {
	handleChange: (event: React.SyntheticEvent, newValue: string) => void;
	value: string | number;
	tabData: { id: number; value: string; label: string }[];
};

const CustomTabs = (props: TabsTypes) => {
	return (
		<Box sx={{ width: "100%" }}>
			<Tabs
				value={props?.value}
				onChange={props.handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				className="px-4"
				aria-label="secondary tabs example">
				{props.tabData?.map(
					(dt: { id: number; value: string; label: string }) => {
						return (
							<Tab
								sx={{
									fontSize: 14,
								}}
								key={dt.id}
								value={dt.value}
								label={dt.label}
							/>
						);
					}
				)}
			</Tabs>
		</Box>
	);
};

const tabData = [
	{ id: 1, value: "one", label: "Edit website info" },
	{ id: 2, value: "two", label: "Edit website handles" },
];

// WEBSITE CONTACT US, SOCIALS AND FAQS DATASET

export default function ManageWebsite() {
	const [value, setValue] = useState<string>("one");

	const Formik = useFormik<{
		contact: {
			email: string | "email";
			phone: string;
			address: string;
		};
		socials: {
			facebook: string;
			twitter: string;
			instagram: string;
			linkedin: string;
		};
		mission: string;
		about: string;
		vision: string;
		faqs: [{ question: string; answer: string }];
	}>({
		initialValues: {
			about: "",
			mission: "",
			vision: "",

			contact: {
				email: "",
				phone: "",
				address: "",
			},
			socials: {
				facebook: "",
				twitter: "",
				instagram: "",
				linkedin: "",
			},
			faqs: [
				{
					question: "",
					answer: "",
				},
			],
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const websiteFormData = [
		{
			id: "contact.email",
			name: "Email",
			type: "email",
			value: Formik.values.contact.email,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.contact?.email,
			touched: Formik.touched.contact?.phone,
		},
		{
			id: "contact.phone",
			name: "Phone",
			type: "number",
			value: Formik.values.contact.phone,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.contact?.phone,
			touched: Formik.touched.contact?.phone,
		},
		{
			id: "contact.address",
			name: "Address",
			type: "text",
			value: Formik.values.contact.address,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.contact?.address,
			touched: Formik.touched.contact?.address,
		},
		{
			id: "socials.facebook",
			name: "Facebook",
			type: "text",
			value: Formik.values.socials.facebook,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.socials?.facebook,
			touched: Formik.touched.socials?.facebook,
		},
		{
			id: "socials.instagram",
			name: "Instagram handle",
			type: "text",
			value: Formik.values.socials.instagram,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.socials?.instagram,
			touched: Formik.touched.socials?.instagram,
		},
		{
			id: "socials.twitter",
			name: "Twitter handle",
			type: "text",
			value: Formik.values.socials.twitter,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.socials?.twitter,
			touched: Formik.touched.socials?.twitter,
		},
		{
			id: "socials.linkedin",
			name: "Linkedin handle",
			type: "text",
			value: Formik.values.socials.linkedin,
			onChange: Formik.handleChange,
			onBlur: Formik.handleBlur,
			error: Formik.errors.socials?.linkedin,
			touched: Formik.touched.socials?.linkedin,
		},
	];

	// WEBSITE INFORMATION
	const ManageWebsitesData = [
		{
			label: "Mission",
			value: Formik.values?.mission,
			onChange: (e: onChangeTypes) => Formik.setFieldValue("mission", e),
		},
		{
			label: "About",
			value: Formik.values?.about,
			onChange: (e: onChangeTypes) => Formik.setFieldValue("about", e),
		},
		{
			label: "Vision",
			value: Formik.values?.vision,
			onChange: (e: onChangeTypes) => Formik.setFieldValue("vision", e),
		},
	];

	// HANDLE THE TABS
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	// ADD MORE OBJECT TO THE FAQS ARRAY

	const addMoreFAQ = useCallback(() => {
		Formik.setFieldValue("faqs", [
			...(Formik.values?.faqs || []),
			{ question: "", answer: "" },
		]);
	}, [Formik]);

	const removeMoreFAQ = useCallback(
		(id: number) => {
			const values = [...Formik.values?.faqs];

			values.splice(id, 1);
			Formik.setFieldValue("faqs", values);
		},
		[Formik]
	);

	return (
		<form onSubmit={Formik.handleSubmit}>
			<div className="flex justify-between items-center mt-6">
				<div>
					<CustomTabs
						value={value}
						tabData={tabData}
						handleChange={handleChange}
					/>
				</div>

				<div className="w-fit">
					<Button
						text="Save info"
						// disabled={addNewResult?.isLoading}
						// showModal={addNewResult?.isLoading}
						className="h-[41px] mt-6 font-bold text-white rounded-[38px] px-6 hover: bg-[#002E66]"
						type="submit"
					/>
				</div>
			</div>
			{value === "one" ? (
				<div className="grid lg:grid-cols-2 gap-x-10">
					{ManageWebsitesData.map((_v, i) => (
						<div className="h-72 w-full mb-6 overflow-hidden ">
							<Label
								name={_v.label}
								styles="block mb-3 font-normal text-lg font-bold text-gray-700"
							/>
							<ReactQuill
								theme="snow"
								onChange={_v.onChange}
								value={_v?.value || ""}
								modules={ReactQuillModule}
								formats={ReactQuillFormat}
								className="h-[70%]"
							/>
						</div>
					))}
				</div>
			) : null}

			{value === "two" ? (
				<div className=" w-[90%]">
					<div className=" gap-x-10 mt-14 ">
						<div>
							<h1 className="text-lg font-bold">Company contact info</h1>
							<div className="grid grid-cols-4 gap-x-4">
								{websiteFormData.slice(0, 3).map((_v, i) => (
									<div>
										<FormInput
											width="w-full"
											id={_v.id}
											name={_v.name}
											type={_v.type}
											styles={styles}
											labelStyles={labelStyles}
											onChange={_v.onChange}
											value={_v.value || ""}
											onBlur={_v.onBlur}
											// disabled={_v.disabled}
											error={_v.error}
											touched={_v.touched}
										/>
									</div>
								))}
							</div>
						</div>

						{/* SOCIALS */}
						<div className="mt-16">
							<h1 className="text-lg font-bold">Company socials handles</h1>
							<div className="grid grid-cols-3 gap-x-4">
								{websiteFormData.slice(-4)?.map((_v, i) => (
									<div>
										<FormInput
											width="w-full"
											id={_v.id}
											name={_v.name}
											type={_v.type}
											styles={styles}
											labelStyles={labelStyles}
											onChange={_v.onChange}
											value={_v.value || ""}
											onBlur={_v.onBlur}
											// disabled={_v.disabled}
											error={_v.error}
											touched={_v.touched}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className=" h-full w-full mt-14 ">
						<h1 className="text-lg font-bold">Frequently asked question</h1>
						<div>
							{Formik.values.faqs?.map((_v, i) => (
								<div className="flex w-full flex-row items-center">
									<div className="w-full grid gap-x-4 grid-cols-2">
										<FormInput
											width="w-full"
											id={`faqs.[${i}].question`}
											name={`Question ${i + 1}`}
											type="text"
											styles={styles}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values.faqs[i].question}
											onBlur={Formik.handleBlur}
											// disabled={_v.disabled}
											// error={Formik.errors?.faqs[i]?.question || ""}
											// touched={Formik.touched.faqs[i]?.question || ""}
										/>
										<FormInput
											width="w-full"
											id={`faqs.[${i}].answer`}
											name={`Answer ${i + 1}`}
											type="text"
											styles={styles}
											labelStyles={labelStyles}
											onChange={Formik.handleChange}
											value={Formik.values?.faqs[i]?.answer || ""}
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
							<span
								className="inline-block py-2 px-6 rounded-lg justify-self-start cursor-pointer mt-6 text-white bg-[#002E66] ml-auto"
								onClick={addMoreFAQ}>
								Add more FAQs
							</span>
						</div>
					</div>
				</div>
			) : null}
		</form>
	);
}
