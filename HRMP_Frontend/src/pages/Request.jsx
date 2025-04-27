import React, {useEffect, useState} from "react";
import {TopBar} from "../components/TopBar.jsx";
import {SideBar} from "../components/SideBar.jsx";
import {Heading} from "../components/Heading.jsx";
import {getAllLeaves, updateLeaveStatus} from "../services/client.jsx";
import {Menu} from "../components/Menu.jsx";
import {ConfirmationMessage} from "../components/ConfirmationMessage.jsx";
import {useLocation} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";


export const Request = () => {

    const location = useLocation()

    const me = location.state || {}

    const [showSpinner, setShowSpinner] = useState(false)


    const [allLeaves, setAllLeaves] = useState([{}])

    const [pending, setPending] = useState({id: null, status: null});

    const [sideBar, setSideBar] = useState(false);

    const [showDialogue, setShowDialogue] = useState(false)


    useEffect(() => {


        setShowSpinner(true)
        getAllLeaves().then((res) => {

            console.log(res);
            setAllLeaves(res?.data);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setShowSpinner(false)
        })
    },[]);


    return (<div>
            <TopBar user={me} sideBar={sideBar} setSideBar={setSideBar}/>

            <div className={"flex  w-full "}>
                <SideBar toggleSidebar={sideBar} setToggleSidebar={setSideBar}/>
                <div className={'space-4 mx-auto w-full p-4'}>
                    <Heading text={"Leaves Requests"}/>

                    <div className={" w-full  "}>
                        <div
                            className={"flex bg-blue-950 font-semibold text-white  w-full justify-between  border  py-2  items-center capitalize  "}>
                            <div className={'w-full pl-2'}> Name</div>
                            <div className={'w-full'}> Reason</div>
                            <div className={'w-full'}> From</div>
                            <div className={'w-full'}> To</div>
                            <div className={'w-full'}> Status</div>

                        </div>

                        {

                            showSpinner ?
                                <div className={"p-4"}><LoadingSpinner/></div> :
                            allLeaves.filter(leave => leave.status === "PENDING").map((leave, index) => (
                                    <div className={"flex  w-full gap-x-8  border p-2  items-center capitalize  "}>
                                        <div className={'w-full'}>{leave.user.name}</div>
                                        <div className={'w-full'}>{leave.reason}</div>
                                        <div className={'w-full'}>{leave.startDate?.slice(0, 10)}</div>
                                        <div className={'w-full'}>{leave.endDate?.slice(0, 10)}</div>

                                        <div className={''}>
                                            <Menu
                                                dropDownList={["PENDING", "ACCEPTED", "REJECTED"]}
                                                currentValue={leave.status}
                                                placeholderName={""}
                                                dataKey={"status"}
                                                style={'w-min '}
                                                onClicked={(newStatus) => {
                                                    setPending({id: leave.id, status: newStatus});
                                                    setShowDialogue(true);

                                                }}

                                            />
                                        </div>


                                    </div>))


                        }

                    </div>
                </div>

            </div>

            <ConfirmationMessage
                showDeleteDialogue={showDialogue}
                setShowDeleteDialogue={setShowDialogue}
                onClicked={async () => {
                    try {
                        await updateLeaveStatus(pending);
                    } catch (error) {
                        console.error("Error deleting customer:", error?.response?.data || error.message);
                    }
                }}
            />


        </div>

    )
}
