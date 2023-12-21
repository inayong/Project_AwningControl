import React, { useState } from 'react';
import { CiViewList, CiLogout, CiIndent, CiDesktop, CiFloppyDisk, CiSquarePlus } from "react-icons/ci";
import AddData from '../monitoring/AddData';
import { Link, NavLink } from 'react-router-dom';

const Sidebarcomm = ({ openModal }) => {
    const [close, setClose] = useState(true);
    const [clickMenu, setClickMenu] = useState();

    const handleClickMenu = (menuName) => {
        setClickMenu(menuName)
    };






    return (
        <div>
            <div className={`${close ? "sm:w-16" : "sm:w-60"} bg-slate-300 h-screen`}>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center pt-5`}>
                    {close ? null : <div className='pr-9'>어닝 제어 시스템</div>}
                    <CiIndent onClick={() => setClose(!close)} size={30} />
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center pt-5`}>
                    {close ? null : <div className='pr-16'>로그아웃</div>}
                    <CiLogout size={30} color={`${close ? '#6b7280' : 'black'}`} />
                </div>
                <div onClick={() => handleClickMenu('monitoring')}
                    className={`w-full py-3 ${clickMenu === 'monitoring' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                    <div className={`flex ${close ? "justify-center" : "justify-start px-2"} items-center`}>
                        <Link to='/monitoring'>
                            {close ? (
                                <CiDesktop size={30} className={`${clickMenu === 'monitoring' ? ' text-white' : 'text-gray-700'}`} />
                            ) : (
                                <div className='flex items-center'>
                                    {/* <CiDesktop size={30} color={'black'} /> */}
                                    <CiDesktop size={30} className={`${clickMenu === 'monitoring' ? ' text-white' : 'text-gray-700'}`} />
                                    <div className='pl-5'>모니터링</div>
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
                <div onClick={() => handleClickMenu('awningstate')}
                    className={`w-full py-3 ${clickMenu === 'awningstate' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                    <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center`}>
                        <Link to='/awningstate'>
                            {close ? (
                                <CiFloppyDisk size={30} color={'#6b7280'} />
                            ) : (
                                <div className='flex items-center'>
                                    <CiFloppyDisk size={30} color={'black'} />
                                    <div className='pl-5'>어닝상태</div>
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
                <div onClick={() => handleClickMenu('eventlist')}
                    className={`w-full ${clickMenu === 'eventlist' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                    <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center my-5`}>
                        <Link to='/eventlist'>
                            {close ? (
                                <CiViewList size={30} color={'#6b7280'} />
                            ) : (
                                <div className='flex items-center'>
                                    <CiViewList size={30} color={'black'} />
                                    <div className='pl-5'>목록</div>
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
                <div onClick={() => handleClickMenu('add')}
                    className={`w-full ${clickMenu === 'add' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                    <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center my-5`} onClick={openModal}>
                        {close ? (
                            <CiSquarePlus size={30} color={'#6b7280'} />
                        ) : (
                            <div className='flex items-center'>
                                <CiSquarePlus size={30} color={'black'} />
                                <div className='pl-5'>추가</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebarcomm;