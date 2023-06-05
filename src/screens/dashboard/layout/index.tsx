import { ReactElement, ReactNode } from "react";
import Main from "./main";
import SideBar from "./SideBar";

const Layout = ({ children }: any): ReactElement => {
	return (
		<main className="w-screen h-screen flex justify-end overflow-x-hidden">
			<SideBar />
			<Main>{children}</Main>
		</main>
	);
};

export default Layout;
