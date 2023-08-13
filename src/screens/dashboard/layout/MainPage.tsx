import Image from "src/components/Image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { useState } from "react";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { ReactNode } from "react";
import { useAppDispatch } from "src/hooks/reduxhooks";
import { logOut } from "src/features/auth/authSlice";

const DashboardHeader = (props: { header: string }) => {
	const { user } = useAuth();
	const [expanded, setExpanded] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	interface ExpandMoreProps extends IconButtonProps {
		expand: boolean;
	}
	const ExpandMore = styled((props: ExpandMoreProps) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
	}));

	function onLogOut() {
		dispatch(logOut());
		navigate("/login");
	}

	return (
		<div className=" flex justify-between items-center mb-2 fixed w-[82vw] h-24 top-0 bg-white pr-10">
			<h1 className="text-start text-[#002E66] text-base md:text-lg lg:text-[30px] font-[700] leading-[45px] w-full">
				{props.header}
			</h1>
			<div className="w-full flex items-center justify-end  gap-4">
				<div className="flex items-center justify-between  relative ">
					<p className="font-normal text-sm lg:text-[18px] text-[#393939] mr-4 ">
						{user?.firstName} {user?.lastName}
					</p>

					{/* <div className="h-[50px] w-[65px] flex justify-center items-center rounded-full"> */}
					{/* <Image
							width="100%"
							height="100%"
							image={user?.avatar?.url}
							styles="rounded-full h-full w-full"
						/> */}
					{/* </div> */}
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more">
						<ExpandMoreIcon />
					</ExpandMore>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<div className="h-26 bg-white shadow-lg absolute right-0 top-14 w-44 text-[#393939]">
							<div className="text-start w-full py-2 transition-all hover:bg-[#D9D9D9] hover:scale-[1.1] p-4">
								<Link to="/settings" state="Settings">
									View Profile
								</Link>
							</div>
							<button
								onClick={onLogOut}
								className="text-start px-4 py-2 block w-full transition-all hover:bg-[#D9D9D9] hover:scale-[1.1]">
								<p>Log out</p>
							</button>
							{/* <Button /> */}
						</div>
					</Collapse>
				</div>
			</div>
		</div>
	);
};

interface propstype {
	[index: string]: any;
}
export const DropDownComponent = (props: propstype) => {
	interface ExpandMoreProps extends IconButtonProps {
		expand: boolean;
	}
	const ExpandMore = styled((props: ExpandMoreProps) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
	}));

	return (
		<div className="flex items-center justify-center w-fit">
			{props.text ? (
				<p className="text-[12px] text-black">{props.text}</p>
			) : null}
			<ExpandMore
				expand={props.expanded}
				onClick={props.handleExpandClick}
				aria-expanded={props.expanded}
				aria-label="show more">
				<ExpandMoreIcon />
			</ExpandMore>
			<Collapse in={props.expanded} timeout="auto" unmountOnExit>
				{props.children}
			</Collapse>
		</div>
	);
};

const Main = ({ children }: { children: ReactNode }) => {
	const location = useLocation();
	const headerName = location.state || "Dashboard";

	return (
		<main className="basis-[82%] py-4 overflow-x-hidden h-full">
			<DashboardHeader header={headerName} />
			<section className="w-[100%] h-fit overflow-x-hidden px-3 mt-24 ">
				{children}
			</section>
		</main>
	);
};

export default Main;
