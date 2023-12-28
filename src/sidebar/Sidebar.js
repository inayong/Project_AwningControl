import React, { useEffect, useState } from 'react';
import { CiViewList, CiLogout, CiIndent, CiDesktop, CiFloppyDisk, CiSquarePlus } from "react-icons/ci";
import AddData from '../monitoring/AddDataModal';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SideMenu from '../component/SideMenu';
import { useRecoilState } from 'recoil';
import { LogAtom } from '../login/LogAtom';
import { handleLogout } from '../login/Logout';

const Sidebarcomm = ({ openModal }) => {
    const [close, setClose] = useState(true);
    const [clickMenu, setClickMenu] = useState();
    const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogAtom(localStorage.getItem("loginId"))
    }, [isLogAtom])

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("loginId");
            localStorage.removeItem("token");
            setIsLogAtom(false);
            alert("로그아웃 완료");
            navigate("/login");
        }
    };



    //추가하거나 닫기하면 선택된거 초기화하기
    return (
        <div>
            <div className={`${close ? "sm:w-16" : "sm:w-60"} bg-white h-screen`}>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center py-5`}>
                    {close ? null : <div className='pr-9'>어닝 제어 시스템</div>}
                    <CiIndent onClick={() => setClose(!close)} size={30} className='cursor-pointer' />
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center py-5`}>
                    {isLogAtom && close ? null : <div className='pr-16'>{isLogAtom}</div>}
                    <CiLogout size={30} color={`${close ? '#6b7280' : 'black'}`} onClick={handleLogout} className='cursor-pointer' />
                </div>
                <SideMenu
                    menuName="monitoring"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiDesktop}
                    label="모니터링"
                />
                <SideMenu
                    menuName="awningstate"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiFloppyDisk}
                    label="어닝상태"
                />
                <SideMenu
                    menuName="eventlist"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiViewList}
                    label="목록"
                />
                <SideMenu
                    menuName="adddevice"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiSquarePlus}
                    label="추가"
                />
                {/* <SideMenu 
                    menuName="add"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiSquarePlus}
                    label="추가"
                    onModal={() => openModal()}
                    isLink={false} 
                /> */}
            </div>
        </div>
    )
}

export default Sidebarcomm;