import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

import { APP_ROUTE, HQ_APP_ROUTE } from "src/helpers/Constant";
import { Dashboard } from "src/screens";

import { HQProtectedComp } from "src/screens/protected/HqProtected";
import ManageBranch from "../hq-pages/Manage-branch";
import Notification from "../hq-pages/Notification";
import Settings from "../hq-pages/Settings";
import Support from "../hq-pages/Support";
import Transactions from "../hq-pages/Transactions";

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
			element: (
				// <AdminProtectedComp host={host}>
				<Dashboard />
				// </AdminProtectedComp>
			),
		},
		{
			path: HQ_APP_ROUTE.BRANCH,
			element: <ManageBranch />,
		},
		{
			path: HQ_APP_ROUTE.TRANSACTIONS,
			element: <Transactions />,
		},
		{
			path: HQ_APP_ROUTE.SETTINGS,
			element: <Settings />,
		},
		{
			path: HQ_APP_ROUTE.SUPPORT,
			element: <Support />,
		},
		{
			path: HQ_APP_ROUTE.NOTIFICATION,
			element: <Notification />,
		},
	].map((route, i) => (
		<Route
			path={route.path}
			index
			element={<HQProtectedComp>{route.element}</HQProtectedComp>}
		/>
	));
};
