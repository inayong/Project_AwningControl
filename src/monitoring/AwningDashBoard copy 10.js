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
                <div className='bg-amber-100 w-full h-full'>
                    <div className='flex h-full'>
                        <div className='flex h-full'>
                            <div className='bg-green-300 w-1/3 h-1/2'>
                                <div>가동시간</div>
                            </div>
                            <div className='bg-violet-300 w-2/3 h-2/3'>
                                <div>고장집계</div>
                            </div>
                        <div className='bg-blue-400'>일자별 차양막 가동 대수와 가동시간</div>
                        </div>
                    </div>
                </div>
                <div className='bg-violet-100 w-full h-full'>요약</div>
            </div>
        </div>
    )
}

export default AwningDashBoard;