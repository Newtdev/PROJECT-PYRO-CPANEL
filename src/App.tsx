import React, { useEffect, useMemo } from "react";
import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTE } from "./helpers/Routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks/reduxhooks";

import { AdminRoute } from "./route";
import Login from "./screens/authentication/Login";
import { decryptData } from "./helpers/encryptData";

const Entry = lazy(() => import("./screens/protected"));
type saveUserTypes = {
	token: string | null;
	user: string | null;
};

function App() {
	const domainHost = useMemo(() => {
		return window.location.host.split(".")[0];
	}, []);

	const dats = useMemo(() => {
		let userInfo: saveUserTypes = decryptData("fuleap-user-info") || {};
		if (Object.keys(userInfo).length === 0) {
			return {};
		}
		return JSON.parse(userInfo);
	}, []);

	console.log(dats);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!dats) return;
		dispatch(setCredentials(dats));
	}, [dispatch]);

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
