import React, { useEffect, useState } from 'react';
import { MdOutlineNotificationsActive, MdDisplaySettings } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NotiMapState } from './NotiMapState';
import { SidebarState } from './SidebarState';
import { FaCircle } from "react-icons/fa";
import { DetailBarState } from './DetailBarState';

const Notification = ({ mapData }) => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [markerOpen, setMarkerOpen] = useRecoilState(NotiMapState);
  const [currentMarkerData, setCurrentMarkerData] = useState();
  const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);


  const location = useLocation();
  const isMonitoringPage = location.pathname === '/monitoring';

  const toggleNoti = () => {
    setNotiOpen(!notiOpen);
    if (settingOpen) setSettingOpen(false);
  }

  const toggleSetting = () => {
    setSettingOpen(!settingOpen);
    if (notiOpen) setNotiOpen(false);
  };

  //페이지 이동시 알림창 닫기
  useEffect(() => {
    setNotiOpen(false);
    setSettingOpen(false);
  }, [location])


  useEffect(() => {
    if (markerOpen["isOpen"] === false && markerOpen["isOpen2"] === false) setSettingOpen(false);
    // setMarkerOpen({ isOpen: false, isOpen2: false })
  }, [])

  useEffect(() => {

    if (markerOpen["isOpen"]) {
      setNotiOpen(false);
      setSettingOpen(true);
      setCurrentMarkerData(markerOpen.markerData)  //이게 키포인트.....
    }

  }, [markerOpen])

  console.log("clickmarkerdata", currentMarkerData)
  useEffect(() => {
    if (settingOpen) {
      setMarkerOpen({ isOpen: false, isOpen2: false })
    }

  }, [settingOpen])



  return (
    <div className="flex h-screen overflow-x-hidden whitespace-nowrap">
      {isMonitoringPage && (
        <div className={`absolute right-10 z-10 w-32 h-32 bg-white flex flex-col justify-center items-center ${notiOpen || settingOpen ? 'right-[416px]' : 'right-16'}`}
          style={{ bottom: isDetailBar ? 'calc(18rem + 40px)' : '40px' }}>
          <div className='flex items-center justify-center w-full'>
            <FaCircle size={25} className='fill-emerald-500' />
            <div className='text-lg pl-5'>열림</div>
          </div>
          <div className='flex items-center justify-center w-full py-2'>
            <FaCircle size={25} className='fill-blue-500' />
            <div className='text-lg pl-5'>닫힘</div>
          </div>
          <div className='flex items-center justify-center w-full'>
            <FaCircle size={25} className='fill-red-500' />
            <div className='text-lg pl-5'>끊김</div>
          </div>
        </div>
      )}
      <button onClick={toggleNoti}
        className={`absolute top-0 mt-4 transition-transform ease-in-out ${notiOpen ? 'bg-black' : 'bg-white'} ${notiOpen || settingOpen ? 'right-96' : 'right-4 rounded-full'} p-3`}>
        <MdOutlineNotificationsActive size={30} className='fill-blue-600' />
      </button>
      {isMonitoringPage && markerOpen && (
        <button onClick={toggleSetting}
          className={`absolute top-0 mt-20 transition-transform ease-in-out ${settingOpen ? 'bg-black' : 'bg-white'} ${settingOpen || notiOpen ? 'right-96' : 'right-4 rounded-full'} p-3`}>
          <MdDisplaySettings size={30} className='fill-stone-600' />
        </button>
      )}
      <div className={`fixed inset-y-0 right-0 w-96 h-full bg-white shadow-md z-20 transform transition-transform duration-0 ${notiOpen ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        style={{ height: isDetailBar ? 'calc(100% - 18rem)' : '100%' }}>
        <div className="p-4">
          <div className="text-lg font-semibold">Notification</div>
          <div>알림 내용</div>
        </div>
      </div>
      {isMonitoringPage && (
        <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-md z-20 transform transition-transform duration-0 ${settingOpen ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
          style={{ height: isDetailBar ? 'calc(100% - 18rem)' : '100%' }}>
          <div className="p-4">
            <div className="text-lg font-semibold">Control</div>
            <div>어닝 정보</div>
            <div>
              <div className='flex'>
                <div>통신</div>
                <div>관리번호</div>
                <div>설치장소</div>
                <div>버튼</div>
              </div>
              {mapData.map((item, idx) => (
              <div key={idx}>
                <div>{item.statusConnected}</div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              ))}
              <div className='flex'>
                <div>조명</div>
                <div>어닝</div>
                <div>온도</div>
                <div>풍속</div>
                <div>배터리</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notification;