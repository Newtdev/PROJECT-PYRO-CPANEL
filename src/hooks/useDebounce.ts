import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay || 500);
		return () => clearTimeout(debounceTimer);
	}, [value, delay]);

	return { debouncedValue };
};

// export function debounce(callback: () => void, wait = 0) {
// 	let debounceTimer: any;
// 	let triggerArgs: any;
// 	let triggerThis: any;

// 	function trigger(this: any, ...arg) {
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
