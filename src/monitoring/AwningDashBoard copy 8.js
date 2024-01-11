import React, { useEffect, useState } from 'react';
import GaugeOptions from '../component/charts/GaugeOptions';
import StackedBar from '../component/charts/StackedBar';
import LineLabels from '../component/charts/LineLabels';




const AwningDashBoard = () => {
    const [dashBoardData, setDashBoardData] = useState([]);

    return (
        <div className=''>
            <div>DashBoard</div>
            <div className='p-10 space-y-10 flex flex-col'>
                <div className='flex space-x-28'>
                    <div className='w-[20%] border-2'>
                        <GaugeOptions />
                    </div>
                    <div className='w-[50%] border-2'>
                        <StackedBar />
                    </div>
                </div>
                <div>
                    <div className='w-[70%] border-2'>
                        <LineLabels />
                    </div>
                </div>
            </div>
            <div className='p-10'>
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
            </div>
        </div>
    )
}

export default AwningDashBoard;