import {AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import React, {useEffect, useState} from "react";


export const Menu = ({
                         dropDownList = [],
                         setUserUpdate,
                         dataKey,
                         placeholderName = 'Select',
                         isBooleanList = false,
                         currentValue,

    style='',
    onClicked = () => {}

                     }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [value, setValue] = useState(placeholderName)

    useEffect(() => {
        if (currentValue !== null && currentValue !== undefined) {
            if (isBooleanList) {
                setValue(dropDownList[currentValue ? 0 : 1]);
            } else {
                setValue(currentValue);
            }
        }
    }, [currentValue, isBooleanList]);


    const modifyList = (item) => {

        setUserUpdate((prev) => ({

            ...prev, [dataKey]: item === 0
        }));

    }

    return <>


            {isOpen && <div
                onClick={() => {

                    setIsOpen(false)
                }}
                className={"fixed inset-0 z-40 bg-black opacity-50"}>

            </div>}


            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`select-none  relative cursor-pointer w-full  flex items-center   justify-center gap-x-4  `}>

                <label
                    className={`${style} text-md w-full lg:text-right text-left text-blue-950 font-bold  pl-4 capitalize`}> {placeholderName}  </label>
                <div
                    className={'flex  rounded-xl justify-between items-center w-[215px] min-w-[215px]  border border-blue-950 py-2    px-4'}>
                    <div className={''}>{value}</div>
                    <div>{!isOpen ? <AiOutlineDown/> : <AiOutlineUp/>}</div>

                </div>

                {isOpen && <div className={'absolute min-w-[215px]  right-0 top-full  z-50 '}>
                    {dropDownList.map((item, i) => <div
                        onClick={() => {
                            setValue(item)
                            currentValue = null

                            onClicked(item);
                            if (isBooleanList) {
                                modifyList(i)
                            } else {
                                setUserUpdate((prev) => ({

                                    ...prev, [dataKey]: item
                                }));
                            }
                        }}

                        className={'border py-2 px-4  hover:text-white bg-white hover:bg-blue-950 '}
                        key={i}>
                        {item

                        }


                    </div>)}

                </div>}

            </div>



        </>
}