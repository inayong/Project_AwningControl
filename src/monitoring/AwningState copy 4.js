import React, { useEffect, useRef, useState } from 'react';
import { RiSearch2Line, RiFilter3Line, RiCheckboxLine, RiArrowUpCircleLine, RiArrowDownCircleLine } from "react-icons/ri";
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
  const [isOpen, setIsOpen] = useState(true);
  const [checkbox, setCheckBox] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const searchSel = useRef();
  const searchKeyword = useRef();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  const handlebutton = () => {
    console.log("input")
  }

  useEffect(() => {
    const fetchAwningState = () => {
      fetch("http://10.125.121.206:8080/user/device/view", {
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem("token"),
          // 'SearchTerm': encodeURIComponent(searchKeyword.current.value),
          // 'SearchCriteria': encodeURIComponent(searchSel.current.value)
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

  //checkbox 단일 선택
  const handleSingleCheck = (checked, deviceId) => {
    if (checked) {
      setCheckBox(checkbox => [...checkbox, deviceId]); //불변성을 지키기 위한 원본 배열을 복사 후 추가
      // console.log("single checked", [...checkbox, deviceId]);
    } else {
      setCheckBox(checkbox => checkbox.filter(item => item !== deviceId)) //단일 선택 해제 시 체크된 아이템을 제외한 배열
      // console.log("single", checkbox.filter(item => item !== deviceId));
    }
  };


  //checkbox 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = stateData.map(item => item.deviceId);
      setCheckBox(idArray);
      // console.log("all", idArray)
    } else {
      setCheckBox([]);
      // console.log("all[]")
    }
  };

  //checkbox선택시 삭제 버튼 나타내기
  const checkboxAwningDelete = () => {
    console.log("선택된 항목 삭제:", checkbox);
    setShowModal(true);


  }

  const awningDeleteConfirm = () => {
    //   const fetchAwningDelete = () => {
    //   fetch(`http://10.125.121.206:8080/admin/device/del/${deviceId}`, {
    //     method: "DELETE",
    //     headers: {
    //       'Authorization': localStorage.getItem("token")
    //     }
    //   })
    //   .then((resp) => {
    //     if (resp.ok) {
    //       alert("삭제 완료")

    //     }
    //   })
    // }
  }


  return (
    <div className='bg-slate-200 h-screen'>
      {/* {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-16 rounded-md">
            <p className='text-2xl'>삭제하시겠습니까?</p>
            <div className="flex justify-center mt-4 pt-3">
              <button className="px-3 py-1 bg-red-500 text-white rounded-md">삭제</button>
              <button onClick={() => setShowModal(false)} className="ml-4 px-3 py-1 bg-gray-300 rounded-md">취소</button>
            </div>
          </div>
        </div>
      )} */}
      <div className={`flex justify-center pt-14 ${isOpen ? 'h-[28%]' : 'h-32'} `}>
        <div className='bg-white w-5/6'>
          <div className='flex justify-between'>
            <div className='flex p-3'>
              <div className='flex items-center w-48'>
                <RiSearch2Line size={20} className='m-3 fill-gray-500' />
                <div className='text-lg'>검색</div>
              </div>
              <select ref={searchSel} className='bg-slate-200 w-36 pl-2 rounded-lg'>
                <option value='전체'>전체</option>
                <option value='관리번호'>관리번호</option>
                <option value='설치장소'>설치장소</option>
              </select>
              <div className='flex bg-slate-300 ml-2 items-center rounded-lg'>
                <input type='text' ref={searchKeyword} className='w-72 bg-slate-300' />
                <button onClick={handlebutton} className='absolute ml-[260px]'><RiSearch2Line /></button>
              </div>
            </div>
            <div className='flex pr-3'>
              <button className='flex bg-gray-100 items-center mx-4 my-3 px-2 rounded-lg hover:bg-gray-200'>
                <div className='pr-2'>초기화</div>
                <GrPowerReset />
              </button>
              <button onClick={handleIsOpen}>
                {isOpen ? <RiArrowUpCircleLine size={30} className='fill-neutral-500' /> : <RiArrowDownCircleLine size={30} className='fill-neutral-500' />}
              </button>
            </div>
          </div>
          {isOpen && (
            <div>
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
                {checkbox.length > 0 && (
                  <button onClick={checkboxAwningDelete} className='hover:bg-red-100 border-4 border-red-400 rounded-lg px-2 mr-2'>어닝삭제</button>
                )}
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>조명 on</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>조명 off</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>어닝 on</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>어닝 off</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>자동 모드</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>수동 모드</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>예약하기</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>예약삭제</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center h-1/2 mt-20'>
          <div className=''>d</div>
        <div className='bg-white w-5/6 h-full flex flex-col shadow-md sm:rounded-lg'>
          <div className="flex-grow relative overflow-x-auto hide-scrollbar">
            <table className="min-w-full text-center text-gray-500 whitespace-nowrap">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4" rowSpan="2">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" onChange={(e) => handleAllCheck(e.target.checked)} checked={checkbox.length === stateData.length ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                  <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id={`checkbox-${index}`} type="checkbox" name={`select-${items.deviceId}`} onChange={(e) => handleSingleCheck(e.target.checked, items.deviceId)} checked={checkbox.includes(items.deviceId) ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                        <label htmlFor="checkbox-single" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <TableBody scope="row" content="상세" deviceId={items.deviceId} />
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
                    <TableBody content={items.lightingCondition === 'normal' ? '정상' : '고장'} />
                    <TableBody content={items.awningCondition === 'normal' ? '정상' : '고장'} />
                    <TableBody content={items.batteryCondition === 'normal' ? '정상' : '고장'} />
                    <TableBody content={items.awningOpenScheduleTime === null ? '-' : items.awningOpenScheduleTime} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className='relative bottom-3'>
              <Pagination activePage={page} itemsCountPerPage={perPage} totalItemsCount={getStateData.length} pageRangeDisplayed={3} onChange={handlePageChange} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default AwningState;