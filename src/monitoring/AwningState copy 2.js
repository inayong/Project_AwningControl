import React, { useEffect, useState } from 'react';
import { RiSearch2Line, RiFilter3Line, RiCheckboxLine } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import Pagination from 'react-js-pagination';
import "../css/pagination.css";
import "../css/statetable.css";
import { Link } from 'react-router-dom';


const TableHead = ({ title, className, rowSpan, colSpan }) => {
  return (
    <th scope="col" className={`px-6 py-2 ${className || ''}`} rowSpan={rowSpan || undefined} colSpan={colSpan || undefined}>
      {title}
    </th>
  )
};

const TableBody = ({ content, className, scope, deviceId }) => {
  return (
    <td className={`px-6 py-2 ${className || ''}`} scope={scope || undefined} >
      {content === "상세" ? (
      <Link to={`detail/${deviceId}`}>
        <button className='border p-1 rounded-full text-xs text-black shadow-sm'>상세</button>
        </Link>  
    ) : (
      content
    )
    }
    </td>
  )
};


const AwningState = () => {
  const [getStateData, setGetStateData] = useState([]); //데이터
  const [stateData, setStateData] = useState([]); //페이징 데이터


  const handlebutton = () => {
    console.log("input")
  }

  useEffect(() => {
    const fetchAwningState = () => {
      fetch("http://10.125.121.206:8080/user/device/view", {
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(resp => resp.json())
        .then(data => {
          setGetStateData(data)
          console.log("statedata", data)
        })
        .catch(err => console.error(err))
    }
    fetchAwningState();
  }, [])

  //페이징
  const [page, setPage] = useState(1);
  const perPage = 7;
  const lastPage = page * perPage
  const firstPage = lastPage - perPage

  useEffect(() => {
    setStateData(getStateData.slice(firstPage, lastPage))
  }, [getStateData, page])

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    console.log("pageNum", pageNum)
  }


  return (
    <div className='bg-slate-200 h-screen'>
      <div className='flex justify-center h-[28%] pt-14'>
        <div className='bg-white w-5/6'>
          <div className='flex justify-between'>
            <div className='flex p-3'>
              <div className='flex items-center w-48'>
                <RiSearch2Line size={20} className='m-3 fill-gray-500' />
                <div className='text-lg'>검색</div>
              </div>
              <select className='bg-slate-200 w-36 pl-2 rounded-lg'>
                <option value=''>전체</option>
              </select>
              <div className='flex bg-slate-300 ml-2 items-center rounded-lg'>
                <input type='text' className='w-72 bg-slate-300' />
                <button onClick={handlebutton} className='absolute ml-[260px]'><RiSearch2Line /></button>
              </div>
            </div>
            <div className='flex'>
              <button className='flex bg-gray-100 items-center mx-4 my-3 px-2 rounded-lg hover:bg-gray-200'>
                <div className='pr-2'>초기화</div>
                <GrPowerReset />
              </button>
            </div>
          </div>
          <div className='flex p-3'>
            <div className='flex items-center w-48'>
              <RiFilter3Line size={20} className='m-3 fill-gray-500' />
              <div className='text-lg'>필터</div>
            </div>
            <select className='w-36 pl-2 rounded-lg'>
              <option value=''>전체</option>
            </select>
          </div>
          <div className='flex p-3'>
            <div className='flex items-center w-48'>
              <RiCheckboxLine size={20} className='m-3 fill-gray-500' />
              <div className='text-lg'>장치 관리</div>
            </div>
            <button className='hover:bg-gray-200 border rounded-lg px-2'>어닝 열림</button>
          </div>
        </div>
      </div>
      <div className='flex justify-center h-1/2 mt-20'>
        <div className='bg-white w-5/6'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full hide-scrollbar">
            <table className="text-center text-gray-500 whitespace-nowrap">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4" rowSpan="2">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <TableHead title="상세" rowSpan={2} />
                  <TableHead title="관리번호" rowSpan={2} />
                  <TableHead title="통신" rowSpan={2} />
                  <TableHead title="조명" rowSpan={2} />
                  <TableHead title="어닝" rowSpan={2} />
                  <TableHead title="모드" rowSpan={2} />
                  <TableHead title="배터리" rowSpan={2} />
                  <TableHead title="관리구역" rowSpan={2} />
                  <TableHead title="설치장소 메모" rowSpan={2} />
                  <TableHead title="열림시간(좌/우)" rowSpan={2} />
                  <TableHead title="풍속임계값" rowSpan={2} />
                  <TableHead title="온도" rowSpan={2} />
                  <TableHead title="풍속" rowSpan={2} />
                  <TableHead title="고장진단" colSpan={3} />
                  <TableHead title="열림예정시간" rowSpan={2} />
                </tr>
                <tr>
                  <TableHead title="조명" />
                  <TableHead title="모터" />
                  <TableHead title="배터리" />
                </tr>
              </thead>
              <tbody>
                {stateData.map((items, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <TableBody scope="row" content="상세" deviceId={items.deviceId}/>
                    <TableBody content={items.managementNumber} />
                    <TableBody content={items.statusConnected} />
                    <TableBody content={items.statusLighting} />
                    <TableBody content={items.statusAwningExpand} />
                    <TableBody content={items.statusOperationMode} />
                    <TableBody content={items.statusBatteryCharge} />
                    <TableBody content={`${items.managementArea1} ${items.managementArea2}`} />
                    <TableBody content={items.installationLocationMemo} />
                    <TableBody content={`${items.awningOpenTimeLeft}/${items.awningOpenTimeRight}`} />
                    <TableBody content={items.windSpeedThreshold} />
                    <TableBody content={items.statusTemperature} />
                    <TableBody content={items.statusWindSpeed} />
                    <TableBody content={items.lightingCondition == 'normal' ? '정상' : '고장'} />
                    <TableBody content={items.awningCondition == 'normal' ? '정상' : '고장'} />
                    <TableBody content={items.batteryCondition == 'normal' ? '정상' : '고장'} />
                    <TableBody content={items.awningOpenScheduleTime == null ? '-' : items.awningOpenScheduleTime} />
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='absolute bottom-3 w-full'>
              <Pagination activePage={page} itemsCountPerPage={perPage} totalItemsCount={getStateData.length} pageRangeDisplayed={3} onChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwningState;