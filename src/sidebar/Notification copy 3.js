import React, { useState } from 'react';
import { MdOutlineNotificationsActive, MdDisplaySettings } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const Notification = () => {
  const [notiOpen, setNotiOpen] = useState(false);

  const location = useLocation();
  const isMonitoringPage = location.pathname === '/monitoring';

  return (
    <div className="flex h-screen">
    <button onClick={() => setNotiOpen(!notiOpen)} className={`fixed top-0 z-30 transform transition mt-4 ${notiOpen ? 'right-64 p-3 bg-white' : 'right-4'}`}>
      <MdOutlineNotificationsActive size={30} className='fill-blue-600'/>
    </button>
    {isMonitoringPage && (
        // <button className="fixed top-0 z-30 mt-4 transform transition right-4 pt-10">
        <button onClick={() => setNotiOpen(!notiOpen)} className={`fixed top-0 z-30 transform transition right-4 mt-20 ${notiOpen ? 'right-64 p-3 bg-white' : 'right-4'}`}>
          {/* 여기에 두 번째 버튼의 아이콘 또는 내용 */}
          <MdDisplaySettings size={30} className='fill-stone-600'/>
        </button>
      )}
    {/* 사이드바 */}
    <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${notiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Notification</h2>
        <div>알림 내용</div>
      </div>
    </div>
  </div>
  )
}

export default Notification;