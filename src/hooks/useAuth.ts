import { useMemo } from "react";
import {
	selectCurrentLoginToken,
	selectCurrentLoginUser,
} from "src/features/auth/authSlice";
import { useAppSelector } from "./reduxhooks";

export const useAuth = () => {
	const user = useAppSelector(selectCurrentLoginUser);

	return useMemo(() => ({ user }), [user]);
};

export const useToken = () => {
	const token = useAppSelector(selectCurrentLoginToken);

	return useMemo(() => ({ token }), [token]);
};
