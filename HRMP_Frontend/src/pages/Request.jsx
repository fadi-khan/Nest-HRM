import React, {useEffect, useState} from "react";
import {TopBar} from "../components/TopBar.jsx";
import {SideBar} from "../components/SideBar.jsx";
import {Heading} from "../components/Heading.jsx";
import {API, getAllLeaves} from "../services/client.jsx";
import {Menu} from "../components/Menu.jsx";


export  const Request = ()=>{

    const [currentUser, setCurrentUser] = useState({});

    const [allLeaves, setAllLeaves] = useState([{}] )

    const [sideBar, setSideBar] = useState(false);



    useEffect(() => {


         getAllLeaves().then((res)=>{

            console.log(res);
            setAllLeaves(res?.data);
        }).catch(
            err => {console.log(err)}
        )

          API("/auth/status").then((response) => {
             setCurrentUser(response?.data);
         }).catch((error) => {
             localStorage.removeItem("token");

         })
    }, []);



    return (
        <div>
            <TopBar user={currentUser} sideBar={sideBar} setSideBar={setSideBar} />

            <div className={"flex  w-full "}>
                <SideBar  toggleSidebar={sideBar} setToggleSidebar={setSideBar} />
                <div className={'space-4 mx-auto w-full p-4'}>
                    <Heading text={"Leaves Requests"} />

                    <div className={" w-full  "}>
                        <div className={"flex bg-blue-950 font-semibold text-white  w-full justify-between  border  py-2  items-center capitalize  "}>
                            <div className={'w-full pl-2'}> Name </div>
                            <div className={'w-full'}>  Reason </div>
                            <div className={'w-full'}> From </div>
                            <div className={'w-full'}> To </div>
                            <div className={'w-full'}> Status </div>

                        </div>

                        {


                            allLeaves.filter(leave=> leave.status ==="PENDING").map((leave, index) => (
                                <div className={"flex  w-full gap-x-8  border p-2  items-center capitalize  "}>
                                    <div className={'w-full'}>{leave.user?.name}</div>
                                    <div className={'w-full'}>{leave.reason}</div>
                                    <div className={'w-full'}>{leave.startDate?.slice(0,10)}</div>
                                    <div className={'w-full'}>{leave.endDate?.slice(0,10)}</div>

                                   <div className={''}>
                                       <Menu
                                           dropDownList={["PENDING" , "ACCEPTED" , "REJECTED"] }
                                           currentValue={leave.status}
                                           placeholderName={""}
                                           dataKey={"status"}
                                           style={'w-min '}

                                       />
                                   </div>



                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </div>

    )
}

const modifyString = (startNo,endNumber , stringToModify) => {

    return stringToModify.toString().slice(startNo,endNumber);
}