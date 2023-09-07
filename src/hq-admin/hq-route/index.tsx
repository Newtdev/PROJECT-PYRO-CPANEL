import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

import { APP_ROUTE, HQ_APP_ROUTE } from "src/helpers/Constant";
import { Dashboard } from "src/screens";

import { HQProtectedComp } from "src/screens/protected/HqProtected";
import ManageHQBranch from "../hq-pages/Manage-branch";
import SingleBranch from "../hq-pages/Manage-branch/SingleBranch";
import Notification from "../hq-pages/Notification";
import HqSetting from "../hq-pages/Settings";
import WithDrawal from "../hq-pages/Withdraw.tsx";

// const Settings = lazy(() => import("../screens/dashboard/pages/Settings"));
// const SelfHelp = lazy(() => import("../screens/dashboard/pages/self-help"));
// const HQPage = lazy(
// 	() => import("../screens/dashboard/pages/Manage-HQ/HQPage")
// );
// // const UserWallet = lazy(
// // 	() => import("./screens/dashboard/pages/User/UserWallet")
// // );
// // const ViewHQWallet = lazy(
// // 	() => import("./screens/dashboard/pages/Manage-HQ/ViewHQWallet")
// // );
// const AllTransactions = lazy(
// 	() => import("../screens/dashboard/pages/Transactions/AllTransactions")
// );
// const Users = lazy(() => import("../screens/dashboard/pages/User"));

// const ManageBranch = lazy(
// 	() => import("../screens/dashboard/pages/Manage-branch/ManageBranch")
// );
// const ManageHQ = lazy(
// 	() => import("../screens/dashboard/pages/Manage-HQ/ManageHQ")
// );
// const SinglePage = lazy(() => import("../screens/dashboard/pages/SinglePage"));

// const BranchReview = lazy(
// 	() => import("../screens/dashboard/pages/Manage-branch/BranchReview")
// );

export const HQ_Route = (host: string) => {
	return [
		{
			path: APP_ROUTE.DASHBOARD,
			element: <Dashboard />,
		},
		{
			path: HQ_APP_ROUTE.BRANCH,
			element: <ManageHQBranch />,
		},
		{
			path: HQ_APP_ROUTE.SINGLE_BRANCH,
			element: <SingleBranch />,
		},

		{
			path: HQ_APP_ROUTE.SETTINGS,
			element: <HqSetting />,
		},

		{
			path: HQ_APP_ROUTE.NOTIFICATION,
			element: <Notification />,
		},
		{
			path: HQ_APP_ROUTE.WIDTHDRAWAL,
			element: <WithDrawal />,
		},
	].map((route, i) => (
		<Route
			path={route.path}
			index
			element={<HQProtectedComp>{route.element}</HQProtectedComp>}
		/>
	));
};
