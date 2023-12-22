import React, { useState } from 'react';

const Notification = () => {
  const [notiOpen, setNotiOpen] = useState(false);

  const toggleNoti = () => {
    setNotiOpen(!notiOpen);
  }

  return (
    <div className="flex h-screen">
    {/* 햄버거 메뉴 버튼 */}
    <button
      onClick={() => setNotiOpen(!notiOpen)}
      className="fixed top-0 right-0 z-30 m-4"
    >
      <div className="space-y-2">
        {/* 햄버거 메뉴 아이콘 바를 그려줍니다. */}
        <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
        <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
        <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
      </div>
    </button>
    
    {/* 사이드바 */}
    <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${notiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* 사이드바 내용 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        {/* 메뉴 아이템들 */}
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