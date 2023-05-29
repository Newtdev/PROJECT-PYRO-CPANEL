import { format } from "date-fns";
import { toast } from "react-toastify";
import { formatDistance } from "date-fns";

export const CurrencyFormatter = (amount: number): string =>
	new Intl.NumberFormat("NGN", {
		style: "currency",
		currency: "NGN",
	}).format(amount || 0);

export const ErrorNotification = (error: string) => toast.error(error);
export const SuccessNotification = (message: string) => toast.success(message);

// PROVIDERTAG AND INVALIDATION OF RTK
export const InvalidateTag = (id: string, typeTag: string) => {
	return [{ type: typeTag, id }];
};

export function providesTagList<
	R extends { id: string | number }[],
	T extends string
>(resultsWithIds: R | undefined, tagType: T) {
	return resultsWithIds
		? [
				{ type: tagType, id: "LIST" },
				...resultsWithIds?.map(({ id }) => ({ type: tagType, id })),
		  ]
		: [{ type: tagType, id: "LIST" }];
}

export function handleNotification(error: {
	data: { message: string };
	status: string | number;
}) {
	switch (error.status) {
		case "FETCH_ERROR":
			ErrorNotification("Network Error! Please try again.");
			break;
		default:
			ErrorNotification(error?.data?.message);
			break;
	}
}

// SPLIT KEYS TO FORM HEADERS
export function splitByUpperCase(str: string): string {
	const result = str
		.trim()
		.split(/(?=[A-Z])/)
		.join(" ")
		.trim();

	return result;
}

// JS DEBOUNCE FUNCTION
// export function debounce(callback: any, wait = 0) {
// 	let debounceTimer: any;
// 	let triggerArgs: any;
// 	let triggerThis: any;

// 	function trigger(this: any, ...arg: any[]) {
// 		triggerArgs = arg;
// 		triggerThis = this;
// 		clearTimeout(debounceTimer);
// 		debounceTimer = setTimeout(() => {
// 			callback.apply(triggerThis, triggerArgs);
// 		}, wait);
// 	}

// 	trigger.cancel = () => clearTimeout(debounceTimer);
// 	trigger.flush = () => {
// 		clearTimeout(debounceTimer);
// 		callback.apply(triggerThis, triggerArgs);
// 	};

// 	return trigger;
// }

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

// HANDLE DATA FORMAT
export function handleDateFormat(date: string) {
	return format(new Date(date), "MMM d, yyyy hh:mm:ss");
}

// CONVERT IMAGE TO BASE 64
export function convert2base64(file: any) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}

// FORMAT DATE TO SOCIAL MEDIA STANDARD
export function formatDateToSocialMediaStandard(date: number | Date) {
	return formatDistance(new Date(date) || new Date(), new Date(), {
		addSuffix: true,
	});
}
