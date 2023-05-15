import { toast } from "react-toastify";

export const CurrencyFormatter = (amount: number): string =>
	new Intl.NumberFormat("NGN", {
		style: "currency",
		currency: "NGN",
	}).format(amount || 0);

export const ErrorNotification = (error: string) => toast.error(error);
export const SuccessNotification = (error: string) => toast.error(error);

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
