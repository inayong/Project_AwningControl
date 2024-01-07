import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainMap from './monitoring/MainMap';
import LoginPage from './login/LoginPage';
import Sidebar from './sidebar/Sidebar';
import AddData from './monitoring/AddDataModal';
import { useEffect, useState } from 'react';
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
import ScrollButton from './component/ScrollButton';

function App() {
  const [isSidebar, setIsSidebar] = useRecoilState(SidebarState);
  const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const getMapData = () => {
      fetch("http://10.125.121.206:8080/user/map", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setMapData(data);
                console.log("map", data)
            })
            .catch(err => console.error(err))
    }
    
    getMapData();
  }, []);
  


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
              <Route path='/monitoring' element={<MainMap mapData={mapData} />} />
              <Route path='/awningstate' element={<AwningState />} />
              <Route path='/awningstate/detail/:deviceId' element={<AwningDetail />} />
              <Route path='/eventlist' element={<EventList />} />
              <Route path='/adddevice' element={<AddDevice />} />
              <Route path='/dashboard' element={<AwningDashBoard />} />
              <Route path='/test' element={<DisplayTest />} />
            </Routes>
          </div>
        </div>
        <div>
          {isSidebar && <Notification mapData={mapData} />}
          {/* <ScrollButton /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;