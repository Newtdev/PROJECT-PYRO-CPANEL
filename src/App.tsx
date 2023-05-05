import React, { useEffect } from "react";
import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTE } from "./helpers/Routes";
import { Dashboard } from "./screens";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";
import AttendantRating from "./screens/dashboard/pages/AttendantInfo";

const Entry = lazy(() => import("./screens/protected"));
const Login = lazy(() => import("./screens/authentication/Login"));
const ManageBranch = lazy(
	() => import("./screens/dashboard/pages/ManageBranch")
);
const ManageHQ = lazy(() => import("./screens/dashboard/pages/ManageHQ"));
const SinglePage = lazy(() => import("./screens/dashboard/pages/SinglePage"));
const ViewWallet = lazy(() => import("./screens/dashboard/pages/ViewWallet"));
const AttendantProfile = lazy(
	() => import("./screens/dashboard/pages/AttendantProfile")
);
const BranchReview = lazy(
	() => import("./screens/dashboard/pages/BranchReview")
);

function App() {
	type saveUserTypes = {
		token: string | null;
		user: string | null;
	};
	const dispatch = useDispatch();

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
						<Route path={APP_ROUTE.MANAGE_SINGLE_HQ} element={<SinglePage />} />
						<Route path={APP_ROUTE.VIEW_WALLET} element={<ViewWallet />} />
						<Route
							path={APP_ROUTE.ATTENDANT_PROFILE}
							element={<AttendantProfile />}
						/>
						<Route
							path={APP_ROUTE.ATTENDANT_REVIEW}
							element={<BranchReview />}
						/>
						{/* <Route
							path={APP_ROUTE.ATTENDANT_INFO}
							element={<AttendantRating />}
						/> */}
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
