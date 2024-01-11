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
                <div className='bg-amber-100 w-full h-full flex flex-col'>
                    <div className='flex h-2/3'>
                        <div className='bg-green-300 w-1/2 h-1/2'>가동 시간</div>
                        <div className='bg-violet-400 w-1/2 h-2/3'>고장 집계</div>
                    </div>
                    <div className='h-1/3'>
                        <div className='bg-blue-400'>일자별 차양막 가동 대수와 가동시간</div>
                    </div>
                </div>
                <div className='bg-violet-100 w-full h-full'>요약</div>
            </div>
        </div>

    )
}

export default AwningDashBoard;