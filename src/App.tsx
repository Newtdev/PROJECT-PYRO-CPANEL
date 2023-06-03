import React, { useEffect, useMemo } from "react";
import "./App.css";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { AdminRoute } from "./route";
import Login from "./screens/authentication/Login";
import { useAuth } from "./hooks/useAuth";
import { PropaneSharp } from "@mui/icons-material";

const Entry = lazy(() => import("./screens/protected"));
type saveUserTypes = {
	token: string | null;
	user: string | null;
};

function App() {
	const domainHost = useMemo(() => {
		return window.location.host.split(".")[0];
	}, []);

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
					<Route path={APP_ROUTE.LOGIN} element={<Login host={domainHost} />} />
					<Route path={APP_ROUTE.DASHBOARD} element={<Entry />}>
						{AdminRoute(domainHost)}

						{/* <Route path={APP_ROUTE.BRANCH} element={<ManageBranch />} /> */}
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
