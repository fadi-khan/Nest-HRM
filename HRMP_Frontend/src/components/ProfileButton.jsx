import { useState } from "react";
import { Avatar } from "./Avatar.jsx";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { DropDownMenu } from "./DropDownMenu.jsx";

const ProfileButton = ({user}) => {
    const [dropDown, setDropDown] = useState(false);

    const handleOverlayClick = () => {
        setDropDown(false);
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>

            {dropDown && ( 
                <div
                    className="fixed inset-0 bg-black bg-opacity-50  z-40"
                    onClick={handleOverlayClick}
                ></div>
            )}

            <div className={"z-50 relative flex-col items-center justify-center  md:w-auto"}>
                <div
                    className={"cursor-pointer flex justify-center items-center gap-3 p-3"}
                    onClick={() => setDropDown(!dropDown)} // Toggle dropdown
                >
                    <Avatar rest={"w-8 h-8  md:w-12 md:h-12"} user={user} />
                    <ul className={"hidden md:block"}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <li>{user.name}</li>
                        <li className={"font-light"}>{user.employeType}</li>
                    </ul>
                    <div className={"hidden md:block"}>
                        { !dropDown ? (
                            <AiOutlineDown size={16} className={'text-blue-950 font-bold'} />
                        ) : (
                            <AiOutlineUp size={16} className={'text-blue-950 font-bold'} />
                        )}
                    </div>
                </div>

                <div
                    className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-all duration-300 transform ${
                        dropDown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none "
                    } `}
                    onClick={handleDropdownClick} // Prevent closing when clicking inside
                >
                    <DropDownMenu setDropDown={setDropDown} />
                </div>
            </div>
        </>
    );
};

export { ProfileButton };
