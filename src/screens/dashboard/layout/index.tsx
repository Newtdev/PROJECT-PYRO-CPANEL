import { ReactElement } from "react";
import Main from "./MainPage";

import SideBar from "./SideBar";

const Layout = ({ children }: any): ReactElement => {
	return (
		<main className="w-screen h-screen flex flex-row overflow-x-hidden">
			<SideBar />
			<Main>{children}</Main>
		</main>
	);
};

export default Layout;
