import React from 'react';

const LoadingSpinner = () => {

    console.log("hello i am called ");

    return (
        <div className="flex justify-center items-center w-full">
            <div className="animate-spin  rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-950"></div>
        </div>
    );
};

export default LoadingSpinner;