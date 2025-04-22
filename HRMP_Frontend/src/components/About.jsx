import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";


export function About() {

    const location =useLocation();
    const customerData = location.state

    const [formData, setFormData] = useState(customerData)

    const navigate = useNavigate();
    return(
        <div className={"dark:text-white "}>
            <div className={"flex-1  "} onClick={() => {
                navigate("/")
            }}> {
            } This is About Page  </div>



        </div>

    )
}