export const Heading = ({text="to HRM" ,rest})=>{

    return (
        <h1 className={`${rest} text-3xl font-bold p-6 `}>
            {text}
        </h1>
    )
}