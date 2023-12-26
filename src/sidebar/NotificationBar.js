import React, { useState } from 'react';
import { MdOutlineNotificationsActive, MdDisplaySettings } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { NotiMapState } from './NotiMapState';
import { SidebarState } from './SidebarState';

const Notification = () => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [markerOpen, setMarkerOpen] = useRecoilState(NotiMapState);
  // const [markerOpen, setMarkerOpen] = useRecoilState(SidebarState);
  
  
  const location = useLocation();
  const isMonitoringPage = location.pathname === '/monitoring';

  const toggleNoti = () => {
    setNotiOpen(!notiOpen);
    if (settingOpen) setSettingOpen(false);
  }

  const toggleSetting = () => {
    setSettingOpen(!settingOpen);
    if (notiOpen) setNotiOpen(false);
    setMarkerOpen({isOpen: false});
    console.log("markerOpen",markerOpen)
  };
  



  return (
    <div className="flex h-screen overflow-x-hidden">
      <button onClick={toggleNoti}
        className={`absolute top-0 mt-4 transition-transform ease-in-out ${notiOpen ? 'bg-black' : 'bg-white' } ${notiOpen || settingOpen ? 'right-72' : 'right-4 rounded-full'} p-3` }>
        <MdOutlineNotificationsActive size={30} className='fill-blue-600' />
      </button>
      {isMonitoringPage && markerOpen && (
        <button onClick={toggleSetting}
          className={`absolute top-0 mt-20 transition-transform ease-in-out ${settingOpen ? 'bg-black' : 'bg-white' } ${settingOpen || notiOpen ? 'right-72' : 'right-4 rounded-full'} p-3`}>
          <MdDisplaySettings size={30} className='fill-stone-600' />
        </button>
      )}
      <div className={`fixed inset-y-0 right-0 w-72 h-full bg-white shadow-md z-20 transform transition-transform duration-0 ${notiOpen ? 'translate-x-0 opacity-100' : 'translate-x-72 opacity-0'}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Notification</h2>
          <div>알림 내용</div>
        </div>
      </div>
      {isMonitoringPage && (
        <div className={`fixed inset-y-0 right-0 w-72 h-full bg-white shadow-md z-20 transform transition-transform duration-0 ${settingOpen ? 'translate-x-0 opacity-100' : 'translate-x-72 opacity-0'}`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Control</h2>
            <div>어닝 정보</div>
            <div>정보 내용: {markerOpen.markerData && markerOpen.markerData.installationLocationMemo}</div> {/* 여기에서 마커 데이터 표시 */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notification;