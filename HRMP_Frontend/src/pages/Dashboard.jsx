import {TopBar} from "../components/TopBar.jsx";
import {SideBar} from "../components/SideBar.jsx";
import React, {useEffect, useState} from "react";
import {Heading} from "../components/Heading.jsx";
import {API, getCustomers} from "../services/client.jsx";
import {Table} from "../components/Table.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";


export  const Dashboard = ()=>{
    const [me, setMe] = useState({});
    const [sideBar, setSideBar] = useState(false);


    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])


    const customerData = () => {
        setLoading(true)
        getCustomers()
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setUsers(res.data);
                }

                else (
                    setUsers([])
                )
                console.log(res.data)
            })
            .catch(err => {

                console.log(err);
            })
            .finally(() => setLoading(false));

    };

    useEffect(()=>{
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

                <div className={'space-4 mx-auto'}>
                    <Heading text={"Dashboard"} />

                    {
                        !loading?  <Table me={me} updateCustomers={customerData} users={users} setUsers={setUsers}/>:<LoadingSpinner/>
                    }


                </div>

            </div>
        </div>

    )
}