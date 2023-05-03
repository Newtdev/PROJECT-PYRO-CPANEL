import { ReactElement, ReactNode } from "react";
import Main from "./main";
import SideBar from "./SideBar";

const Layout = ({ children }: any): ReactElement => {
	return (
		<main className="w-screen h-screen flex bg-[#f0f5f6] ">
			<SideBar />
			<Main>{children}</Main>
		</main>
	);
};

export default Layout;
