import {deleteCustomer} from "../services/client.jsx";

import React, {useState} from "react";
import {Notification} from "./Notification.jsx";
import {useNavigate} from "react-router-dom";

export const ConfirmationMessage = ({id , updateCustomerList ,showDeleteDialogue,  setShowDeleteDialogue }) => {

    const [showNotification, setShowNotification] = useState(false)

    const handleDelete =   (id) => {
        try {
            deleteCustomer(id).then(() => {
                updateCustomerList();
                setShowDeleteDialogue(false);

             })


        }
        catch (error) {
            throw error.response.data;
        }
        finally {
            setShowNotification(true)
        }
    }


    return (

        <>
            <Notification message={"deleted successfully."} show={showNotification} />


        {

            showDeleteDialogue && <div
            className={"fixed h-32   rounded-lg left-1/4 md:left-1/2 top-1/2  bottom-1/2 w-72 bg-gray-900 drop-shadow  shadow-lg   gap-y-4  text-white  z-50 "}>


        <div className={" w-full text-center p-4 "}>


            <h2 className={"font-bold text-lg"}>Are you sure ?</h2>
            <div className={"flex justify-between p-4 mt-4 "}>
                <div className={"border w-1/3 py-1 bg-green-800"}
                                    onClick={() => {
                                        handleDelete(id)


                                    }}>
                                Yes
                            </div>
                            <div className={"border w-1/3 bg-red-700"}
                                    onClick={() => {
                                        setShowDeleteDialogue(false)
                                    }}>
                                No
                            </div>
                        </div>
                    </div>


                </div>
            }
        </>
    )
}