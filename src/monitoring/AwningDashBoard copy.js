import React, { useEffect, useState } from 'react';
import GaugeOptions from '../component/charts/GaugeOptions';
import StackedBar from '../component/charts/StackedBar';
import LineLabels from '../component/charts/LineLabels';



{/* <div className='bg-yellow-200'>일자별 차양막 가동 대수와 가동시간</div> */ }
const AwningDashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState([]);

  return (
    <div>
      <div className='h-screen bg-slate-300'>
        <div className='bg-white flex justify-center items-center p-4'>DashBoard</div>
        <div className='bg-amber-100 w-full h-full flex p-5'>
          <div className='w-2/3'>
            <div className='bg-green-200 h-1/2'>
              <div className='h-full'><StackedBar /></div>
            </div>
            <div className='bg-violet-200 h-1/2'>
              <div className='h-full'><LineLabels /></div>
            </div>
          </div>
          {/* <div className='bg-blue-200 w-1/3 flex flex-col justify-center items-center'> */}
          <div className='bg-blue-200 w-1/3 flex flex-col'>
            <div className=''><GaugeOptions /></div>
            <div className='p-5 space-y-5 w-1/2 mx-auto'>
              <div className="bg-gray-300 h-32 flex items-center px-5 space-x-2">
                <div className="w-24 h-24 border-2 border-white rounded-full flex justify-center items-center">123</div>
                <div className="text-sm ">총 설치 대수</div>
              </div>
              <div className="bg-gray-300 h-32 flex items-center px-5 space-x-2">
                <div className="w-24 h-24 border-2 border-white rounded-full flex justify-center items-center">123</div>
                <div className="text-sm ">정상 동작 대수</div>
              </div>
              <div className="bg-gray-300 h-32 flex items-center px-5 space-x-2">
                <div className="w-24 h-24 border-2 border-white rounded-full flex justify-center items-center">123</div>
                <div className="text-sm ">차양막 가동 대수</div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='bg-violet-100 w-full h-full p-5'>
          <div>요약</div>
          <div className='flex space-x-10'>
            <div className="bg-gray-300 w-1/5 h-32 flex items-center px-5 space-x-2">
              <div className="w-24 h-24 border-2 border-white rounded-full flex justify-center items-center">123</div>
              <div className="text-sm ">총 설치 대수</div>
            </div>
            <div className="bg-gray-300 w-1/5 h-32 flex items-center px-5 space-x-2">
              <div className="w-24 h-24 border-2 border-white rounded-full flex justify-center items-center">123</div>
              <div className="text-sm ">정상 동작 대수</div>
            </div>
            <div className="bg-gray-300 w-1/5 h-32 flex items-center px-5 space-x-2">
              <div className="w-24 h-24 border-2 border-white rounded-full flex justify-center items-center">123</div>
              <div className="text-sm ">차양막 가동 대수</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>

  )
}

export default AwningDashBoard;