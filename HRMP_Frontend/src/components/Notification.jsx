import {useEffect, useState} from "react";

export const Notification = ({message =" Error occurred! ",notificationTypeError=false,show})=>{

    const [showMsg, setShowMsg] = useState(show)

    useEffect(() => {
        if (show) {
            setShowMsg(true);
            setTimeout(() => {
                setShowMsg(false);
            }, 3000);
        }
    }, [show]);

        return (
            <div className={`${!showMsg ? "bg-transparent hidden":"px-4 py-3" } ${notificationTypeError ?"bg-red-700":"bg-green-800"}  m-auto fixed z-50 text-white font-bold  rounded-lg text-sm  text-center md:left-1/2  bottom-0 my-2 left-1/3 
                `}>
                {message}

            </div>
        )

}

