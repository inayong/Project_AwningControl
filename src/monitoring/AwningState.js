import React, { useEffect, useRef, useState } from 'react';
import { RiSearch2Line, RiFilter3Line, RiCheckboxLine, RiArrowUpCircleLine, RiArrowDownCircleLine } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import Pagination from 'react-js-pagination';
import "../css/pagination.css";
import "../css/statetable.css";
import { Link } from 'react-router-dom';
import { SigunguData } from '../data/SigunguData';


const TableHead = ({ title, className, rowSpan, colSpan }) => {
  return (
    <th scope="col" className={`px-6 py-2 ${className || ''}`} rowSpan={rowSpan || undefined} colSpan={colSpan || undefined}>
      {title}
    </th>
  )
};

const TableBody = ({ content, className, scope, deviceId }) => {
  let statusColor = 'text-gray-500';
  if (['정상', '연결', '켜짐', '열림'].includes(content)) {
    statusColor = 'text-green-500';
  } else if (['고장', '끊김', '꺼짐', '닫힘'].includes(content)) {
    statusColor = 'text-red-500';
  }

  return (
    <td className={`px-6 py-2 ${className || ''} ${statusColor}`} scope={scope || undefined} >
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

// const filterContent = ({}) => {
//   return (
//     filterSel === 'statusConnected' && (
//       <select ref={filterOption} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
//         <option value='full'>전체</option>
//         <option value='on'>연결</option>
//         <option value='off'>끊김</option>
//       </select>
//       )
//   )
// };


const AwningState = () => {
  const [getStateData, setGetStateData] = useState([]); //데이터
  const [stateData, setStateData] = useState([]); //페이징 데이터
  const [isOpen, setIsOpen] = useState(true);
  const [checkbox, setCheckBox] = useState({});
  const [checkboxCount, setCheckboxCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [batteryCondition, setBatteryCondition] = useState('');
  const [motorCondition, setMotorCondition] = useState('');
  const [lightingCondition, setLightingCondition] = useState('');
  const [managementArea2, setManagementArea2] = useState('');
  const [managementArea1, setManagementArea1] = useState('');
  const [statusAwningExpand, setStatusAwningExpand] = useState('');
  const [statusLighting, setStatusLighting] = useState('');
  const [statusConnected, setStatusConnected] = useState('');
  const [filterSel, setFilterSel] = useState('');
  const [showControlModal, setShowControlModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const { sigungu, si } = SigunguData();
  const [gu, setGu] = useState([]);

  const searchSel = useRef();
  const searchKeyword = useRef();
  // const filterSel = useRef();
  // const filterOption = useRef();
  const filterConn = useRef();
  const filterLight = useRef();
  const filterAwining = useRef();
  const filterArea1 = useRef();
  const filterArea2 = useRef();
  const filterLightCond = useRef();
  const filterMotor = useRef();
  const filterBattery = useRef();




  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  const filterResetButton = () => {
    searchSel.current.value = 'full';
    searchKeyword.current.value = '';

    setSearchTerm('');
    setSearchCriteria('');
    setFilterSel('');
    setStatusConnected('');
    setStatusLighting('');
    setStatusAwningExpand('');
    setManagementArea1('');
    setManagementArea2('');
    setLightingCondition('');
    setMotorCondition('');
    setBatteryCondition('');

  }


  const fetchAwningState = () => {
    let url = `http://10.125.121.206:8080/user/device/view?searchTerm=${searchTerm}&searchCriteria=${searchCriteria}&batteryCondition=${batteryCondition}`;
    url = url + `&motorCondition=${motorCondition}&lightingCondition=${lightingCondition}&managementArea2=${managementArea2}&managementArea1=${managementArea1}`;
    url = url + `&statusAwningExpand=${statusAwningExpand}&statusLighting=${statusLighting}&statusConnected=${statusConnected}`;
    console.log("url", url)
    fetch(url, {
      method: "GET",
      headers: {
        'Authorization': localStorage.getItem("token"),
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setGetStateData(data);
        const checkedState = data.reduce((acc, item) => {
          acc[item.deviceId] = false;
          return acc;
        }, {});
        setCheckBox(checkedState);
        console.log("statedata", data)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchAwningState();
  }, [searchTerm, searchCriteria, batteryCondition, motorCondition, lightingCondition, managementArea2, managementArea1, statusAwningExpand, statusLighting, statusConnected])



  const handleSearchbutton = () => {
    // console.log("input")
    setSearchTerm(searchKeyword.current.value);
    setSearchCriteria(searchSel.current.value);
    // fetchAwningState();
  }
  const searchKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchbutton();
  }

  const filterSelChange = (e) => {
    setFilterSel(e.target.value)
    setStatusConnected('');
    setStatusLighting('');
    setStatusAwningExpand('');
    setManagementArea1('');
    setManagementArea2('');
    setLightingCondition('');
    setMotorCondition('');
    setBatteryCondition('');
  }

  const filterOptionChange = (e) => {
    if (filterConn.current) {
      setStatusConnected(filterConn.current.value);
    }
    if (filterLight.current) {
      setStatusLighting(filterLight.current.value);
    }
    if (filterAwining.current) {
      setStatusAwningExpand(filterAwining.current.value);
    }
    if (filterArea1.current) {
      setManagementArea1(filterArea1.current.value);
    }
    if (filterArea2.current) {
      setManagementArea2(filterArea2.current.value);
    }
    if (filterLightCond.current) {
      setLightingCondition(filterLightCond.current.value);
    }
    if (filterMotor.current) {
      setMotorCondition(filterMotor.current.value);
    }
    if (filterBattery.current) {
      setBatteryCondition(filterBattery.current.value);
    }

    if (e.target.name === 'siSelect') {
      const selectGu = sigungu
        .filter((items) => items.address.split(" ")[0] === filterArea1.current.value)
        .map((item) => item.address.split(" ")[1]);

      const selGu = [...new Set(selectGu)];
      setGu(selGu);
      setManagementArea1(filterArea1.current.value);
      setManagementArea2('');
    } else if (e.target.name === 'guSelect') {
      setManagementArea2(filterArea2.current.value);
    }


  }

  //시군구 셀렉트



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
    // setCheckBox([]);
  }

  //checkbox 단일 선택
  const handleSingleCheck = (checked, deviceId) => {

    setCheckBox(prev => ({ ...prev, [deviceId]: checked }));
    // console.log("single", deviceId)
  };


  //checkbox 전체 선택
  const handleAllCheck = (checked) => {

    const newChecked = { ...checkbox };
    stateData.forEach(items => {
      newChecked[items.deviceId] = checked;
    });
    setCheckBox(newChecked);
    // console.log("all", checked)
  };

  //체크박스 개수
  useEffect(() => {
    const count = Object.values(checkbox).filter(checked => checked).length;
    setCheckboxCount(count);

  }, [checkbox])

  const checkboxResetButton = () => {
    setCheckBox({});
    setCheckboxCount(0);
  }

  //checkbox선택시 삭제 버튼 나타내기
  const checkboxAwningDelete = () => {
    // console.log("선택된 항목 삭제:", checkbox);
    setShowModal(true);

  }

  // const awningDeleteConfirm = () => {
  const fetchAwningDelete = () => {
    const deviceIds = Object.entries(checkbox)
      .filter(([_, isChecked]) => isChecked)
      .map(([deviceId]) => deviceId);
    console.log("deviceIds", deviceIds)

    fetch("http://10.125.121.206:8080/admin/device/del", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(deviceIds)
    })
      .then((resp) => {
        if (resp.ok) {
          alert("삭제 완료")
          setShowModal(false)
          window.location.reload();
        } else {
          alert("삭제 실패")
        }
      })
      .catch((err) => console.error("어닝 삭제 오류:", err))
  }
  // }

  const handleDeviceControl = (action) => {
    const checkedItems = getStateData.filter(item => checkbox[item.deviceId]);
    const checkedNumbers = checkedItems.map(item => item.managementNumber).join(', ');
    // const message = `'${action}' 작동을 보냈습니다. 관리번호: ${checkedNumbers}`;
    const message = (
      <div className='flex flex-col items-center'>
      <div className="text-center">{`${action} 작동을 보냈습니다.`}</div>
      <div className="text-center">관리번호: {checkedNumbers}</div>
    </div>
    )

    setShowControlModal(true);
    setModalContent(message);
  };


  return (
    <div className='bg-slate-200 h-screen'>
      <div className={`flex justify-center pt-14 ${isOpen ? 'h-[28%]' : 'h-32'} `}>
        <div className='bg-white w-5/6 rounded-lg shadow-md'>
          <div className='flex justify-between'>
            <div className='flex p-3'>
              <div className='flex items-center w-48'>
                <RiSearch2Line size={20} className='m-3 fill-gray-500' />
                <div className='text-lg'>검색</div>
              </div>
              <select ref={searchSel} className='bg-slate-200 w-36 pl-2 rounded-lg'>
                <option value='full'>전체</option>
                <option value='managementNumber'>관리번호</option>
                <option value='installationLocationMemo'>설치장소</option>
              </select>
              <div className='flex bg-slate-300 ml-2 items-center rounded-lg'>
                <input type='text' ref={searchKeyword} onKeyDown={searchKeyDown} className='w-72 bg-slate-300' />
                <button onClick={handleSearchbutton} className='absolute ml-[260px]'><RiSearch2Line /></button>
              </div>
            </div>
            <div className='flex pr-3'>
              <button onClick={filterResetButton} className='flex bg-gray-100 items-center mx-4 my-3 px-2 rounded-lg hover:bg-gray-200'>
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
                <select value={filterSel} onChange={filterSelChange} className='w-36 pl-2 rounded-lg'>
                  <option value='full'>전체</option>
                  <option value='statusConnected'>통신상태</option>
                  <option value='statusLighting'>조명</option>
                  <option value='statusAwningExpand'>어닝</option>
                  <option value='managementArea'>관리구역</option>
                  <option value='lightingCondition'>조명상태</option>
                  <option value='motorCondition'>모터상태</option>
                  <option value='batteryCondition'>배터리상태</option>
                </select>
                {filterSel === 'statusConnected' && (
                  <select ref={filterConn} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    <option value='on'>연결</option>
                    <option value='off'>끊김</option>
                  </select>
                )}
                {filterSel === 'statusLighting' && (
                  <select ref={filterLight} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    <option value='on'>켜짐</option>
                    <option value='off'>꺼짐</option>
                  </select>
                )}
                {filterSel === 'statusAwningExpand' && (
                  <select ref={filterAwining} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    <option value='on'>열림</option>
                    <option value='off'>닫힘</option>
                  </select>
                )}
                {filterSel === 'managementArea' && (
                  <select name='siSelect' ref={filterArea1} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    {si.map((items) => (
                      <option key={items} value={items}>{items}</option>
                    ))}
                  </select>
                )}
                {managementArea1 && (
                  <select name='guSelect' ref={filterArea2} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    {gu.map((items) => (
                      <option key={items} value={items}>{items}</option>
                    ))}
                  </select>
                )}
                {filterSel === 'lightingCondition' && (
                  <select ref={filterLightCond} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    <option value='normal'>정상</option>
                    <option value='warning'>경고</option>
                    <option value='crush'>고장</option>
                  </select>
                )}
                {filterSel === 'motorCondition' && (
                  <select ref={filterMotor} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    <option value='normal'>정상</option>
                    <option value='warning'>경고</option>
                    <option value='crush'>고장</option>
                  </select>
                )}
                {filterSel === 'batteryCondition' && (
                  <select ref={filterBattery} onChange={filterOptionChange} className='bg-slate-300 ml-2'>
                    <option value='full'>전체</option>
                    <option value='normal'>정상</option>
                    <option value='warning'>경고</option>
                    <option value='crush'>고장</option>
                  </select>
                )}
              </div>
              <div className='flex p-3'>
                <div className='flex items-center w-48'>
                  <RiCheckboxLine size={20} className='m-3 fill-gray-500' />
                  <div className='text-lg'>장치 관리</div>
                </div>
                {showControlModal && (
                  <div className="fixed inset-0 flex justify-center items-center">
                    <div className='bg-white p-6 rounded-md shadow-lg text-center w-1/3 h-1/4 pt-10'>
                     {modalContent}
                     <div className="flex justify-center mt-4">
                      <button onClick={() => setShowControlModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">확인</button>
                      </div>
                    </div>
                  </div>
                )}
                {/* {showControlModal && (
                  <div className="fixed inset-0 flex justify-center items-center">
                    <div className='bg-white p-6 rounded-md shadow-lg text-center'>
                      {modalContent}
                      <div className="flex justify-center mt-4">
                        <button onClick={() => setShowControlModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">확인</button>
                      </div>
                    </div>
                  </div>
                )} */}
                <button onClick={() => handleDeviceControl('조명 ON')} className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>조명 ON</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>조명 OFF</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>어닝 ON</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>어닝 OFF</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>자동 모드</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>수동 모드</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>예약하기</button>
                <button className='hover:bg-gray-200 border rounded-lg px-2 mx-2'>예약삭제</button>
                {checkboxCount > 0 && (
                  <button onClick={checkboxAwningDelete} className='hover:bg-red-100 border-4 border-red-400 rounded-lg px-2 ml-10'>어닝삭제</button>
                )}
                {showModal && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-16 rounded-md">
                      <p className='text-2xl'>삭제하시겠습니까?</p>
                      <div className="flex justify-center mt-4 pt-3">
                        <button onClick={fetchAwningDelete} className="px-3 py-1 bg-red-500 text-white rounded-md">삭제</button>
                        <button onClick={() => setShowModal(false)} className="ml-4 px-3 py-1 bg-gray-300 rounded-md">취소</button>
                      </div>
                    </div>
                  </div>
                )}
                {/* {showControlModal && (
                  <div className="fixed inset-0 flex justify-center items-center">
                    <div className='bg-white p-6 rounded-md shadow-lg'>
                      <p className="text-lg font-medium mb-4">{modalContent}</p>
                      <button onClick={() => setShowControlModal(false)} className="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">확인</button>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center mt-14'>
        <div className='w-5/6 p-4 text-xl flex'>
          <span>총 <span className='font-bold'>7</span>건 {checkboxCount > 0 && (<span>중 <span className='font-bold'>{checkboxCount}</span>건 선택</span>)}</span>
          {checkboxCount > 0 && (<button onClick={checkboxResetButton} className='ml-6 text-base items-center'><GrPowerReset /></button>)}
        </div>
      </div>
      <div className='flex justify-center h-1/2'>
        <div className='bg-white w-5/6 h-full flex flex-col shadow-md sm:rounded-lg'>
          <div className="flex-grow overflow-x-auto max-h-full hide-scrollbar rounded-t-lg">
            <table className="min-w-full text-center text-gray-500 whitespace-nowrap">
              <thead className="text-sm text-gray-700 bg-gray-50">
                <tr>
                  <th scope="col" className="p-4" rowSpan="2">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" onChange={(e) => handleAllCheck(e.target.checked)} checked={stateData.every(items => checkbox[items.deviceId])} className="w-4 h-4 rounded focus:ring-blue-500 focus:ring-2" />
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
              <tbody className='text-sm'>
                {stateData.map((items, index) => (
                  <tr key={index} className={`${checkbox[items.deviceId] ? 'bg-blue-50' : 'bg-white border-b hover:bg-gray-50'}`}>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id={`checkbox-${index}`} type="checkbox" name={`select-${items.deviceId}`} onChange={(e) => handleSingleCheck(e.target.checked, items.deviceId)} checked={checkbox[items.deviceId] || false} className="w-4 h-4 rounded focus:ring-blue-500  focus:ring-2 " />
                        <label htmlFor="checkbox-single" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <TableBody scope="row" content="상세" deviceId={items.deviceId} />
                    <TableBody content={items.managementNumber} />
                    <TableBody content={items.statusConnected === 'on' ? '연결' : '끊김'} />
                    <TableBody content={items.statusLighting === 'on' ? '켜짐' : '꺼짐'} />
                    <TableBody content={items.statusAwningExpand === 'on' ? '열림' : '닫힘'} />
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