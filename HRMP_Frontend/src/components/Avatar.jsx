import {useState} from "react";

export const Avatar = ({rest , user}) => {

    const [person, setPerson] = useState("men")

    const  createImage= (gender)=>{
        if(gender === "FEMALE"){
            setPerson("women")
        }
        else{
            setPerson("men")
        }
    }
    return (

        <img className={`${rest}    rounded-full ring-2 ring-gray-300 ring-transparent`}
             src={`https://randomuser.me/api/portraits/${person}/${user.id}.jpg`}
             alt="Bordered avatar"/>

    )
}