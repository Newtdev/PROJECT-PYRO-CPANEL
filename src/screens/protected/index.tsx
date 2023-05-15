import { ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PERMISSION } from "src/helpers/Routes";
import { useAuth, useToken } from "src/hooks/useAuth";
import Layout from "../dashboard/layout";

const ProtectedRoute = (): ReactElement => {
	const location = useLocation();
	const user = useAuth();
	console.log(user);
	const token = useToken();
	const accessToken = token?.token?.accessToken;
	const role = user?.user?.role;
	// THE ENTRY PAGE TO THE APP.
	// HANDLE SWITCH BETWEEN THE LOGIN AND DASHBOARD
	return role === PERMISSION.SYSTEM_ADMIN && accessToken ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" state={{ from: location }} />
	);
};

export default ProtectedRoute;
