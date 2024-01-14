import React, { useEffect, useState } from 'react';
import GaugeOptions from '../component/charts/GaugeOptions';
import StackedBar from '../component/charts/StackedBar';
import LineLabels from '../component/charts/LineLabels';
import RadialBar from '../component/charts/RadialBar';
import BarStacked from '../component/charts/BarStacked';
import LineCharts from '../component/charts/LineCharts';



{/* <div className='bg-yellow-200'>일자별 차양막 가동 대수와 가동시간</div> */ }
const AwningDashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState([]);

  useEffect(() => {
    fetch("http://10.125.121.206:8080/user/summary", {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(resp => resp.json())
    .then((data) => {
      setDashBoardData(data);
      console.log("DBdata", data)
    })
    .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <div className='h-screen'>
        <div className='bg-neutral-400 text-gray-800 font-bold text-6xl font-SDSamliphopangcheOutline flex justify-center items-center p-4 h-32'>DashBoard</div>
        <div className='w-full h-full flex p-5'>
          <div className='w-2/3'>
            <div className='h-1/2'>
              <div className='h-full p-5'><BarStacked data={dashBoardData} /></div>
            </div>
            <div className='h-1/2'>
              <div className='h-full p-5'><LineCharts data={dashBoardData} /></div>
            </div>
          </div>
          {/* <div className='bg-blue-200 w-1/3 flex flex-col justify-center items-center'> */}
          <div className=' w-1/3 flex flex-col'>
            <div className='p-5 h-1/2'><RadialBar data={dashBoardData} /></div>
            <div className='p-5 space-y-5 w-1/2 mx-auto h-1/2'>
              <div className="bg-gray-300 h-32 flex justify-between items-center px-5 space-x-2 rounded-xl">
                <div className="text-sm ">총 설치 대수</div>
                <div className="w-24 h-24 border-8 border-white rounded-full flex justify-center items-center">{dashBoardData.총설치댓수}</div>
              </div>
              <div className="bg-gray-300 h-32 flex justify-between items-center px-5 space-x-2 rounded-xl">
                <div className="text-sm ">정상 동작 대수</div>
                <div className="w-24 h-24 border-8 border-white rounded-full flex justify-center items-center">{dashBoardData.정상동작댓수}</div>
              </div>
              <div className="bg-gray-300 h-32 flex justify-between items-center px-5 space-x-2 rounded-xl">
                <div className="text-sm ">차양막 가동 대수</div>
                <div className="w-24 h-24 border-8 border-white rounded-full flex justify-center items-center">{dashBoardData.차양막가동댓수}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AwningDashBoard;