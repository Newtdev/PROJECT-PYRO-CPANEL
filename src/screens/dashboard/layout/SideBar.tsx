import { ArrowBack } from "@mui/icons-material";
import { useMemo } from "react";
import { ReactElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	Branch,
	Help,
	Home,
	HQIcon,
	Indicator,
	Notification,
	Settings,
	Support,
	Transactions,
} from "src/components/Icons";
import { APP_ROUTE } from "src/helpers/Routes";

type linkTypes = {
	name: string;
	link: string;
	Icon: ReactElement;
};

const linksData = [
	{
		id: 1,
		name: "Dashboard",
		route: "Dashboard",
		Icon: <Home />,
		link: APP_ROUTE.DASHBOARD,
	},
	{
		id: 1,
		name: "Manage HQ",
		route: "Manage HQ",
		Icon: <HQIcon />,
		link: APP_ROUTE.MANAGEHQ,
	},
	{
		id: 2,
		name: "Manage Branch",
		route: "Manage Branch",
		Icon: <Branch />,
		link: APP_ROUTE.BRANCH,
	},
	{
		id: 3,
		name: "Transactions",
		route: "Transactions",
		Icon: <Transactions />,
		link: APP_ROUTE.TRANSACTIONS,
	},
	{
		id: 8,
		name: "Users",
		route: "Users",
		Icon: <Transactions />,
		link: APP_ROUTE.USER,
	},
	{
		id: 4,
		name: "Support",
		route: "Support",
		Icon: <Support />,
		link: APP_ROUTE.SUPPORT,
	},
	{
		id: 5,
		name: "Notification",
		route: "Notification",
		Icon: <Notification />,
		link: APP_ROUTE.NOTIFICATION,
	},
	{
		id: 6,
		name: "Self Help",
		route: "self Help",
		Icon: <Help />,
		link: APP_ROUTE.SELF_HELP,
	},
	{
		id: 7,
		name: "Feeds",
		route: "Feeds",
		Icon: <Help />,
		link: APP_ROUTE.FEEDS,
	},
	{
		id: 7,
		name: "Settings",
		route: "Settings",
		Icon: <Settings />,
		link: APP_ROUTE.SETTINGS,
	},
];
const DashboardLink = ({ name, link, Icon }: linkTypes) => {
	let path = useLocation();
	let firstRoute = path.pathname.split("/")[0];
	let nextRoute = path.pathname.split("/")[1];

	const active = useMemo(() => {
		const selectedLink = name.split(" ").join("").toLowerCase();
		if (!firstRoute) return nextRoute.toLowerCase() === selectedLink;
		else return firstRoute.toLowerCase() === selectedLink;
	}, [firstRoute, name, nextRoute]);

	const activeLink = active ? "font-[600]" : "font-normal";
	return (
		<div className=" flex items-center ">
			{active ? <Indicator /> : false}
			<Link
				to={link}
				state={name}
				className={`${activeLink} text-white text-[14px] flex w-full px-4 ml-4 h-16 items-center `}>
				{Icon}
				<p className="ml-4">{name}</p>
			</Link>
		</div>
	);
};

const SideBar = () => {
	const navigate = useNavigate();
	return (
		<aside className="h-full flex flex-col justify-center w-[260px]">
			<div className=" w-[217px] h-[95%] rounded-[20px] bg-[#002E66] ml-6">
				<div className="w-full pt-4 text-start px-7 text-white">
					<ArrowBack color="inherit" onClick={() => navigate(-1)} />
				</div>

				{linksData?.map((dt, i) => {
					return (
						<DashboardLink name={dt?.name} link={dt?.link} Icon={dt.Icon} />
					);
				})}
			</div>
		</aside>
	);
};

export default SideBar;
