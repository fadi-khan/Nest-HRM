import {TopBar} from "../components/TopBar.jsx";
import {Heading} from "../components/Heading.jsx";
import {CustomForm} from "../components/CustomForm.jsx";
import {useLocation} from "react-router-dom";
import {SideBar} from "../components/SideBar.jsx";
import React, {useState} from "react";


export  const UpdatePage = ()=>{


    const [sideBar, setSideBar] = useState(false);

    const location = useLocation();
    const { currentUser, user } = location.state || {};

    return (
        <div>
            <TopBar user={user} sideBar={sideBar} setSideBar={setSideBar} />

            <div className={"flex  "}>
                <SideBar  toggleSidebar={sideBar} setToggleSidebar={setSideBar} />
                <div className={'space-4 mx-auto w-full  p-4'}>
                    <Heading text={"Update Employee"} />

                    <CustomForm heading={"Edit Employee"} currentUser={currentUser} me={user}/>


                </div>

            </div>
        </div>

    )
}