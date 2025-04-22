import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const Options = ({customer,setCurrentCustomer ,setUpdateFormBar ,setShowDeleteDialogue}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setCurrentCustomer(customer)
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="z-50 relative dropdown-container">
            {/* Three Dots Button */}
            <button
                onClick={toggleMenu}
                className="   w-5 font-bold rounded-full  h-7      text-gray-900 "

            >
                 ⋮
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className=" absolute right-0 mt-2 w-32  border bg-[#000900] shadow-lg rounded-lg">
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-green-600 rounded-t-lg "
                        onClick={() =>
                            {
                                setCurrentCustomer(customer)
                                setUpdateFormBar(true)
                                setIsOpen(false)

                            }
                    }
                    >
                        ✏️ Edit
                    </button>

                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-green-600 rounded-b-lg text-red-600"
                            onClick={
                            () => {
                                setShowDeleteDialogue(true)
                                setCurrentCustomer(customer)
                                setIsOpen(false)
                            }
                        }
                        >
                            🗑️ Delete
                        </button>


                </div>
            )}

        </div>
    );
};

export default Options;
