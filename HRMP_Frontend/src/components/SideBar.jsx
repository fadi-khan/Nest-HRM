import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";


const SideBar = ({ toggleSidebar, setToggleSidebar }) => {

    const navigate = useNavigate();
    const onItemClick = (item) => {
        navigate(item)
    }

    return (

        <>

            {toggleSidebar && (
                <div
                    className="fixed  inset-0 bg-black bg-opacity-50 md:hidden z-40"
                    onClick={() => setToggleSidebar(false)}
                ></div>
            )}
            <div
                className={ ` fixed  md:relative  h-screen  md:left-0 top-0 ease-in-out duration-500 px-2 text-white md:w-[25%] w-[80%] border-r
                 bg-blue-950 border-green-700 border-opacity-30  z-40
            ${toggleSidebar ? "left-0" : "-left-full"}`}>


                {/*//for mobile*/}
                <div className="m-4 flex justify-between items-center  md:hidden">
                    <h2 className=" font-mono text-3xl font-bold ">Menu</h2>
                    <div onClick={() => setToggleSidebar(false)} className="text-white text-xl cursor-pointer ">
                        <AiOutlineClose/>
                    </div>
                </div>


                <ul  onClick={() => setToggleSidebar(false)} className={"m-auto py-16 "}>

                        <div
                             className={` p-2 flex flex-col items-center justify-center space-x-2 gap-y-3`}>

                            <li onClick={()=>onItemClick('/dashboard')} className={`p-3 shadow-lg w-full justify-center hover:bg-blue-900 hover:rounded `}>Dashboard</li>
                            <li onClick={()=>onItemClick('/employee')} className={`p-3 shadow-lg w-full justify-center hover:bg-blue-900 hover:rounded `}>Employees </li>
                            <li onClick={()=>onItemClick('/requests')} className={`p-3 shadow-lg w-full justify-center hover:bg-blue-900 hover:rounded `}>Leave Requests </li>
                            <li onClick={()=>onItemClick('/')} className={`p-3 shadow-lg w-full justify-center hover:bg-blue-900 hover:rounded `}>Logout</li>
                        </div>

                </ul>
            </div>
        </>

    );
};


export {SideBar};
