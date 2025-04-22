import {AiFillContacts, AiOutlineContacts} from "react-icons/ai";

export const Logo = () => {
    return (
        <div className={"flex flex-row items-center gap-2"}>

            <AiFillContacts className={"size-12 text-blue-900  "} />
            <h1 className={"font-extrabold text-4xl text-blue-950 tracking-wide"} >HRM</h1>
        </div>
    )
}