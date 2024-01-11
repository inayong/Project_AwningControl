import React, { useEffect, useState } from 'react';
import GaugeOptions from '../component/charts/GaugeOptions';
import StackedBar from '../component/charts/StackedBar';
import LineLabels from '../component/charts/LineLabels';



{/* <div className='bg-yellow-200'>일자별 차양막 가동 대수와 가동시간</div> */}
const AwningDashBoard = () => {
    const [dashBoardData, setDashBoardData] = useState([]);

    return (
        // <div className='flex flex-col w-full h-screen bg-slate-300'>
        //     <div className='text-3xl flex justify-center items-center'>DashBoard</div>
        //     <div className='flex h-full bg-red-100'>
        //         <div className='bg-green-300 w-1/2 h-1/2'>가동 시간</div>
        //         <div className='bg-violet-400 w-1/2 h-2/3'>고장 집계</div>
        //     </div>
        // </div>
        <div className='flex flex-col w-full h-screen bg-slate-300'>
            <div className='text-3xl flex justify-center items-center p-4'>DashBoard</div>
            <div className='flex h-full'>
                <div className='bg-green-300 w-1/2 h-2/3'>가동 시간</div>
                <div className='bg-violet-400 w-1/2 h-full'>고장 집계</div>
            </div>
            <div className='bg-yellow-300 w-full h-1/2'>노란색 영역</div>
            <div>요약</div>
        </div>
    )
}

export default AwningDashBoard;