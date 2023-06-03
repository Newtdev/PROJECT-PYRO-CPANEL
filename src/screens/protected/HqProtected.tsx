import { Navigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const AdminProtectedComp = (props: any) => {
	const user = useAuth();
	const role = user?.user?.role;
	if (role !== "engineer" || props.host !== "admin") {
		return <Navigate to="/login" replace />;
	}
	return props.children;
};
