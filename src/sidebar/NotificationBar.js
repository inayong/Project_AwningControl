import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineNotificationsActive, MdDisplaySettings, MdMoreVert, MdExpandLess } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NotiMapState } from '../component/atoms/NotiMapState';
import { SidebarState } from '../component/atoms/SidebarState';
import { FaCircle, FaRegObjectUngroup } from "react-icons/fa";
import { DetailBarState } from '../component/atoms/DetailBarState';
import { DetailMapDataState } from '../component/atoms/DetailMapDataState ';
import { FilterMarkerState } from '../component/atoms/FilterMarkerState';
import WebSocket from '../component/WebSocket';
import WebSocketConnect from '../component/WebSocketConnect';



const Notification = ({ mapData }) => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(true);
  const [markerOpen, setMarkerOpen] = useRecoilState(NotiMapState);
  const [currentMarkerData, setCurrentMarkerData] = useState();
  const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);
  // const [topButton, setTopButton] = useState(false);
  const [detailMapData, setDetailMapData] = useRecoilState(DetailMapDataState);
  // const [listDetailBtn, setListDetailBtn] = useState(false);
  // const [markerFilterStatus, setMarkerFilterStatus] = useState('all');
  const [markerFilterStatus, setMarkerFilterStatus] = useRecoilState(FilterMarkerState);


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
    if (location.pathname === '/monitoring') {
      setSettingOpen(true);
    } else {
      setSettingOpen(false);
    }
    // setSettingOpen(true);
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

  // console.log("clickmarkerdata", currentMarkerData)
  // console.log("setNotiOpen", notiOpen)
  // console.log("isDetailBar", isDetailBar)

  useEffect(() => {
    if (settingOpen) {
      setMarkerOpen({ isOpen: false, isOpen2: false })
    }

  }, [settingOpen])



  useEffect(() => {
    if (currentMarkerData) {
      const element = document.getElementById(`marker-${currentMarkerData.awningId}`);
      element && element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentMarkerData]);

  const listClick = (item) => {
    // alert("click")
    setCurrentMarkerData(item);
    setDetailMapData(item);
    setIsDetailBar(true);
    // console.log("list-item", item)

  }

  //페이지 이동시 setIsDetailBar(false);
  useEffect(() => {
    // console.log("isDetailBar",isDetailBar); // 상태가 변경될 때마다 로그
    setIsDetailBar(false);
  }, [location]);

  // console.log("detailMapData.awningId", detailMapData.awningId)
  // console.log("mapdata", mapData.map(item => item.awningId))

  const navigate = useNavigate();
  const clickListToDetail = (deviceId) => {
    navigate(`/awningstate/detail/${deviceId}`)
  }

  const markerFilterClick = (status) => {
    if (markerFilterStatus === status) {
      setMarkerFilterStatus('all');
    } else {
      setMarkerFilterStatus(status);
    }
  }

  
  const batteryChargeColor = (charge) => {
    if (charge <= 20) {
      return 'text-red-500';
    } else if (charge < 60) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  }

  return (
    <div className="flex h-screen overflow-x-hidden whitespace-nowrap">
      {isMonitoringPage && (
        <div className={`absolute right-10 z-10 w-24 h-24 bg-white rounded-lg flex flex-col justify-center items-center ${notiOpen || settingOpen ? 'right-[416px]' : 'right-16'}`}
          style={{ bottom: isDetailBar ? 'calc(18rem + 40px)' : '40px' }}>
          <div onClick={() => markerFilterClick('normal')} className='flex items-center justify-center w-full cursor-pointer'>
            <FaCircle size={15} className='fill-emerald-500' />
            <div className='text-sm pl-5 font-Orbit'>정상</div>
          </div>
          <div onClick={() => markerFilterClick('failure')} className='flex items-center justify-center w-full py-2 cursor-pointer'>
            <FaCircle size={15} className='fill-yellow-400' />
            <div className='text-sm pl-5 font-Orbit'>고장</div>
          </div>
          <div onClick={() => markerFilterClick('disconnect')} className='flex items-center justify-center w-full cursor-pointer'>
            <FaCircle size={15} className='fill-red-500' />
            <div className='text-sm pl-5 font-Orbit'>끊김</div>
          </div>
        </div>
      )}
      <button onClick={toggleNoti}
        className={`fixed top-0 mt-4 transition-transform ease-in-out bg-white ${notiOpen || settingOpen ? 'right-96' : 'right-4 rounded-full bg-neutral-100'} p-3`}>
        <MdOutlineNotificationsActive size={30} className={`${notiOpen ? 'fill-blue-600' : 'fill-stone-600'}`} />
      </button>
      {isMonitoringPage && markerOpen && (
        <button onClick={toggleSetting}
          className={`absolute top-0 mt-20 transition-transform ease-in-out bg-white ${settingOpen || notiOpen ? 'right-96' : 'right-4 rounded-full bg-neutral-100'} p-3`}>
          <MdDisplaySettings size={30} className={`${settingOpen ? 'fill-blue-600' : 'fill-stone-600'}`} />
        </button>
      )}
      <div className={`overflow-auto fixed inset-y-0 right-0 w-96 h-full bg-neutral-100 shadow-md z-20 transform transition-transform duration-0 ${notiOpen ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        style={{ height: isDetailBar ? 'calc(100% - 18rem)' : '100%' }}>
        <div className="p-10">
          <div className="text-2xl font-semibold p-5 font-NanumSquareNeoVariable flex justify-center items-cente">Notification</div>
          <WebSocketConnect />
        </div>
      </div>
      {isMonitoringPage && (
        <div className={`overflow-auto fixed inset-y-0 right-0 w-96 bg-neutral-100 shadow-md z-20 transform transition-transform duration-0 ${settingOpen ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
          style={{ height: isDetailBar ? 'calc(100% - 18rem)' : '100%' }}>
          <div className="p-4">
            <div className="text-2xl font-semibold p-5 font-Orbit flex justify-center items-center">어닝 목록</div>
            <div className="space-y-4">
              {mapData.map((item, idx) => (
                <div key={idx} onClick={() => listClick(item)} id={`marker-${item.awningId}`} className={`bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 ${detailMapData && detailMapData.awningId === item.awningId ? 'border-2 border-blue-400' : ''}`}>
                  <div className="flex items-center justify-between p-4 border-b">
                    <span className={`px-3 py-1 text-white text-base font-bold font-Orbit rounded-full ${item.statusConnected === 'off' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {item.statusConnected.toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0 group">
                      <span className="block text-center font-bold font-GmarketSansMedium">{item.managementNumber}</span>
                      <div className="relative text-center">
                        <span className="truncate block text-sm font-Orbit">{item.installationLocationMemo}</span>
                        {item.installationLocationMemo.length > 20 && (
                          <span className="absolute z-10 left-0 bg-gray-600 text-white text-xs p-2 rounded hidden group-hover:block whitespace-pre-wrap">
                            {item.installationLocationMemo}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => clickListToDetail(item.deviceId)} className="group relative text-lg">
                      <MdMoreVert className='hover:fill-blue-500' />
                      <span className="absolute z-10 top-1/2 left-full transform -translate-x-full -translate-y-1/2 bg-gray-600 text-white text-xs p-2 rounded hidden group-hover:block">
                        상세페이지 이동
                      </span>
                    </button>
                  </div>
                  <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center space-y-2">
                      <div className="text-sm font-semibold font-NanumSquareNeoVariable text-gray-800">어닝</div>
                      <div className={`${item.statusAwningExpand === 'off' ? 'text-red-500' : 'text-green-500'} font-neurimboGothicRegular font-bold`}>
                        {item.statusAwningExpand.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-sm font-semibold font-NanumSquareNeoVariable text-gray-800">조명</div>
                      <div className={`${item.statusLighting === 'off' ? 'text-red-500' : 'text-green-500'} font-neurimboGothicRegular font-bold`}>
                        {item.statusLighting.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="text-sm font-semibold font-NanumSquareNeoVariable text-gray-800">온도</div>
                      <div className="font-bold text-sm font-NanumSquareNeoVariable">{item.statusTemperature}</div>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="text-sm font-semibold font-NanumSquareNeoVariable text-gray-800">풍속</div>
                      <div className="font-bold text-sm font-NanumSquareNeoVariable">{item.statusWindSpeed}</div>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="text-sm font-semibold font-NanumSquareNeoVariable text-gray-800">배터리</div>
                      <div className={`font-bold text-sm font-NanumSquareNeoVariable ${batteryChargeColor(item.statusBatteryCharge)}`}>{item.statusBatteryCharge}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div >
  )
}

export default Notification;