import { Route } from "react-router-dom";

import { APP_ROUTE } from "src/helpers/Constant";
import ManageHQBranch from "src/hq-admin/hq-pages/Manage-branch";
import { Dashboard, ManageBranch } from "src/screens";
import Feeds from "src/screens/dashboard/pages/feeds";
// import HQPage from "src/screens/dashboard/pages/Manage-HQ/HQPage";
import ViewHQWallet from "src/screens/dashboard/pages/Manage-HQ/ViewHQWallet";
import Notification from "src/screens/dashboard/pages/Notification";
import SelfHelp from "src/screens/dashboard/pages/self-help";
import AddNewSelfHelp from "src/screens/dashboard/pages/self-help/AddNewSelfHelp";
import Settings from "src/screens/dashboard/pages/Settings";
import SinglePage from "src/screens/dashboard/pages/SinglePage";
import Support from "src/screens/dashboard/pages/support";
import UserProfile from "src/screens/dashboard/pages/User/UserProfile";
import UserWallet from "src/screens/dashboard/pages/User/UserWallet";
import AllTransactions from "../screens/dashboard/pages/Transactions/AllTransactions";
import { AdminProtectedComp } from "src/screens/protected/AdminProtected";
import HQPage from "../screens/dashboard/pages/Manage-HQ/HQPage";
import BranchReview from "../screens/dashboard/pages/Manage-branch/BranchReview";
import Users from "../screens/dashboard/pages/User";
import ManageHQ from "../screens/dashboard/pages/Manage-HQ/ManageHQ";
// const UserWallet = lazy(
// 	() => import("./screens/dashboard/pages/User/UserWallet")
// );
// const ViewHQWallet = lazy(
// 	() => import("./screens/dashboard/pages/Manage-HQ/ViewHQWallet")
// );

// const SinglePage = lazy(() => import("../screens/dashboard/pages/SinglePage"));

export const AdminRoute = (host) => {
	return [
		{
			path: APP_ROUTE.DASHBOARD,
			element: <Dashboard />,
		},
		// {
		// 	path: APP_ROUTE.BRANCH,
		// 	element: <ManageHQBranch />,
		// },
		// {
		// 	path: APP_ROUTE.BRANCH,
		// 	element: <ManageBranch />,
		// },
		{
			path: APP_ROUTE.BRANCH,
			element: <ManageBranch />,
		},
		{
			path: APP_ROUTE.MANAGEHQ,
			element: <ManageHQ />,
		},
		{ path: APP_ROUTE.MANAGE_SINGLE_BRANCH, element: <SinglePage /> },
		{
			path: APP_ROUTE.MANAGE_SINGLE_HQ,
			element: <HQPage />,
		},
		{ path: APP_ROUTE.SUPPORT, element: <Support /> },
		{ path: APP_ROUTE.FEEDS, element: <Feeds /> },
		{
			path: APP_ROUTE.ATTENDANT_REVIEW,
			element: <BranchReview />,
		},
		{
			path: APP_ROUTE.ADD_NEW_SELF_HELP,
			element: <AddNewSelfHelp />,
		},
		{
			path: APP_ROUTE.VIEW_HQ_WALLET,
			element: <ViewHQWallet />,
		},
		{
			path: APP_ROUTE.VIEW_HQ_BRANCH,
			element: <ManageBranch />,
		},
		{
			path: APP_ROUTE.TRANSACTIONS,
			element: <AllTransactions />,
		},
		{ path: APP_ROUTE.USER_WALLET, element: <UserWallet /> },
		{ path: APP_ROUTE.SELF_HELP, element: <SelfHelp /> },
		{ path: APP_ROUTE.SETTINGS, element: <Settings /> },
		{ path: APP_ROUTE.NOTIFICATION, element: <Notification /> },
		{ path: APP_ROUTE.USER, element: <Users /> },
		{ path: APP_ROUTE.USER_PROFILE, element: <UserProfile /> },
	].map((route, i) => (
		<Route path={route.path} index element={route.element} />
	));
};
