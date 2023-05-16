import { toast } from "react-toastify";

export const CurrencyFormatter = (amount: number): string =>
	new Intl.NumberFormat("NGN", {
		style: "currency",
		currency: "NGN",
	}).format(amount || 0);

export const ErrorNotification = (error: string) => toast.error(error);
export const SuccessNotification = (message: string) => toast.error(message);

// PROVIDERTAG AND INVALIDATION OF RTK
export function providesList<
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
		case 400:
			ErrorNotification(error?.data?.message);
			break;
		default:
			break;
	}
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
