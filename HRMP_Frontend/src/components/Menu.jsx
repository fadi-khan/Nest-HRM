import {AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import React, {useState} from "react";


export const Menu = ({
                         dropDownList = [],
                         setUserUpdate ,
                         dataKey,
                         placeholderName = 'Select',
                         isBooleanList = false


                     }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [value, setValue] = useState(placeholderName)


    const modifyList = (item) => {

        setUserUpdate((prev) => ({

            ...prev,
            [dataKey]: item === 0
        }));

    }

    return (
        <div onClick={() => setIsOpen(!isOpen)} className={'relative cursor-pointer w-full space-y-2  '}>

            <div className={'flex items-center   justify-center gap-x-4 '}>

                <label
                    className={'text-md w-full lg:text-right text-left text-blue-950 font-bold  pl-4 capitalize'}> {placeholderName}  </label>
                <div
                    className={'flex  rounded-lg justify-between items-center w-[215px] min-w-[215px]  border py-2    px-4'}>
                    <div className={''}>{value}</div>
                    <div>{!isOpen ? <AiOutlineDown/> : <AiOutlineUp/>}</div>

                </div>

            </div>

            {
                isOpen && <div className={'absolute min-w-[215px]  right-0 z-50 '}>
                    {
                        dropDownList.map((item, i) => (
                            <div
                                onClick={() => {
                                    setValue(item)

                                    if (isBooleanList) {
                                        modifyList(item)
                                    } else
                                    {
                                        setUserUpdate((prev) => ({

                                            ...prev,
                                            [dataKey]: item
                                        }));
                                    }
                                }}
                                className={'border py-2 px-4  hover:text-white bg-white hover:bg-blue-950 '}
                                key={i}>
                                {
                                    item

                                }


                            </div>
                        ))
                    }

                </div>
            }

        </div>

    )
}