import {AiOutlineMenu} from "react-icons/ai";
import {ProfileButton} from "./ProfileButton.jsx";
import {Logo} from "./Logo.jsx";
import {Heading} from "./Heading.jsx";


const TopBar = ({sideBar,setSideBar, user}) => {
    return (
    <nav className={` w-full  border-b z-50  shadow-sm shadow-blue-950 flex  justify-between pr-8 pl-2 items-center h-[100px]`}>

        <div
            onClick={() => setSideBar(true)}
            className="md:hidden text-2xl  border p-1   rounded">

            <AiOutlineMenu className={"text-blue-950 font-bold size-8" } />
        </div>
        <div className={"md:flex hidden"}><Logo/></div>
        <div className={"md:hidden "}><Logo/></div>


        <div className={"hidden xl:flex"} > <Heading text={"Welcome, "+ user.name}/> </div>



        <ProfileButton user={user}/>

    </nav>);
};


export {TopBar};


