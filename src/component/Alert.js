import React from 'react';
import { CiBullhorn } from "react-icons/ci";

const Alert = ({ message, show }) => {
    if (!show) return null;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-center items-center'>
            <div className='bg bg-white w-1/3 border-t-4 border-cyan-800 rounded-b px-2 py-1 shadow-md my-2' role='alert'>
                <div className='flex justify-center items-center'>
                    <div className='py-1'>
                        <CiBullhorn size={25} className='mr-3 fill-cyan-800'/>
                    </div>
                    <div>
                        <p className="text-sm">{message}</p>
                    </div>
                </div>
            </div>
            {/* <button onClick={onClose} className="text-2xl leading-none px-3 py-1 border-0 rounded bg-transparent">
                &times;
            </button> */}
        </div>
    )
}

export default Alert;