import React, { useEffect, useState } from 'react';
import { CiViewList, CiLogout, CiIndent, CiDesktop, CiFloppyDisk, CiSquarePlus, CiViewBoard, CiUser } from "react-icons/ci";
import AddData from '../monitoring/AddDataModal';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import SideMenu from '../component/SideMenu';
import { useRecoilState } from 'recoil';
import { LogAtom } from '../component/atoms/LogAtom';
import { handleLogout } from '../login/Logout';

const Sidebarcomm = ({ close, setClose }) => {
    // const [close, setClose] = useState(true);
    const [clickMenu, setClickMenu] = useState();
    const [clickSubMenu, setClickSubMenu] = useState(false);
    const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setClickMenu(path);
    }, [location])

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
        <div className=''>
            <div className='bg-neutral-100 h-screen'>
            {/* <div className={`fixed top-0 left-0 h-screen ${close ? "w-16" : "w-60"} bg-white`}> */}
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center py-5`}>
                    {close ? null : <div className='pr-9 font-GmarketSansMedium'>어닝 제어 시스템</div>}
                    <CiIndent onClick={() => setClose(!close)} size={30} className='cursor-pointer' />
                </div>
                <div className={`flex ${close ? "justify-center" : "justify-end pr-2"} items-center py-5`}>
                    {isLogAtom && close ? null : <div className='pr-16 font-NanumBarunpen text-xl'>{isLogAtom}</div>}
                    <CiLogout size={30} color={`${close ? '#6b7280' : 'black'}`} onClick={handleLogout} className='cursor-pointer' />
                </div>
                <SideMenu
                    menuName="monitoring"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiDesktop}
                    label="모니터링"
                    clickSubMenu={clickSubMenu}
                    setClickSubMenu={setClickSubMenu}
                />
                <SideMenu
                    menuName="awningstate"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiFloppyDisk}
                    label="어닝상태"
                    clickSubMenu={clickSubMenu}
                    setClickSubMenu={setClickSubMenu}
                />
                <SideMenu
                    menuName="eventlist"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiViewList}
                    label="목록"
                    clickSubMenu={clickSubMenu}
                    setClickSubMenu={setClickSubMenu}
                />
                <SideMenu
                    menuName="adddevice"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiSquarePlus}
                    label="추가"
                    clickSubMenu={clickSubMenu}
                    setClickSubMenu={setClickSubMenu}
                />
                <SideMenu
                    menuName="dashboard"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiViewBoard}
                    label="대시보드"
                    clickSubMenu={clickSubMenu}
                    setClickSubMenu={setClickSubMenu}
                />
                <SideMenu
                    menuName="user"
                    clickMenu={clickMenu}
                    setClickMenu={setClickMenu}
                    close={close}
                    icon={CiUser}
                    label="사용자"
                    clickSubMenu={clickSubMenu}
                    setClickSubMenu={setClickSubMenu}
                />
            </div>
        </div>
    )
}

export default Sidebarcomm;