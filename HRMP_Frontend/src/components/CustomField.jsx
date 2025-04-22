


export const CustomField = ({  name ,type ,errorMsg, inputLabel,  placeholder ,register })=> {
    return (
        <div className={"flex flex-col  gap-y-1  "}>
            <label className={'text-md text-blue-950 font-bold'}>{inputLabel} </label>

            <div className={"flex w-full items-center"}>

                <input

                    {...register(name)}
                    type={type}
                    className={" rounded-xl border border-blue-950  py-2 px-4 focus:outline-none  "}
                    placeholder={placeholder}
                    required={true}

                />
            </div>


            <label className={"text-red-600 text-sm h-6 "}>{errorMsg} </label>
        </div>
    )
}