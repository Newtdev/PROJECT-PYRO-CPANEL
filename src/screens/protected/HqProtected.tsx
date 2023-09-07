import { Navigate } from "react-router-dom";
import { PERMISSION, SUB_DOMAIN } from "src/helpers/Constant";
import { useAuth } from "src/hooks/useAuth";

export const HQProtectedComp = (props: any) => {
	const user = useAuth();
	const role = user?.user?.role;

	if (role !== PERMISSION.HQ && props.host !== SUB_DOMAIN.HQ) {
		return <Navigate to="/login" replace />;
	}
	return props.children;
};
