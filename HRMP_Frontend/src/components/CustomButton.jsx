export const CustomButton = ({ type , buttonLabel})=>{
    return(
        <button

    type={type}
    className="text-xl  bg-blue-950 text-white   font-bold">

            {buttonLabel}
    </button>
    )
}