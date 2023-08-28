import { ChangeEventHandler } from "react";

const UploadIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-7 h-7">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
		/>
	</svg>
);

export const Upload = (props: {
	name: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	text?: string;
}) => {
	return (
		<div className="flex h-full w-full items-center justify-center rounded-xl border  shadow-sm">
			<label htmlFor="files">
				<div className="flex justify-evenly flex-col  items-center">
					<div>
						<UploadIcon />
					</div>
					<span className="text-bold text-sm mt-4">{props.text}</span>
				</div>
				<input
					id="files"
					name={props.name}
					type="file"
					onChange={props.onChange}
					// value={coverImage}
					hidden
				/>
				<br />
			</label>
		</div>
	);
};
