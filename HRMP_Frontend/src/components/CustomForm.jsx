
import React, {useState, useEffect} from "react";
import {updateCustomer} from "../services/client.jsx";
import {BiArrowBack} from "react-icons/bi";
import {Notification} from "./Notification.jsx";
import {useForm} from "react-hook-form";
import {CustomField} from "./CustomField.jsx";
import {Menu} from "./Menu.jsx";



export const CustomForm = ({currentUser, me ,heading}) => {
    const [showNotification, setShowNotification] = useState(false)
    const [error, setError] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [formData, setFormData] = useState({
        isActive: true,
    })


    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            values:{
            name : currentUser?.name,
            contactNo: currentUser?.contactNo,
            email : currentUser?.email,
            address : currentUser?.address,
            dob : currentUser?.dob.slice(0,10)

        }})

    useEffect(() => {
        if(showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    const onSubmit = async (data) => {
        try {

            const payload = {
                ...formData,
                ...data,
                dob: data.dob + "T00:00:00.000Z"
            };

            await updateCustomer(payload, currentUser.id);
            setConfirmationMessage("Customer saved successfully!");


            setError(false)
            setShowNotification(true)
        } catch (error) {
            setError(true);

            setConfirmationMessage(error?.message || "An error occurred!");
            setShowNotification(true)
        }
    }


    return (
        <div className=" bg-gradient-to-br from-blue-50 to-blue-100 p-8 select-none">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-visible">
                {/* Header Section */}
                <div className="px-8 py-6 bg-gradient-to-r from-blue-900 to-blue-800">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-white font-sans">
                            {heading}
                        </h1>
                        <a href="/dashboard" className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200">
                            <BiArrowBack className="w-5 h-5" />
                            <span className="font-semibold">Back to Dashboard</span>
                        </a>
                    </div>
                </div>


                <div className="px-8 py-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid  grid-cols-1  lg:grid-cols-2 justify-end md:px-8 gap-x-10 ">
                            <CustomField
                                register={register}
                                name="name"
                                inputLabel="Full Name"
                                placeholder="full name"
                                errorMsg={errors.name}
                                required

                            />
                            <CustomField
                                register={register}
                                name="contactNo"
                                inputLabel="Phone Number"
                                placeholder="0300 1234567"
                                errorMsg={errors.contactNo}
                                required


                            />
                            <CustomField
                                register={register}
                                name="email"
                                inputLabel="Email Address"
                                placeholder="abc@gmail.com"
                                type="email"
                                errorMsg={errors.email}
                            />
                            <CustomField
                                register={register}
                                name="address"
                                inputLabel="Address"
                                placeholder="123 Main Street"
                                errorMsg={errors.address}
                            />
                           <div className={'mb-6'}>
                               <Menu
                                   dataKey={'isActive'}
                                   setUserUpdate={setFormData}
                                   placeholderName={'Status'} dropDownList={["Active", "Terminated"]}
                                   isBooleanList={true} currentValue={currentUser?.isActive}

                               />
                           </div>

                           <div className={'mb-6'}>
                               <Menu
                                   dataKey={'gender'}
                                   setUserUpdate={setFormData}
                                   placeholderName={'Gender'} dropDownList={["MALE", "FEMALE", "OTHER"]}
                                   currentValue={currentUser?.gender}
                               />
                           </div>

                            <div className={'mb-6'}>
                                <Menu
                                    dataKey={'department'}
                                    setUserUpdate={setFormData}
                                    placeholderName={'From'}
                                    dropDownList={["'HR", "IT", "RESEARCH", "OPERATIONS", "SUPPORT"]}
                                    currentValue={currentUser?.department}
                                />
                            </div>

                            <div className={'mb-6'}>
                                <Menu
                                    dropDownList={["GENERAL", "ADMIN", "MANAGER"]}
                                    setUserUpdate={setFormData}
                                    dataKey={"employeType"}
                                    placeholderName={"Employee Type"}
                                    currentValue={currentUser?. employeType}
                                />
                            </div>

                            <CustomField
                                register={register}
                                name="dob"
                                inputLabel="DOB"
                                placeholder={'mm/dd/yyyy'}
                                errorMsg={errors.dob}
                                required
                                type={"text"}
                            />






                        </div>


                        <div className="flex justify-end px-8 mt-6">
                            <button
                                type="submit"
                                className="w-48 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Notification
                message={confirmationMessage}
                show={showNotification}
                notificationTypeError={error}
                onClose={() => setShowNotification(false)}
            />
        </div>
    )
}