import { useLocation } from "react-router-dom";

export default function useCustomLocation() {
	let path = useLocation();
	let routePath = path?.state;
	let slicedPath = path.pathname.split("/");

	return { slicedPath, routePath, path };
}
