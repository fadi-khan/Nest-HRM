import React, {useState} from "react";
import {saveCustomer, updateCustomer} from "../services/client.jsx";

import {BiArrowBack} from "react-icons/bi";
import {Notification} from "./Notification.jsx";
import {useForm} from "react-hook-form";
import {CustomField} from "./CustomField.jsx";


export const CustomForm = ({id , me} ) => {

    const [showNotification, setShowNotification] = useState(false)
    const [error, setError] = useState(false);

    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [fieldsErrorMsg, setFieldsErrorMsg] = useState({})

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (e) => {
        try {

            await updateCustomer(e,id)
            setConfirmationMessage("Customer Added Successfully !");
            setFieldsErrorMsg({})
            setShowNotification(true)


        } catch (error) {
            setError(true);
            setFieldsErrorMsg(error);

            console.log(error)
            error?.message ? setConfirmationMessage(error.message) : setConfirmationMessage("Error occurred!");
            setShowNotification(true)


        }
    }


    return (


        <div
            className={` t-4 w-full `}>


            <div
                className={"p-4   m-4  border rounded-lg  border-gray-600 border-opacity-30 shadow-sm shadow-gray-900   "}>
                <div className={"px-4 flex  justify-between  "}>
                    <label className={"font-mono text-2xl font-bold text-blue-800"}>Add New Customer</label>
                    <a href={"/dashboard"}
                       className={" font-mono border border-opacity-0 border-white hover:border-opacity-50   text-blue-800 flex gap-x-1 text-center items-center underline underline-offset-2 hover:border p-1 font-bold  "}>

                        <BiArrowBack/> Home
                    </a>-
                </div>

                <div
                    className={` flex text-center text-sm pl-4 ${error ? "text-red-600" : "text-green-500"}  select-text   bg-opacity-25 h-6  text-center mt-6`}>
                    {confirmationMessage}
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="
                     p-4 pt-0 grid  gap-x-6 gap-y-2 grid-cols-1  md:grid-cols-2    ">

                    {showNotification && <Notification message={confirmationMessage} show={showNotification}
                                                       notificationTypeError={error}/>}



                    <CustomField register={register} name={'name'} inputLabel={'Name'} placeholder={'Name'} />
                    <CustomField register={register} name={'contactNo'} inputLabel={'Phone Number'} placeholder={'e.g. 03089275702'}/>
                    <CustomField register={register} name={'email'} inputLabel={'Email '} placeholder={'email@gmail.com'} type={'email'}/>
                    <CustomField register={register} name={'address'} inputLabel={'Address'} placeholder={'Punjab, Rawalpindi'} type={'text'}/>




                    <button

                        onClick={()=>{setShowNotification(!showNotification)} }
                        type="submit"
                            className=" md:col-span-2
                                    m-auto w-40  h-12 bg-blue-950 text-white text-xl px-4 py-1 rounded-xl font-bold my-12">
                        Save
                    </button>


                </form>
            </div>

        </div>


    )
}
