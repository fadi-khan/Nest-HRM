import {TopBar} from "../components/TopBar.jsx";
import {SideBar} from "../components/SideBar.jsx";
import React, {useEffect, useState} from "react";
import {Heading} from "../components/Heading.jsx";
import {API, getAllLeaves, getCustomers} from "../services/client.jsx";
import {Table} from "../components/Table.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import {InfoCard} from "../components/InfoCard.jsx";


export  const Dashboard = ()=>{
    const [me, setMe] = useState({});
    const [sideBar, setSideBar] = useState(false);

    const [leaves, setLeaves] = useState([])

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([{}])




    const customerData = () => {
        setLoading(true)


        getCustomers()
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setUsers(res.data);

                    console.log(res.data);
                }

                else (
                    setUsers([])
                )

            })
            .catch(err => {

                console.log(err);
            })
            .finally(() => setLoading(false));

    };

    useEffect(()=>{



        // getting all the leaves
        getAllLeaves().then(res=>{
            setLeaves(res.data)
            console.log(leaves)

        }).catch(
            err => console.log(err)
        )


        API.get('/auth/status').
        then(res=>{
            setMe(res.data)
            customerData()
        }).catch( ()=>{
            localStorage.removeItem("token");

        })
    },[]);



    return (
        <div>
            <TopBar setSideBar={setSideBar} sideBar={sideBar} user={me} />

            <div className={"flex  "}>
                <SideBar  toggleSidebar={sideBar} setToggleSidebar={setSideBar} />

                <div className={'space-4 space-y-5 mx-auto'}>
                    <Heading text={"Dashboard"} />


                 <div className={"flex px-4 py-4  w-full items-center justify-between  "}>
                     <InfoCard data={users.length} heading={'Total Employees'}/>
                     <InfoCard style={'text-yellow-500'}  data={leaves.filter(leaves => leaves.status === "PENDING").length} heading={'Pending Leaves'}/>
                     <InfoCard style={'text-green-500'}  data={leaves.filter(leaves => leaves.status === "ACCEPTED").length} heading={'Accepted Leaves'}/>
                     <InfoCard style={'text-red-500'}   data={leaves.filter(leaves => leaves.status === "REJECTED").length} heading={'Rejected Leaves'}/>

                 </div>

                    {
                        !loading?  <Table me={me} updateCustomers={customerData} users={users} setUsers={setUsers}/>:<LoadingSpinner/>
                    }


                </div>

            </div>
        </div>

    )
}