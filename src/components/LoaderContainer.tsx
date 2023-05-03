import { CircularProgress } from "@mui/material";
import { Button } from "./Button";

export const LoaderContainer = ({}) => {
	let isLoading = true;
	return (
		<div className="w-screen h-screen fixed top-0 left-0 bg-[#000000d7] z-50 flex justify-center items-center">
			{!isLoading ? (
				<CircularProgress size={100} sx={{ color: "#fff" }} />
			) : (
				<div>
					<p className="font-bold text-lg">Error occurred</p>
					<Button
						text="RELOAD"
						disabled={false}
						className="h-[62px] font-bold  text-[#002E66] bg-white rounded-[38px] mt-5 w-[16rem] hover:bg-[#002E66]"
						type="button"
						onClick={() => console.log("error")}
					/>
				</div>
			)}
		</div>
	);
};
