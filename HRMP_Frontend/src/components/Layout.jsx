import { useState } from "react";
import {TopBar} from "./TopBar";
import {SideBar} from "./SideBar";
import {Outlet} from "react-router-dom";

const Layout = () => {
    const [sideBar, setSideBar] = useState(false);
    const [formBar, setFormBar] = useState(false);  // ✅ Define formBar here

    return (
        <div className={`${formBar ? "overflow-clip" : "overflow-auto"} h-screen flex flex-col `}>

            <TopBar/>

            {/* Sidebar + MainContent Layout */}
            <div className="flex flex-1">
                <SideBar  toggleSidebar={sideBar} setToggleSidebar={setSideBar} />
                 <Outlet />
            </div>
        </div>
    );
};

// export default Layout;


