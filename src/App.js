import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainMap from './monitoring/MainMap';
import LoginPage from './login/LoginPage';
import Sidebar from './sidebar/Sidebar';
import AddData from './monitoring/AddData';
import { useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { SidebarState } from './sidebar/SidebarState';
import AwningState from './monitoring/AwningState';
import EventList from './monitoring/EventList';
import AddDevice from './monitoring/AddDevice';
import Notification from './sidebar/Notification';

function App() {
  const [modal, setModal] = useState(false);
  const [isSidebar, setSidebar] = useRecoilState(SidebarState);


  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  return (
    <div className='flex'>
      {/* <RecoilRoot> */}
      <BrowserRouter>
        <div>
          {isSidebar && <Sidebar openModal={openModal} />}
        </div>
        <div className='w-full'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/monitoring' element={<MainMap />} />
            <Route path='/awningstate' element={<AwningState />} />
            <Route path='/eventlist' element={<EventList />} />
            <Route path='/adddevice' element={<AddDevice />} />
          </Routes>
        </div>
        {modal && <AddData closeModal={closeModal} />}  {/* 상위 컴포넌트에서 실행되어야함 */}
        <div>
          {isSidebar && <Notification />}
        </div>
      </BrowserRouter>
      {/* </RecoilRoot> */}
    </div>
  );
}

export default App;