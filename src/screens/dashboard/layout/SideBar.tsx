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
import { APP_ROUTE, HQ_APP_ROUTE, PERMISSION } from "src/helpers/Constant";
import { useAuth } from "src/hooks/useAuth";

type linkTypes = {
	name: string;
	link: string;
	Icon: ReactElement;
	priviledges?: string[];
	route: string;
};

const linksData = [
	{
		id: 1,
		name: "Dashboard",
		priviledges: [PERMISSION.HQ, PERMISSION.SYSTEM_ADMIN],
		route: "Dashboard",
		Icon: <Home />,
		link: APP_ROUTE.DASHBOARD,
	},
	{
		id: 1,
		name: "Manage HQ",
		route: "Manage HQ",
		Icon: <HQIcon />,
		priviledges: [PERMISSION.SYSTEM_ADMIN],
		link: APP_ROUTE.MANAGEHQ,
	},
	{
		id: 2,
		name: "Manage Branch",
		route: "Manage Branch",
		priviledges: [PERMISSION.HQ, PERMISSION.SYSTEM_ADMIN],
		Icon: <Branch />,
		link: APP_ROUTE.BRANCH,
		hq_link: HQ_APP_ROUTE.BRANCH,
	},
	{
		id: 3,
		name: "Transactions",
		route: "Transactions",
		priviledges: [PERMISSION.SYSTEM_ADMIN],
		Icon: <Transactions />,
		link: APP_ROUTE.TRANSACTIONS,
		hq_link: HQ_APP_ROUTE.TRANSACTIONS,
	},
	{
		id: 8,
		name: "Users",
		route: "Users",
		priviledges: [PERMISSION.SYSTEM_ADMIN],
		Icon: <Transactions />,
		link: APP_ROUTE.USER,
	},
	{
		id: 4,
		name: "Support",
		route: "Support",
		priviledges: [PERMISSION.SYSTEM_ADMIN],
		Icon: <Support />,
		link: APP_ROUTE.SUPPORT,
	},
	{
		id: 5,
		name: "Notification",
		route: "Notification",
		priviledges: [PERMISSION.HQ, PERMISSION.SYSTEM_ADMIN],
		Icon: <Notification />,
		link: APP_ROUTE.NOTIFICATION,
		hq_link: HQ_APP_ROUTE.NOTIFICATION,
	},
	{
		id: 6,
		name: "Self Help",
		route: "self Help",
		priviledges: [PERMISSION.SYSTEM_ADMIN],
		Icon: <Help />,
		link: APP_ROUTE.SELF_HELP,
	},
	{
		id: 7,
		name: "Feeds",
		route: "Feeds",
		Icon: <Help />,
		priviledges: [PERMISSION.SYSTEM_ADMIN],
		link: APP_ROUTE.FEEDS,
	},
	{
		id: 7,
		name: "Settings",
		route: "Settings",
		priviledges: [PERMISSION.HQ, PERMISSION.SYSTEM_ADMIN],
		Icon: <Settings />,
		link: APP_ROUTE.SETTINGS,
		hq_link: HQ_APP_ROUTE.SETTINGS,
	},
];
const DashboardLink = ({ name, link, Icon, route }: linkTypes) => {
	let path = useLocation();

	const firstRoutePath = path.pathname.split("/");
	let firstRoute = firstRoutePath[0];
	let nextRoute = firstRoutePath[1];

	const active = useMemo(() => {
		const selectedLink = route.split(" ").join("-").toLowerCase();

		if (!firstRoute) return nextRoute.toLowerCase() === selectedLink;
		else return firstRoute.toLowerCase() === selectedLink;
	}, [firstRoute, route, nextRoute]);

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
	const { user } = useAuth();

	const handlePriviledge = () => {
		return linksData?.map((dt, i) =>
			dt.priviledges.filter((_v) => _v === user?.role).length > 0 ? (
				<DashboardLink
					name={dt?.name}
					link={user?.role !== "hq_admin" ? dt?.link : dt?.hq_link || ""}
					Icon={dt.Icon}
					route={dt.route}
				/>
			) : null
		);
	};

	return (
		<aside className="h-screen flex flex-col justify-center basis-[18%]  max-w-[260px]">
			<div className=" w-[217px] h-full my-4 rounded-[20px] bg-[#002E66] ml-2">
				<div className="w-full pt-4 text-start px-7 text-white">
					<ArrowBack color="inherit" onClick={() => navigate(-1)} />
				</div>
				{handlePriviledge()}
			</div>
		</aside>
	);
};

export default SideBar;
