import { Checkbox, IconButton } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ReactElement } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SearchIcon } from "./Icons";
import { inputType } from "src/helpers/alias";

// placeholder,
// type propsType = {
// 	name: string;
// 	styles?: string;
// };
export function Label(props: { styles: string; name: string }) {
	// const { styles  } = props;
	return <label className={props.styles}>{props.name}</label>;
}

const Error = ({ error }: { error: string }): ReactElement => (
	<p className="mt-1 text-xs font-thin text-red-500 text-start ml-6">{error}</p>
);

export const FormInput = (props: inputType) => {
	const {
		name,
		id,
		type,
		onChange,
		onBlur,
		disabled,
		placeholder,
		touched,
		error,
		value,
		styles = `h-[54px] rounded-[38px] w-full border border-gray-300 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
			props.error && props.touched ? "border-red-500" : "border-gray-300"
		} bg-[#D9D9D9]`,
		labelStyles = "block mb-[6px] text-black text-start font-normal text-[20px] text-gray-700 ml-5",
		width = "100%",
	} = props;
	return (
		<div style={{ width: width }}>
			<Label name={name} styles={labelStyles} />
			<input
				name={id}
				id={id}
				type={type}
				className={styles}
				onChange={onChange}
				value={value}
				onBlur={onBlur}
				disabled={disabled}
				placeholder={placeholder}
			/>
			{error && touched ? <Error error={error} /> : null}
		</div>
	);
};
export const PasswordInput = (props: inputType) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<div className={`${props.width || "w-[70%]"} `}>
			<Label
				name={props.name}
				styles={
					props.labelStyles ||
					"block mb-[6px] text-start font-normal text-[20px] text-gray-700 ml-5"
				}
			/>
			<div
				className={`flex justify-between items-center h-[54px] rounded-[38px] w-full border border-gray-300 pr-4  bg-[#D9D9D9]  ${
					props.error && props.touched ? "border-red-500" : "border-gray-300"
				}`}>
				<input
					name={props.inputName}
					id={props.id}
					type={showPassword ? "text" : "password"}
					className="h-54 w-full border-gray-300 px-4 focus:border-transparent focus:outline-none focus:ring-2  focus:ring-blue-500 bg-[#D9D9D9] h-full rounded-[38px]"
					onChange={props.onChange}
					value={props.value}
					onBlur={props.onBlur}
					disabled={props.disabled}
					placeholder={props.placeholder}
				/>

				<IconButton
					className="text-sm"
					aria-label="toggle password visibility"
					onClick={handleClickShowPassword}
					onMouseDown={handleMouseDownPassword}
					edge="end">
					{showPassword ? (
						<VisibilityOff fontSize="small" />
					) : (
						<Visibility fontSize="small" />
					)}
				</IconButton>
			</div>

			{props.error && props.touched ? <Error error={props.error} /> : null}
		</div>
	);
};

export const CheckBox = (): ReactElement => (
	<Checkbox
		defaultChecked
		sx={{
			color: "#002E66",
			borderRadius: "38px",
			"&.Mui-checked": {
				color: "#002E66",
			},
		}}
	/>
);

type searchInput = {
	name: string;
	onChange: ChangeEventHandler;
	placeholder: string;
	value: string | number;
};
export const SearchInput = (props: searchInput) => {
	return (
		<>
			<SearchIcon />
			<input
				type="text"
				name={props.name}
				onChange={props.onChange}
				autoComplete={"false"}
				value={props?.value}
				placeholder={props.placeholder}
				// className="w-full outline-none"
				className="rounded-[15px] px-[14px] w-full focus:outline-none bg-transparent placeholder:text-[#1E1E1E]"
			/>
		</>
	);
};

interface TextAreaTypes {
	onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
	[index: string]: string | any;
}
export const TextArea = (props: TextAreaTypes) => (
	<div className="w-full">
		<Label name={props.name} styles={props.labelStyles} />
		<textarea
			className="w-full rounded-lg p-3 bg-[#D9D9D9]"
			placeholder="Add description..."
			rows={3}
			id={props.id}
			name={props.id}
			onChange={props.onChange}
			value={props.value}
			disabled={props.disabled}
		/>
		{props.error && props.touched ? <Error error={props.error} /> : null}
	</div>
);

interface SelectInputType {
	labelStyles: string;
	data: string[];
	onChange: ChangeEventHandler<HTMLSelectElement>;
	name: string;
	value: string;
	id: string;
	disabled?: boolean;
}

export const SelectInput = (props: SelectInputType) => (
	<div className="w-full">
		<Label name={props.name} styles={props.labelStyles} />
		<select
			className="mt-1 py-4 rounded-[38px] w-full border border-gray-300 px-4 text-[14px] bg-[#D9D9D9]"
			name={props.id}
			value={props.value}
			onChange={props.onChange}
			disabled={props.disabled}>
			<option>Select</option>
			{props.data.map((_v: string, i: number) => (
				<option key={i} value={_v}>
					{_v}
				</option>
			))}
		</select>
	</div>
);
