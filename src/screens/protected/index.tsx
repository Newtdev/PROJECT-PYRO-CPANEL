import { ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PERMISSION } from "src/helpers/Constant";
import { useAuth, useToken } from "src/hooks/useAuth";
import Layout from "../dashboard/layout";

const ProtectedRoute = (): ReactElement => {
	const location = useLocation();
	const token = useToken();
	const accessToken = token?.token?.accessToken;

	// THE ENTRY PAGE TO THE APP.
	// HANDLE SWITCH BETWEEN THE LOGIN AND DASHBOARD
	return accessToken ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
