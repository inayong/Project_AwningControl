import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainMap from './monitoring/MainMap';
import LoginPage from './login/LoginPage';
import Sidebar from './sidebar/Sidebar';
import AddData from './monitoring/AddDataModal';
import { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { SidebarState } from './component/atoms/SidebarState';
import AwningState from './monitoring/AwningState';
import EventList from './monitoring/EventList';
import AddDevice from './monitoring/AddDevice';
import Notification from './sidebar/NotificationBar';
import { NotiMapState } from './component/atoms/NotiMapState';
import AwningDetail from './monitoring/AwningDetail';
import { DetailBarState } from './component/atoms/DetailBarState';
import DetailBar from './sidebar/DetailBar';
import DisplayTest from './sidebar/DisplayTest';
import AwningDashBoard from './monitoring/AwningDashBoard';
import ScrollButton from './component/ScrollButton';
import WebSocket from './component/WebSocket';
import WebSocketConnect from './component/WebSocketConnect';
import UserView from './login/UserView';
// import mapData from './data/mapData.json';

function App() {
  const [isSidebar, setIsSidebar] = useRecoilState(SidebarState);
  const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);
  const [mapData, setMapData] = useState([]);
  const [close, setClose] = useState(true);

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
          console.log("data",data)
          setMapData(data);
          console.log("map", data)
        })
        .catch(err => console.error(err))
    }

    getMapData();

  }, []);

  // const location = useLocation();
  // useEffect(() => {
  //   setIsSidebar(location.pathname !== '/login');
  // }, [location, setIsDetailBar])

  return (
    <div className='flex'>
      <BrowserRouter>
        {isSidebar && (
          <div className={`fixed top-0 left-0 ${close ? 'sm:w-16' : 'sm:w-60'} h-full bg-gray-800`}>
            <Sidebar close={close} setClose={setClose} />
          </div>
        )}
        {/* <div className={`${close ? 'sm:ml-16' : 'sm:ml-60'} w-full`}> */}
        <div className={`${isSidebar ? (close ? 'sm:ml-16' : 'sm:ml-60') : 'sm:ml-0'} w-full`}>
          <div>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              {mapData && <Route path='/monitoring' element={<MainMap mapData={mapData} />} />}
              <Route path='/awningstate' element={<AwningState />} />
              <Route path='/awningstate/detail/:deviceId' element={<AwningDetail />} />
              <Route path='/eventlist' element={<EventList />} />
              <Route path='/adddevice' element={<AddDevice />} />
              <Route path='/dashboard' element={<AwningDashBoard />} />
              <Route path='/test' element={<DisplayTest />} />
              {/* <Route path='/ws' element={<WebSocketConnect />} /> */}
              <Route path='/user' element={<UserView />} />
            </Routes>
          </div>
        </div>
        <div>
          {isSidebar && <Notification mapData={mapData} />}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;