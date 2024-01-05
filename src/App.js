import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainMap from './monitoring/MainMap';
import LoginPage from './login/LoginPage';
import Sidebar from './sidebar/Sidebar';
import AddData from './monitoring/AddDataModal';
import { useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { SidebarState } from './sidebar/SidebarState';
import AwningState from './monitoring/AwningState';
import EventList from './monitoring/EventList';
import AddDevice from './monitoring/AddDevice';
import Notification from './sidebar/NotificationBar';
import { NotiMapState } from './sidebar/NotiMapState';
import AwningDetail from './monitoring/AwningDetail';
import { DetailBarState } from './sidebar/DetailBarState';
import DetailBar from './sidebar/DetailBar';
import DisplayTest from './sidebar/DisplayTest';
import AwningDashBoard from './monitoring/AwningDashBoard';

function App() {
  const [isSidebar, setIsSidebar] = useRecoilState(SidebarState);
  const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);

  // const mainContentMarginLeft = sidebarOpen ? 'ml-[사이드바 열린 너비]' : 'ml-0';


  return (
    <div className='flex'>
      <BrowserRouter>
        <div className=''>
          {isSidebar && <Sidebar />}
        </div>
        <div className='w-full'>
          <div>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/monitoring' element={<MainMap />} />
              <Route path='/awningstate' element={<AwningState />} />
              <Route path='/awningstate/detail/:deviceId' element={<AwningDetail />} />
              <Route path='/eventlist' element={<EventList />} />
              <Route path='/adddevice' element={<AddDevice />} />
              <Route path='/dashboard' element={<AwningDashBoard />} />
              <Route path='/test' element={<DisplayTest />} />
            </Routes>
          </div>
          {/* {isDetailBar && (
            // <div className={`absolute bottom-0 ${isSidebar ? 'left-60' : 'left-16'} right-0 h-1/4`}>
            <div className='absolute bottom-0 h-1/4'>
              <DetailBar />
            </div>
          )} */}
        </div>
        <div>
          {isSidebar && <Notification />}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;