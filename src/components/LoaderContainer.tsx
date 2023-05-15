import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { Button } from "./Button";

interface LoadingType {
	data: { [index: string]: string | unknown | any };

	children: ReactNode;
}
export const LoaderContainer = (props: LoadingType) => {
	console.log(props?.data);
	return (
		<div>
			{props?.data?.isLoading || props?.data?.isFetching ? (
				<div className="w-screen h-screen fixed top-0 left-0 bg-[#000000d7] z-50 flex justify-center items-center">
					<CircularProgress size={100} sx={{ color: "#fff" }} />
				</div>
			) : null}
			{props?.data?.isError && props?.data?.error?.status === "FETCH_ERROR" ? (
				<div className="w-screen h-screen fixed top-0 left-0 bg-[#000000d7] z-50 flex justify-center items-center">
					<div>
						<p className="font-bold text-white text-xl">
							Network Error! Please try again
						</p>
						<Button
							text="RELOAD"
							disabled={false}
							className="h-[62px] font-bold  text-[#002E66] bg-white rounded-[38px] mt-5 w-[16rem]"
							type="button"
							onClick={() => props?.data?.refetch()}
						/>
					</div>
				</div>
			) : null}
			{props.children}
		</div>
	);
};
