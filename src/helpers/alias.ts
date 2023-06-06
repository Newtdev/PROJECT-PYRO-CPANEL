import { MouseEventHandler } from "react";
import { ChangeEventHandler, FocusEventHandler, ReactElement } from "react";

export type stringOrNumber = string | number;

export interface Values {
	email: string;
	password: string;
}
export type cardType = {
	id?: number;
	icon: string;
	amount?: string;
	name: string;
	link?: string | undefined;
};

export type cardBtnType = {
	id?: number | string;
	icon: string | any;
	name: string;
	link?: string;
	height?: number | string;

	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	activeBtn?: string;
	// setShowCard?: Dispatch<SetStateAction<boolean>>;
	showCard?: boolean;
};
export type loginResponseType = {
	user: any;
	systemAdmin: {
		avatar: any;
		role: null;
		firstName: string | null;
		lastName: string | null;
	};

	token: { accessToken: string | null; refreshToken: string | null };
};

export interface Data {
	id: stringOrNumber;
	name?: string | undefined;
	branch?: number | string | undefined;
	category?: string;
	flag?: string | ReactElement;
	hq?: string;
	state?: string;
	amount?: stringOrNumber;
	type?: string;
	status?: string | ReactElement;
	referenceId?: stringOrNumber;
	doneby?: string;
	usage?: string;
	lastUsed?: string;
	email?: string;
	hqAddress?: string;
	phoneNumber?: stringOrNumber;
	firstName?: string;
	lastName?: string;
	gender?: string;
	residentialAddress?: string;
	walletId: string;
	location?: { [index: string]: string | number };
}

export interface TransactionsType {
	meta: { reference: string; payerName: string; walletNumber: string };
	type: string;
	category: string;
	amount: string;
	status: string | ReactElement;
	createdAt: string;

	// [index:string]:string | number
}

// ERROR HANDLE FROM API
export interface ErrorType {
	[index: string]: stringOrNumber;
}
// export interface HeadCell {
// 	id: keyof Data;
// 	label: string;
// 	numeric: boolean;
// }

export type inputType = {
	name: string;
	styles?: string;
	id: string | undefined;
	type: string;
	inputName?: string | undefined;
	value?: stringOrNumber | undefined;
	placeholder?: string;
	onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
	disabled?: boolean | undefined;
	error?: string | undefined;
	touched?: boolean | undefined;
	labelStyles?: string | undefined;
	width?: string;
};

export interface ProfiledataType {
	id: number | string;
	name: string;
	value: string;
	[key: string]: stringOrNumber;
}

export type ReviewDataType = {
	id: number;
	value?: () => number | string;
	star: number | string;
}[];

// type ReadOnlyProps<T> = {
// 	readonly [P in typeOf T]:T[P]
// }

export const passwordRegex = new RegExp(
	"^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);
