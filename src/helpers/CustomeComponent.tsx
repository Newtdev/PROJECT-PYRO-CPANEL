import { useField } from "formik";

interface inputProps {
	name: string;
	placeholder: string;
	type: string;
	[index: string]: any;
}

export const CustomInput = (props: inputProps) => {
	const [field] = useField(props);

	return <input {...field} {...props} />;
};

export const CustomSelect = (props: inputProps) => {};

export const CustomCheckbox = (props: inputProps) => {};
