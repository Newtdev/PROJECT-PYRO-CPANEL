import React, { ReactElement, useMemo, useState } from "react";
import { HighlightOffOutlined } from "@mui/icons-material";
import { Lines } from "src/components/Icons";
import { TableLoader } from "src/components/LoaderContainer";
import { FormModal, Modal } from "src/components/ModalComp";
import EnhancedTable from "src/components/Table";
import {
	forEnums,
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
import {
	useFetchAllHQNotificationQuery,
	useSendHQNotificationMutation,
} from "src/hq-admin/hq-api/notificationApiSlice";
import { useAuth } from "src/hooks/useAuth";

const HQData: cardBtnType[] = [
	{
		id: 2,
		icon: HQ,
		name: "Send to Branch",
	},
];
const headCells: readonly any[] = [
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

export default function Notification() {
	//, stationHq, user

	const { user } = useAuth();

	const [cardName, setCardName] = useState("");
	const [showAddModal, setShowAddModal] = useState<boolean>(false);

	const { handleSelectAllClick, selected, setSelected } =
		useHandleSelectAllClick([]);
	const [page, setPagination] = useState({ newPage: 1 });
	const { isSelected } = useIsSelected(selected);

	const { handleClick } = useHandleSingleSelect(selected, setSelected);
	const { handleRowClick } = useHandleRowClick();
	const notificationResult = useFetchAllHQNotificationQuery({
		stationHQ: user?.stationHQ,
		page: page.newPage,
	});
	// const notificationResult = useFetchAllNotificationQuery({
	// 	page: page.newPage,
	// });

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
				cur: {
					[index: string]: string;
				}
			) => [
				...acc,
				{
					id: cur?.id,
					title: cur?.title,
					message: cur?.message,
					for: forEnums[cur?.for],
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
				</div>

				{showAddModal ? (
					<FormModal
						name="Send Notification"
						onClick={() => setShowAddModal(false)}>
						<SendNotificationModal
							name={cardName}
							close={() => setShowAddModal(false)}
						/>
					</FormModal>
				) : null}
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
		useSendHQNotificationMutation();

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
			sendTo: "stationBranch",
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
			disabled: true,
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
						disabled={_v.disabled}
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
