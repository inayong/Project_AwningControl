import React, { useState } from 'react';
import { MdOutlineNotificationsActive, MdDisplaySettings } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const Notification = () => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  
  
  const location = useLocation();
  const isMonitoringPage = location.pathname === '/monitoring';

  const toggleNoti = () => {
    setNotiOpen(!notiOpen);
    if (settingOpen) setSettingOpen(false);
  }

  const toggleSetting = () => {
    setSettingOpen(!settingOpen);
    if (notiOpen) setNotiOpen(false);
  }



  return (
    <div className="flex h-screen">
      <button onClick={toggleNoti}
        className={`absolute top-0 mt-4 transition-transform  ease-in-out ${notiOpen ? 'bg-black' : 'bg-white' } ${notiOpen || settingOpen ? 'right-64' : 'right-4 rounded-full'} p-3` }>
        <MdOutlineNotificationsActive size={30} className='fill-blue-600' />
      </button>
      {isMonitoringPage && (
        <button onClick={toggleSetting}
          className={`absolute top-0 mt-20 transition-transform duration-300 ease-in-out ${settingOpen ? 'bg-black' : 'bg-white' } ${settingOpen || notiOpen ? 'right-64' : 'right-4 rounded-full'} p-3`}>
          <MdDisplaySettings size={30} className='fill-stone-600' />
        </button>
      )}
      <div className={`absolute top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${notiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Notification</h2>
          <div>알림 내용</div>
        </div>
      </div>
      {isMonitoringPage && (
        <div className={`absolute top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${settingOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Control</h2>
            <div>어닝 정보</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notification;