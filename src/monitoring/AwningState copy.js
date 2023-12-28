import React, { useEffect, useState } from 'react';
import { RiSearch2Line, RiFilter3Line, RiCheckboxLine } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import Pagination from 'react-js-pagination';
import "../css/pagination.css";


const TableHead = ({ title, className, rowSpan, colSpan }) => { //대문자로 시작
  return (
    <th scope="col" className={`px-6 py-3 ${className || ''}`} rowSpan={rowSpan || undefined} colSpan={colSpan || undefined}>
      {title}
    </th>
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
        <div className='bg-white w-5/6 '>


          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4" rowSpan="2">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  {/* <th scope="col" className="px-6 py-3" rowSpan="2">
                    상세
                  </th> */}
                  <TableHead title="상세" rowSpan={2} />
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    관리번호
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    통신
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    조명
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    어닝
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    모드
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    배터리
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    관리구역
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    설치장소 메모
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    열림시간(좌/우)
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    풍속 임계값
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    온도
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    풍속
                  </th>
                  <th scope="col" className="px-6 py-3" colSpan="3">
                    고장진단
                  </th>
                  <th scope="col" className="px-6 py-3" rowSpan="2">
                    열림예정시간
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    조명
                  </th>
                  <th scope="col" className="px-6 py-3">
                    모터
                  </th>
                  <th scope="col" className="px-6 py-3">
                    배터리
                  </th>
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
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      상세
                    </th>
                    <td className="px-6 py-4">
                      {items.managementNumber}
                    </td>
                    <td className="px-6 py-4">
                      {items.statusConnected}
                    </td>
                    <td className="px-6 py-4">
                      {items.statusLighting}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{items.statusAwningExpand}</a>
                    </td>
                    <td className="px-6 py-4">
                      {items.statusOperationMode}
                    </td>
                    <td className="px-6 py-4">
                      {items.statusBatteryCharge}
                    </td>
                    <td className="px-6 py-4">
                      {items.managementArea1} {items.managementArea2}
                    </td>
                    <td className="px-6 py-4">
                      {items.installationLocationMemo}
                    </td>
                    <td className="px-6 py-4">
                      {items.awningOpenTimeLeft}/{items.awningOpenTimeRight}
                    </td>
                    <td className="px-6 py-4">
                      {items.windSpeedThreshold}
                    </td>
                    <td className="px-6 py-4">
                      {items.statusTemperature}
                    </td>
                    <td className="px-6 py-4">
                      {items.statusWindSpeed}
                    </td>
                    <td className="px-6 py-4">
                      {items.lightingCondition}
                    </td>
                    <td className="px-6 py-4">
                      {items.awningCondition}
                    </td>
                    <td className="px-6 py-4">
                      {items.batteryCondition}
                    </td>
                    <td className="px-6 py-4">
                      {items.awningOpenScheduleTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <Pagination activePage={page} itemsCountPerPage={perPage} totalItemsCount={getStateData.length} pageRangeDisplayed={3} onChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwningState;