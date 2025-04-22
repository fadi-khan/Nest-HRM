import {SideBar} from "../components/SideBar.jsx";
import {Dashboard} from "./Dashboard.jsx";

export const Layout = ()=>{
   return (
       <div className={"flex flex-1 w-full "}>
           <SideBar/>
           <Dashboard/>
       </div>
   )
}