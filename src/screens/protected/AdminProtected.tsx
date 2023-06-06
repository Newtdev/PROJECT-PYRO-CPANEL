import { Navigate } from "react-router-dom";
import { PERMISSION, SUB_DOMAIN } from "src/helpers/Constant";
import { useAuth } from "src/hooks/useAuth";

export const AdminProtectedComp = (props: any) => {
	const user = useAuth();
	const role = user?.user?.role;

	if (
		role !== PERMISSION.SYSTEM_ADMIN &&
		props.host !== SUB_DOMAIN.SYSTEM_ADMIN
	) {
		return <Navigate to="/login" replace />;
	}
	return props.children;
};
