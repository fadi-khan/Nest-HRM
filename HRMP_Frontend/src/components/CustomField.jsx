


export const CustomField = ({value , name ,type ,errorMsg, inputLabel,  placeholder ,register ,style="", isLoginScreen=false })=> {
  if (isLoginScreen){
      return (
          <div className={` flex  flex-col  gap-y-1 w-full `}>

                  <div className={' text-md w-full   text-blue-950 font-bold  '}>{inputLabel} </div>
                  <input
                      {...register(name)}
                      type={type}
                      className={" rounded-xl border min-w-[215px] w-full border-blue-950  py-2 px-4 focus:outline-none  "}
                      placeholder={placeholder}
                      required={true}


                  />



              <label className={"text-red-600 text-sm h-6 "}>{errorMsg} </label>
          </div>
      )
  }
  else {
      return (
          <div className={` flex  flex-col  gap-y-1 w-full `}>


              <div className={`  w-full flex  items-center justify-center gap-x-4`}>

                  <div className={' text-md w-full  lg:text-right text-left text-blue-950 font-bold  pl-4'}>{inputLabel} </div>

                  <input
                      {...register(name)}
                      type={type}
                      className={" rounded-xl border border-blue-950  py-2 px-4 focus:outline-none  "}
                      placeholder={placeholder}
                      required={true}
                      defaultValue={value}
                  />

              </div>

              <label className={"text-red-600 text-sm h-6 "}>{errorMsg} </label>
          </div>
      )
  }
}