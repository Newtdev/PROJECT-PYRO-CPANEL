import { HighlightOffOutlined } from "@mui/icons-material";
import React, { ReactElement, useMemo, useState } from "react";
import {
	useFetchAllNotificationQuery,
	useSendNotificationMutation,
} from "src/api/notificationApiSlice";
import { Lines } from "src/components/Icons";
import { TableLoader } from "src/components/LoaderContainer";
import { Modal } from "src/components/ModalComp";
import EnhancedTable from "src/components/Table";
import {
	handleDateFormat,
	handleNotification,
	SuccessNotification,
} from "src/helpers/helperFunction";
import useHandleRowClick from "src/hooks/useHandleRowClick";
import useHandleSelectAllClick from "src/hooks/useHandleSelectAllClick";
import useHandleSingleSelect from "src/hooks/useHandleSingleSelect";
import useIsSelected from "src/hooks/useIsSelected";
import HQ from "src/assets/img/hq.svg";
import { cardBtnType } from "src/helpers/alias";
import { CardButton } from "src/components/Card";
import { FormInput, TextArea } from "src/components/inputs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "src/components/Button";

interface SelfHelpType {
	id: "title" | "message" | "for" | "createdAt";
	label: string | ReactElement;
	minWidth: number;
}

const headCells: readonly SelfHelpType[] = [
	{
		id: "title",
		minWidth: 170,
		label: "Title",
	},
	{
		id: "message",
		minWidth: 170,
		label: "Message",
	},
	{
		id: "for",
		minWidth: 170,
		label: "For",
	},
	{
		id: "createdAt",
		minWidth: 170,
		label: "Date",
	},
];
const HQData: cardBtnType[] = [
	{
		id: 1,
		icon: HQ,
		name: "Send to HQs",
	},

	{
		id: 2,
		icon: HQ,
		name: "Send to Branch",
	},
	{
		id: 3,
		icon: HQ,
		name: "Send to Users",
	},
];

export default function Notification() {
	//, stationHq, user
	const [cardName, setCardName] = useState("");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick([]);
	const [page, setPagination] = useState({ newPage: 1 });
	const { isSelected } = useIsSelected(selected);

	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { handleRowClick } = useHandleRowClick();

	const notificationResult = useFetchAllNotificationQuery({
		page: page.newPage,
	});

	// API TO GET ALL HQ INFORMATION

	// console.log(notificationResult);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPagination((prev) => {
			return { ...prev, newPage };
		});
	};

	const handledAPIResponse = useMemo(() => {
		const hqProfile = notificationResult?.currentData?.data || [];
		return hqProfile?.data?.reduce(
			(
				acc: { [index: string]: string }[],
				cur: { [index: string]: string }
			) => [
				...acc,
				{
					id: cur?.id,
					title: cur?.title,
					message: cur?.message,
					for: cur.for,
					createdAt: handleDateFormat(cur?.createdAt),
				},
			],
			[]
		);
	}, [notificationResult]);

	let dataToChildren: any = {
		rows: handledAPIResponse || [],
		headCells,
		handleRowClick,
		showFlag: false,
		showCheckBox: false,
		isSelected,
		handleClick,
		handleSelectAllClick,
		selected,
		handleChangePage,
		paginationData: {
			totalPage: notificationResult?.currentData?.data.totalPages,
			limit: notificationResult?.currentData?.data.limit,
			page: notificationResult?.currentData?.data.page,
		},
	};

	return (
		<section>
			<article>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  py-3">
					{HQData.map((dt) => (
						<CardButton
							name={dt.name}
							icon={dt.icon}
							link={dt.link}
							height={"98px"}
							onClick={() => {
								setShowAddModal(true);
								switch (dt.name.trim().toLowerCase()) {
									case "send to hqs":
										setCardName("stationHQ");
										break;
									case "send to branch":
										setCardName("stationBranch");
										break;
									default:
										setCardName("user");
										break;
								}
							}}
						/>
					))}
				</div>

				<div className="h-fit w-full bg-white">
					<TableLoader
						data={notificationResult || {}}
						tableData={handledAPIResponse || []}>
						<div className="h-full w-full">
							<div className="relative">
								<EnhancedTable {...dataToChildren} />
							</div>
						</div>
					</TableLoader>

					{showAddModal ? (
						<Modal>
							<div className="absolute w-full h-full right-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
								<div className="w-[50%] max-w-[511px] h-fit flex flex-col justify-center rounded-[20px] pb-10 bg-white">
									<div className="w-full h-16 px-10 pt-2 pb-2 mt-2 font-bold text-xl text-[#002E66] flex justify-between items-center">
										<h1>Send notification</h1>
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
									<SendNotificationModal
										name={cardName}
										close={() => setShowAddModal(false)}
									/>
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</article>
		</section>
	);
}

const SendNotificationValidation = Yup.object({
	title: Yup.string().label("Title").required(),
	message: Yup.string().label("Message").required(),
	sendTo: Yup.string().label("Recipient").required(),
	notify: Yup.array().of(Yup.string().label("notify").required()),
});
export type addBranchSchema = Yup.InferType<typeof SendNotificationValidation>;

const SendNotificationModal = (props: { name: string; close: () => void }) => {
	const [sendNewNotification, sendNotificationResult] =
		useSendNotificationMutation();

	async function SendNotificationfunt(values: addBranchSchema) {
		try {
			const response = await sendNewNotification(values).unwrap();
			if (response) {
				props.close();
			}
			SuccessNotification(response?.status);
		} catch (error: any) {
			props.close();
			handleNotification(error);
		}
	}

	const Formik = useFormik<addBranchSchema>({
		initialValues: {
			title: "",
			message: "",
			notify: [],
			sendTo: props.name,
		},
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: SendNotificationValidation,
		onSubmit: (values) => {
			SendNotificationfunt(values);
		},
	});
	const styles =
		"h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]";
	const labelStyles =
		"block mb-[6px] text-black text-start font-normal text-[14px] text-black ml-5 my-6";

	const FormData = [
		{
			id: "sendTo",
			name: "Recipient",
			type: "text",
			styles: `${styles} ${
				Formik.errors.sendTo && Formik.touched.sendTo
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.sendTo,
			onBlur: Formik.handleBlur,
			disabled: sendNotificationResult?.isLoading,
			error: Formik.errors.sendTo,
			touched: Formik.touched.sendTo,
		},
		{
			id: "title",
			name: "Title",
			type: "text",
			styles: `${styles} ${
				Formik.errors.title && Formik.touched.title
					? "border-red-500"
					: "border-gray-300"
			}`,
			labelStyles: labelStyles,
			onChange: Formik.handleChange,
			value: Formik.values.title,
			onBlur: Formik.handleBlur,
			disabled: sendNotificationResult?.isLoading,
			error: Formik.errors.title,
			touched: Formik.touched.title,
		},
	];

	return (
		<form
			onSubmit={Formik.handleSubmit}
			className="w-full flex flex-col justify-center items-center px-4 h-full">
			<div className="grid grid-cols-1 w-full gap-x-2 content-center">
				{FormData.map((_v, i) => (
					<FormInput
						id={_v.id}
						type={_v.type}
						name={_v.name}
						value={_v.value}
						onChange={_v.onChange}
						onBlur={_v.onBlur}
						error={_v.error}
						touched={_v.touched}
						styles={_v.styles}
						labelStyles={_v.labelStyles}
					/>
				))}
			</div>

			<TextArea
				id="message"
				name="Message"
				type="text"
				labelStyles={labelStyles}
				onChange={Formik.handleChange}
				value={Formik.values.message}
				disabled={sendNotificationResult?.isLoading}
				error={Formik.errors.message}
				touched={Formik.touched.message}
			/>

			<div className="flex items-center justify-between"></div>
			<div className="w-full">
				<Button
					text="Send"
					disabled={sendNotificationResult?.isLoading}
					showModal={sendNotificationResult?.isLoading}
					className="h-[41px] mt-6 font-bold text-white rounded-[38px] w-full hover: bg-[#002E66]"
					type="submit"
				/>
			</div>
		</form>
	);
};
