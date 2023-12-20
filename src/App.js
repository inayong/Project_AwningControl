import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainMap from './monitoring/MainMap';
import LoginPage from './login/LoginPage';
import Sidebar from './sidebar/Sidebar';
import Main from './Main';
import AddData from './sidebar/AddData';
import { useState } from 'react';

function App() {
  const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

  return (
    <div className='flex'>
      <BrowserRouter>
        <div>
          <Sidebar openModal={openModal} />
        </div>
        <div className='w-full'>
          <Routes>
            <Route path='/monitoring' element={<MainMap />}></Route>
            <Route path='/' element={<LoginPage />} ></Route>
          </Routes>
        </div>
        {modal && <AddData closeModal={closeModal} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
