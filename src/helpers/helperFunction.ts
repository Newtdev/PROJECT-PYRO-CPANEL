import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Data } from "./alias";

export const CurrencyFormatter = (amount: number): string =>
	new Intl.NumberFormat("NGN", {
		style: "currency",
		currency: "NGN",
	}).format(amount || 0);

export const ErrorNotification = (error: string) => toast.error(error);
export const SuccessNotification = (error: string) => toast.error(error);

// SELECT ALL CHECK BOX FUNCTIONALITY
export default function HandleSelectAllClick(data: Data[]) {
	const [selected, setSelected] = useState<string[]>([]);

	const handleSelectAllClick = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.checked) {
				const newSelected = data?.map(
					(n: Data | any) => n.name || n.firstName
				) as string[];

				setSelected(newSelected);
				return;
			}
			setSelected([]);
		},
		[data]
	);
	console.log(selected);

	return { handleSelectAllClick, selected, setSelected };
}
