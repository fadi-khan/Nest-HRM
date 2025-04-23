// import React, {useState} from "react";
// import {saveCustomer, updateCustomer} from "../services/client.jsx";
//
// import {BiArrowBack} from "react-icons/bi";
// import {Notification} from "./Notification.jsx";
// import {useForm} from "react-hook-form";
// import {CustomField} from "./CustomField.jsx";
//
//
// export const CustomForm = ({id , me} ) => {
//
//     const [showNotification, setShowNotification] = useState(false)
//     const [error, setError] = useState(false);
//
//     const [confirmationMessage, setConfirmationMessage] = useState("")
//     const [fieldsErrorMsg, setFieldsErrorMsg] = useState({})
//
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm()
//
//     const onSubmit = async (e) => {
//         try {
//
//             await updateCustomer(e,id)
//             setConfirmationMessage("Customer Added Successfully !");
//             setFieldsErrorMsg({})
//             setShowNotification(true)
//
//
//         } catch (error) {
//             setError(true);
//             setFieldsErrorMsg(error);
//
//             console.log(error)
//             error?.message ? setConfirmationMessage(error.message) : setConfirmationMessage("Error occurred!");
//             setShowNotification(true)
//
//
//         }
//     }
//
//
//     return (
//
//
//         <div
//             className={` t-4 w-full `}>
//
//
//             <div
//                 className={"p-4   m-4  border rounded-lg  border-gray-600 border-opacity-30 shadow-sm shadow-gray-900   "}>
//                 <div className={"px-4 flex  justify-between  "}>
//                     <label className={"font-mono text-2xl font-bold text-blue-800"}>Add New Customer</label>
//                     <a href={"/dashboard"}
//                        className={" font-mono border border-opacity-0 border-white hover:border-opacity-50   text-blue-800 flex gap-x-1 text-center items-center underline underline-offset-2 hover:border p-1 font-bold  "}>
//
//                         <BiArrowBack/> Home
//                     </a>-
//                 </div>
//
//                 <div
//                     className={` flex text-center text-sm pl-4 ${error ? "text-red-600" : "text-green-500"}  select-text   bg-opacity-25 h-6  text-center mt-6`}>
//                     {confirmationMessage}
//                 </div>
//
//
//                 <form onSubmit={handleSubmit(onSubmit)} className="
//                      p-4 pt-0 grid  gap-x-6 gap-y-2 grid-cols-1  md:grid-cols-2    ">
//
//                     {showNotification && <Notification message={confirmationMessage} show={showNotification}
//                                                        notificationTypeError={error}/>}
//
//
//
//                     <CustomField register={register} name={'name'} inputLabel={'Name'} placeholder={'Name'} />
//                     <CustomField register={register} name={'contactNo'} inputLabel={'Phone Number'} placeholder={'e.g. 03089275702'}/>
//                     <CustomField register={register} name={'email'} inputLabel={'Email '} placeholder={'email@gmail.com'} type={'email'}/>
//                     <CustomField register={register} name={'address'} inputLabel={'Address'} placeholder={'Punjab, Rawalpindi'} type={'text'}/>
//
//
//
//
//                     <button
//
//                         onClick={()=>{setShowNotification(!showNotification)} }
//                         type="submit"
//                             className=" md:col-span-2
//                                     m-auto w-40  h-12 bg-blue-950 text-white text-xl px-4 py-1 rounded-xl font-bold my-12">
//                         Save
//                     </button>
//
//
//                 </form>
//             </div>
//
//         </div>
//
//
//     )
// }
import React, {useState, useEffect} from "react";
import {saveCustomer, updateCustomer} from "../services/client.jsx";
import {BiArrowBack} from "react-icons/bi";
import {Notification} from "./Notification.jsx";
import {useForm} from "react-hook-form";
import {CustomField} from "./CustomField.jsx";
import {Menu} from "./Menu.jsx";


export const CustomForm = ({id, me}) => {
    const [showNotification, setShowNotification] = useState(false)
    const [error, setError] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [value, setValue] = useState('')
    const [formData, setFormData] = useState({})
    const [customer, setCustomer] = useState({});

    const handleChange = (e) => {

        setCustomer({...customer, [e.target.name]: e.target.value})
        setConfirmationMessage("")
    }

    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

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
            setFormData(prev => ({
                ...prev,
                ...data
            }));
            await updateCustomer(data, id)
            setConfirmationMessage("Customer saved successfully!");

            setError(false)
            setShowNotification(true)
        } catch (error) {
            setError(true);

            setConfirmationMessage(error?.message || "An error occurred!");
            setShowNotification(true)
        }
    }
    console.log(errors)

    return (
        <div className=" bg-gradient-to-br from-blue-50 to-blue-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header Section */}
                <div className="px-8 py-6 bg-gradient-to-r from-blue-900 to-blue-800">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-white font-sans">
                            {id ? 'Edit Customer' : 'Add New Customer'}
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
                            <Menu
                                placeholderName={'Status'} dropDownList={["Active","Terminated"]} value={'isActive'} />

                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                className="w-48 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                            >
                                Save Customer
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