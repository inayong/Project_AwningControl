import React, { useState } from 'react';
import { MdOutlineNotificationsActive } from "react-icons/md";

const Notification = () => {
  const [notiOpen, setNotiOpen] = useState(false);


  return (
    <div className="flex h-screen">
    <button onClick={() => setNotiOpen(!notiOpen)} className="fixed top-0 right-0 z-30 m-4">
      <MdOutlineNotificationsActive size={30} className='fill-blue-600'/>
    </button>
    {/* 사이드바 */}
    <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${notiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Notification</h2>
        <div>알림 내용</div>
      </div>
    </div>
    
    {/* 페이지 나머지 내용 */}
    <main className="flex-grow">
      {/* 페이지 내용 */}
    </main>
  </div>
  )
}

export default Notification;