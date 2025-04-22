import {useNavigate} from "react-router-dom";

const DropDownMenu = ({setDropDown})=>{

    const navigate=  useNavigate()
    return (
        <nav className={" text-center border border-blue-950  rounded  font-bold     "}>
            <ul className={""} onClick={()=>setDropDown(false)}>
                <li className={"p-2  border border-blue-950 h-12 hover:text-white  hover:bg-blue-950  "}>Profile</li>
                <li onClick={
                    ()=>{
                        localStorage.removeItem('token')
                        navigate('/')
                    }
                }  className={"p-2 border border-blue-950  h-12 hover:text-white  hover:bg-blue-950"}>Logout</li>

            </ul>
        </nav>
    )
}

export { DropDownMenu };