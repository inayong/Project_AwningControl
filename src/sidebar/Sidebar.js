import React, { useState } from 'react';
import { CiViewList, CiLogout, CiIndent, CiDesktop, CiFloppyDisk, CiSquarePlus } from "react-icons/ci";
import AddData from './AddData';

const Sidebarcomm = ({ openModal }) => {
    const [close, setClose] = useState(true);
    



    return (
        <div>
            <div className={`${close ? "sm:w-16" : "sm:w-60"} bg-slate-300 h-screen`}>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center pt-5`}>
                    <CiIndent onClick={() => setClose(!close)} size={30} />
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center pt-5`}>
                    <CiLogout size={30} color={`${close ? 'gray' : 'black'}`} />
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center pt-5`}>
                    {close ? (<CiDesktop size={30} color={`${close ? 'black' : 'gray'}`} />
                    ) : (
                        <>
                            <CiDesktop size={30} color={`${close ? 'black' : 'gray'}`} />
                            <div className='pl-5'>모니터링</div>
                        </>
                    )}
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center pt-5`}>
                    {close ? (<CiFloppyDisk size={30} color={`${close ? 'black' : 'gray'}`} />
                    ) : (
                        <>
                            <CiFloppyDisk size={30} color={`${close ? 'black' : 'gray'}`} />
                            <div className='pl-5'>어닝상태</div>
                        </>
                    )}
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center pt-5`}>
                    {close ? (<CiViewList size={30} color={`${close ? 'black' : 'gray'}`} />
                    ) : (
                        <>
                            <CiViewList size={30} color={`${close ? 'black' : 'gray'}`} />
                            <div className='pl-5'>목록</div>
                        </>
                    )}
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center pt-5`} onClick={openModal}>
                    {close ? (<CiSquarePlus size={30} color={`${close ? 'black' : 'gray'}`} />
                    ) : (
                        <>
                            <CiSquarePlus size={30} color={`${close ? 'black' : 'gray'}`} />
                            <div className='pl-5'>추가</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebarcomm;