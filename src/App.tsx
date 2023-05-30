import React, { useEffect } from "react";
import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTE } from "./helpers/Routes";
import { Dashboard } from "./screens";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks/reduxhooks";
import Notification from "./screens/dashboard/pages/Notification";
import AddNewSelfHelp from "./screens/dashboard/pages/self-help/AddNewSelfHelp";
import Support from "./screens/dashboard/pages/support";
import Feeds from "./screens/dashboard/pages/feeds";

const Entry = lazy(() => import("./screens/protected"));
const Settings = lazy(() => import("./screens/dashboard/pages/Settings"));
const SelfHelp = lazy(() => import("./screens/dashboard/pages/self-help"));
const HQPage = lazy(() => import("./screens/dashboard/pages/Manage-HQ/HQPage"));
// const UserWallet = lazy(
// 	() => import("./screens/dashboard/pages/User/UserWallet")
// );
// const ViewHQWallet = lazy(
// 	() => import("./screens/dashboard/pages/Manage-HQ/ViewHQWallet")
// );
const AllTransactions = lazy(
	() => import("./screens/dashboard/pages/Transactions/AllTransactions")
);
const Users = lazy(() => import("./screens/dashboard/pages/User"));
const UserProfile = lazy(
	() => import("./screens/dashboard/pages/User/UserProfile")
);

const Login = lazy(() => import("./screens/authentication/Login"));
const ManageBranch = lazy(
	() => import("./screens/dashboard/pages/Manage-branch/ManageBranch")
);
const ManageHQ = lazy(
	() => import("./screens/dashboard/pages/Manage-HQ/ManageHQ")
);
const SinglePage = lazy(() => import("./screens/dashboard/pages/SinglePage"));
// const ViewWallet = lazy(() => import("./screens/dashboard/pages/ViewWallet"));

const BranchReview = lazy(
	() => import("./screens/dashboard/pages/Manage-branch/BranchReview")
);
// const AttendantProfileInfo = lazy(
// 	() => import("./screens/dashboard/pages/Manage-branch/AttendantProfileInfo")
// );

function App() {
	type saveUserTypes = {
		token: string | null;
		user: string | null;
	};
	const dispatch = useAppDispatch();

	const getUserInfo: string | null = sessionStorage.getItem(
		"fuleap-user-info"
	) as string;
	const parseData: saveUserTypes = JSON.parse(getUserInfo);

	useEffect(() => {
		if (!parseData) return;
		dispatch(setCredentials(parseData));
	}, [dispatch, parseData]);

	return (
		<div className="App">
			<Suspense fallback="loading...">
				<Routes>
					<Route path={APP_ROUTE.LOGIN} element={<Login />} />
					<Route path={APP_ROUTE.DASHBOARD} element={<Entry />}>
						<Route path={APP_ROUTE.DASHBOARD} index element={<Dashboard />} />
						<Route path={APP_ROUTE.BRANCH} element={<ManageBranch />} />
						{/* <Route path={APP_ROUTE.BRANCH} element={<AddBranch />} /> */}
						<Route path={APP_ROUTE.MANAGEHQ} element={<ManageHQ />} />
						<Route
							path={APP_ROUTE.MANAGE_SINGLE_BRANCH}
							element={<SinglePage />}
						/>
						<Route path={APP_ROUTE.MANAGE_SINGLE_HQ} element={<HQPage />} />
						<Route path={APP_ROUTE.SUPPORT} element={<Support />} />
						<Route path={APP_ROUTE.FEEDS} element={<Feeds />} />

						{/* <Route
							path={APP_ROUTE.ATTENDANT_REVIEW}
							element={<BranchReview />}
						/> */}
						<Route
							path={APP_ROUTE.ADD_NEW_SELF_HELP}
							element={<AddNewSelfHelp />}
						/>
						{/* <Route path={APP_ROUTE.VIEW_HQ_WALLET} element={<ViewHQWallet />} /> */}
						<Route path={APP_ROUTE.VIEW_HQ_BRANCH} element={<ManageBranch />} />
						<Route
							path={APP_ROUTE.TRANSACTIONS}
							element={<AllTransactions />}
						/>
						<Route path={APP_ROUTE.USER} element={<Users />} />
						<Route path={APP_ROUTE.USER_PROFILE} element={<UserProfile />} />
						{/* <Route path={APP_ROUTE.USER_WALLET} element={<UserWallet />} /> */}
						<Route path={APP_ROUTE.SELF_HELP} element={<SelfHelp />} />
						<Route path={APP_ROUTE.SETTINGS} element={<Settings />} />
						<Route path={APP_ROUTE.NOTIFICATION} element={<Notification />} />
					</Route>
				</Routes>
			</Suspense>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				closeOnClick
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}

export default App;
