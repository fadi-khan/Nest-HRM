import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import { ConfirmationMessage } from "./ConfirmationMessage.jsx";

export function Table({me, updateCustomers,  users, setUsers }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showDialogue, setShowDialogue] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error loading customers.</div>;

    return (
        <div className="px-4  mt-16 ">
            <div className="w-full shadow-black shadow-lg   overflow-x-auto">
                <table className={"w-full   overflow-hidden"}>
                    <thead className="bg-blue-950 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                        <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Job Title</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Address</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Edit</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Remove</th>
                    </tr>
                    </thead>
                    <tbody className=" divide-gray-200">
                    {users.map((user, i) => (
                        <tr
                            key={i}
                            className="odd:bg-blue-200 even:bg-gray-50 even:hover:text-white hover:bg-blue-400 transition-colors duration-200"
                        >
                            <td className="px-6 py-2 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-2 max-w-[200px] truncate">{user.email}</td>
                            <td className={`hidden md:table-cell font-bold px-6 py-2 whitespace-nowrap ${user.isActive ? "text-green-800" : "text-red-600"}`}>
                                {user.isActive ? "Active" : "Terminated"}
                            </td>
                            <td className="px-6 py-2 max-w-[200px] truncate">{user.jobTitle}</td>
                            <td className="px-6 py-2 max-w-[200px] truncate">{user.address}</td>
                            <td
                                onClick={() => {
                                    navigate('/update',{state: { id:user.id, user:me}})
                                }}
                                className="font-bold px-6 py-2 text-center cursor-pointer text-blue-600 hover:underline"
                            >
                                Edit
                            </td>
                            <td
                                onClick={() => {
                                    setCurrentUser(user);
                                    setShowDialogue(true)
                                }}
                                className="font-bold px-6 py-2 text-center cursor-pointer text-red-600 hover:underline"
                            >
                                Remove
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ConfirmationMessage
                id={currentUser?.id}
                updateCustomerList={updateCustomers}
                showDeleteDialogue={showDialogue}
                setShowDeleteDialogue={setShowDialogue}
            />

        </div>
    );
}
