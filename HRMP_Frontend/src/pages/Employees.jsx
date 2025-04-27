import {AiOutlineArrowLeft} from "react-icons/ai";

export const Employees = () => {
    return(
        <div>
            <h1> This page is currently not available  </h1>

            <div className={'flex items-center gap-x-2 p-4 underline'}>
                <AiOutlineArrowLeft/>
                <a  href={'/dashboard'}>  Go to home </a>
            </div>

        </div>
    )

}
