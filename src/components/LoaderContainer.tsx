import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { Button } from "./Button";

interface LoadingType {
	data: { [index: string]: string | unknown | any };
	children: ReactNode;
}

export const LoaderContainer = (props: LoadingType) => {
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

interface TableLoaderType extends LoadingType {
	tableData: { [index: string]: string | unknown | any }[];
}

export function TableLoader(props: TableLoaderType) {
	const loading = props?.data?.isLoading || props?.data?.isFetching;
	console.log(props.tableData);
	return (
		<>
			<div className=" flex justify-center items-center z-10">
				{loading ? (
					<div className=" h-56 flex justify-center items-center">
						<CircularProgress size={30} sx={{ color: "#002E66" }} />
					</div>
				) : null}
				{props?.data?.isError &&
				props?.data?.error?.status === "FETCH_ERROR" ? (
					<div className="h-56 flex flex-col justify-center items-center">
						<p className="font-bold text-[#002E66] text-base">
							Network Error! Please try again
						</p>
						<Button
							text="RELOAD"
							disabled={false}
							className=" font-bold text-sm  px-8 py-2 bg-[#002E66] text-white rounded-lg mt-5"
							type="button"
							onClick={() => props?.data?.refetch()}
						/>
					</div>
				) : null}
				{props.tableData?.length < 1 &&
				!props?.data?.isLoading &&
				!props?.data?.isFetching &&
				!props?.data?.isError ? (
					<div className="h-56 flex justify-center items-center">
						<p className="font-bold text-[#002E66] text-base">
							No Data Available
						</p>
					</div>
				) : null}
			</div>

			{props?.tableData?.length > 0 && !props.data.isFetching ? (
				<div>{props.children}</div>
			) : null}
		</>
	);
}
