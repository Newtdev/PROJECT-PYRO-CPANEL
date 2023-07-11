import React, { useEffect, useMemo } from "react";
import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTE, SUB_DOMAIN } from "./helpers/Constant";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks/reduxhooks";

import { AdminRoute } from "./route";
import Login from "./screens/authentication/Login";
import { decryptData } from "./helpers/encryptData";
import { HQ_Route } from "./hq-admin/hq-route";
import ForgotPassword from "./screens/authentication/ForgotPassword";
import ResetPassword from "./screens/authentication/ResetPassword";
import { LandingPage } from "./screens";
import AboutUs from "./screens/landing-page/AboutUs";

const Entry = lazy(() => import("./screens/protected"));

function App() {
	const domainHost = useMemo(() => {
		return window.location.host.split(".")[0];
	}, []);

	const persisteUserInfo = useMemo(() => {
		let userInfo = decryptData("fuleap-user-info") || {};

		if (Object.keys(userInfo).length === 0) {
			return;
		}

		return JSON.parse(userInfo);
	}, []);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!persisteUserInfo) return;
		dispatch(setCredentials(persisteUserInfo));
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [dispatch]);
	return (
		<div className="App">
			<Suspense fallback="loading...">
				<Routes>
					<Route path={APP_ROUTE.LANDING_PAGE} element={<LandingPage />} />
					<Route path={APP_ROUTE.ABOUT_US} element={<AboutUs />} />
					<Route path={APP_ROUTE.LOGIN} element={<Login host={domainHost} />} />
					<Route
						path={APP_ROUTE.FORGOT_PASSWORD}
						element={<ForgotPassword host={domainHost} />}
					/>
					<Route
						path={APP_ROUTE.RESET_PASSWORD}
						element={<ResetPassword host={domainHost} />}
					/>
					<Route path={APP_ROUTE.DASHBOARD} element={<Entry />}>
						{/* {domainHost === SUB_DOMAIN.SYSTEM_ADMIN
							? AdminRoute(domainHost)
							: HQ_Route(domainHost)} */}
						{domainHost === SUB_DOMAIN.SYSTEM_ADMIN
							? AdminRoute(domainHost)
							: null}
						{domainHost === SUB_DOMAIN.HQ ? HQ_Route(domainHost) : null}
						{/* {domainHost !== SUB_DOMAIN.HQ ||
							domainHost !== SUB_DOMAIN.SYSTEM_ADMIN? <Navigate} */}
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
