

export const InfoCard = ({heading,data ,style })=>{

    return(


        <div className={` ${style} space-y-8 text-xl  shadow-2xl rounded-xl text-blue-950 font-semibold  p-4 px-8  `}>
          <div> {heading} </div>
            <div>{data} </div>
        </div>
    )


}