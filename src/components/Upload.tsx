export const Upload = () => {
	return (
		<div className="flex h-full w-full items-center justify-center rounded-xl border  shadow-sm">
			<label className="flex flex-col items-center" htmlFor="files">
				<div>
					<span className="text-bold text-sm text-[#080250]">
						Click to upload Image or videos
					</span>
				</div>
				<input
					id="files"
					name="file"
					type="file"
					// onChange={(e) =>
					// 	// setCoverImage(URL.createObjectURL(e.target.files[0]))
					// }
					// value={coverImage}
					hidden
				/>
				<br />
			</label>
		</div>
	);
};
