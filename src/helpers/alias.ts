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
	link: string;
	height?: number | string;

	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	// setShowCard?: Dispatch<SetStateAction<boolean>>;
	showCard?: boolean;
};
export type loginResponseType = {
	user: {
		role: null;
		firstName: string | null;
		lastName: string | null;
	};

	token: { accessToken: string | null; refreshToken: string | null };
};

export interface Data {
	id: string | number;
	name?: string | undefined;
	branch?: number | string | undefined;
	category?: string;
	flag?: string | ReactElement;
	hq?: string;
	state?: string;
	amount?: string | number;
	type?: string;
	status?: string | ReactElement;
	referenceId?: string | number;
	doneby?: string;
	usage?: string;
	lastUsed?: string;
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
	value: string | number | undefined;
	placeholder?: string;
	onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
	disabled?: boolean | undefined;
	error?: string | undefined;
	touched?: boolean | undefined;
	labelStyles?: string | undefined;
	width?: string;
};

export type ProfiledataType = {
	id: number | string;
	name: string;
	value: string;
	[key: string]: string | number;
}[];

export type ReviewDataType = {
	id: number;
	value: number | string;
	star: number | string;
}[];

// type ReadOnlyProps<T> = {
// 	readonly [P in typeOf T]:T[P]
// }

export const passwordRegex = new RegExp(
	"^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);
