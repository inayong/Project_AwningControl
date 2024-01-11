import React, { useEffect, useState } from 'react';
import GaugeOptions from '../component/charts/GaugeOptions';
import StackedBar from '../component/charts/StackedBar';
import LineLabels from '../component/charts/LineLabels';



{/* <div className='bg-yellow-200'>일자별 차양막 가동 대수와 가동시간</div> */ }
const AwningDashBoard = () => {
    const [dashBoardData, setDashBoardData] = useState([]);

    return (
        <div className='flex flex-col min-h-screen bg-slate-300'>
        <div className='bg-white p-4'>DashBoard</div>
        <div className='flex-grow overflow-auto'>
          {/* 내용이 많을 경우 스크롤을 허용 */}
          <div className='flex'>
            <div className='bg-green-200 w-1/3 overflow-visible'>
                <div className='flex justify-center items-center'><GaugeOptions /></div>
            </div>
            <div className='bg-violet-200 w-2/3 overflow-visible'>
                <div className='flex justify-center items-center'><StackedBar /></div>
            </div>
          </div>
          <div className='bg-blue-200 overflow-visible'>
            <div className='flex justify-center items-center'><LineLabels /></div>
          </div>
        </div>
        <div className='bg-violet-100'>요약</div>
      </div>

    )
}

export default AwningDashBoard;