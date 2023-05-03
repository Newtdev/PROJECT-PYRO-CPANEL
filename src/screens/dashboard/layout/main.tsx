import Image from "src/components/Image";
import Img from "src/assets/image.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { useState } from "react";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { ReactNode } from "react";

const DashboardHeader = (props: { header: string }) => {
	const { user } = useAuth();
	const [expanded, setExpanded] = useState<boolean>(false);

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

	return (
		<div className="w-full flex justify-between mb-2 ">
			<h1 className="text-start text-[#002E66] text-[30px] font-[700] leading-[45px] w-full">
				{props.header}
			</h1>
			<div className="w-full flex items-center justify-end gap-4 pr-[20.33px]">
				<div className="flex items-center justify-between w-[70%] max-w-fit relative ">
					<p className="font-normal text-[18px] text-[#393939] w-full ">
						Hello, {user?.firstName} {user?.lastName}
					</p>
					<Image
						image={Img}
						width={50}
						height={50}
						styles="rounded-full ml-4"
					/>
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
								<Link to="/">View Profile</Link>
							</div>
							<div className="text-start p-4  transition-all hover:bg-[#D9D9D9] hover:scale-[1.1]">
								<p>Log out</p>
							</div>
							{/* <Button /> */}
						</div>
					</Collapse>
				</div>
			</div>
		</div>
	);
};

const Main = ({ children }: { children: ReactNode }) => {
	const location = useLocation();
	const headerName = location.state || "Dashboard";

	return (
		<section className="h-full w-[85%] px-6 py-4 overflow-y-auto">
			<DashboardHeader header={headerName} />
			{children}
		</section>
	);
};

export default Main;
