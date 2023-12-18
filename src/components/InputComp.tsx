import React from "react";

type InputTypes = {
	label: string;
	placeholder: string;
};

export default function InputComp({
	label,
	placeholder,
	...props
}: InputTypes) {
	return (
		<div>
			<label
				htmlFor=""
				className="block mb-[6px]  text-start font-normal text-[14px] text-black ml-5 my-6">
				{label}
			</label>
			<input
				className="h-[38px] py-6 rounded-[38px] w-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 text-[14px] bg-[#D9D9D9]"
				placeholder={placeholder}
				{...props}
			/>
		</div>
	);
}
