import { toast } from "react-toastify";

export const CurrencyFormatter = (amount: number): string =>
	new Intl.NumberFormat("NGN", {
		style: "currency",
		currency: "NGN",
	}).format(amount);

export const ErrorNotification = (error: string) => toast.error(error);
export const SuccessNotification = (error: string) => toast.error(error);
