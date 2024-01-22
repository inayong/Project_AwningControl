import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NotiMapState } from '../component/atoms/NotiMapState';
import { DetailBarState } from '../component/atoms/DetailBarState';
import { useLocation } from 'react-router-dom';
import NaverMap from '../component/NaverMap';
import { FaRegLightbulb, FaWhmcs } from "react-icons/fa";
import { IoBatteryChargingOutline } from "react-icons/io5";
import { GiNetworkBars } from "react-icons/gi";
import { TbTent } from "react-icons/tb";
import { GrStatusDisabledSmall } from 'react-icons/gr';
import Alert from '../component/Alert';
import { FaXmark } from "react-icons/fa6";
import TimePicker from 'react-time-picker';

const ControlBtnContent = ({ manageNum, handelControlConfirm, handleCloseModal, clickLightControl, clickAwningControl, clickModeStatus, lightStatus, awningStatus, modeStatus }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-10 flex justify-center">
      <div className='bg-white p-6 rounded-md shadow-lg text-center w-1/3 h-1/2 mt-40'>
        <div className='w-full h-full p-3 space-y-10'>
          <div className='flex justify-center items-center '>
            <div className='text-lg font-bold border-4 border-double border-gray-400 shadow-lg p-3 w-1/2 rounded-md font-ChosunGu'>{manageNum}</div>
          </div>
          <div className='space-y-10 flex flex-col justify-center items-center'>
            <div className='flex space-x-10 justify-center items-center'>
              <div className='font-Orbit font-semibold'>조명</div>
              <div className='bg-gray-300 rounded-lg'>
                <button onClick={() => clickLightControl('on')} className={`py-3 px-6 font-NanumSquareNeoVariable hover:bg-emerald-500 hover:rounded-l-lg ${lightStatus === 'on' ? 'bg-emerald-400 rounded-l-lg' : ''}`}>ON</button>
                <button onClick={() => clickLightControl('off')} className={`py-3 px-6 font-NanumSquareNeoVariable hover:bg-red-500 hover:rounded-r-lg ${lightStatus === 'off' ? 'bg-red-400 rounded-r-lg' : ''}`}>OFF</button>
              </div>
            </div>
            <div className='flex space-x-10 justify-center items-center'>
              <div className='font-Orbit font-semibold'>어닝</div>
              <div className='bg-gray-300 rounded-lg'>
                <button onClick={() => clickAwningControl('on')} className={`py-3 px-6 font-NanumSquareNeoVariable hover:bg-emerald-500 hover:rounded-l-lg ${awningStatus === 'on' ? 'bg-emerald-400 rounded-l-lg' : ''}`}>ON</button>
                <button onClick={() => clickAwningControl('off')} className={`py-3 px-6 font-NanumSquareNeoVariable hover:bg-red-500 hover:rounded-r-lg ${awningStatus === 'off' ? 'bg-red-400 rounded-r-lg' : ''}`}>OFF</button>
              </div>
            </div>
            <div className='flex space-x-10 justify-center items-center'>
              <div className='font-Orbit font-semibold'>모드</div>
              <div className='bg-gray-300 rounded-lg'>
                <button onClick={() => clickModeStatus('auto')} className={`py-3 px-6 font-NanumSquareNeoVariable hover:bg-emerald-500 hover:rounded-l-lg ${modeStatus === 'auto' ? 'bg-emerald-400 rounded-l-lg' : ''}`}>자동</button>
                <button onClick={() => clickModeStatus('manual')} className={`py-3 px-6 font-NanumSquareNeoVariable hover:bg-blue-500 hover:rounded-r-lg ${modeStatus === 'manual' ? 'bg-blue-400 rounded-r-lg' : ''}`}>수동</button>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center space-x-3'>
            <button onClick={handelControlConfirm} className='border rounded-lg py-2 px-4 hover:border-2 hover:border-blue-300 font-ChosunGu font-bold'>확인</button>
            <button onClick={handleCloseModal} className='border rounded-lg py-2 px-4 hover:border-2 hover:border-emerald-300 font-ChosunGu font-bold'>닫기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReserveBtnContent = ({ handelResClose, deviceId, reserveMenu, setReserveMenu, reserveDate, setReserveDate, reserveStartTime, setReserveStartTime, reserveFinishTime, setReserveFinishTime }) => {
  const [reserveData, setReserveData] = useState([]);



  // const formatDateTime2 = (dateStr) => {
  //   if (dateStr === null) {
  //     return '';
  //   } else {
  //     const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
  //     const date = new Date(dateStr);
  //     return date.toLocaleDateString('ko-KR', options);
  //   }
  // }


  useEffect(() => {
    const fetchRes = () => {
      fetch(`http://10.125.121.206:8080/user/reserv/view?deviceId=${deviceId}`, {
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(resp => resp.json())
        .then(data => {
          setReserveData(data);
          // console.log("reserve", data);
        })
        .catch(err => console.error(err));
    }

    if (deviceId) {
      fetchRes();
    }
  }, [deviceId])


  const clickReserveMenu = (menu) => {
    setReserveMenu(menu);
  }

  const clickReserveDate = (menu) => {
    setReserveDate(menu);
  }

  const clickReserveStart = (menu) => {
    setReserveStartTime(menu);
  }

  const clickReserveFinish = (menu) => {
    setReserveFinishTime(menu);
  }

  const formatDateTime = (dateStr) => {
    if (dateStr === null) {
      return '';
    } else {
      const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
      const date = new Date(dateStr);
      return date.toLocaleDateString('ko-KR', options);
    }
  }

  // const formatRepeatDay = (dayStr) => {
  //   const days = ["일", "월", "화", "수", "목", "금", "토"];

  // }

  // const fetchReserve = () => {
  //   fetch("http://10.125.121.206:8080/user/reserv/add", {
  //     method: "POST",
  //     headers: {
  //       'Authorization': localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       'reservationItems': 
  //     })
  //   })
  // }

  const [days, setDays] = useState([]);
  const handleClickDays = (day) => {
    setDays(item => {
      if (item.includes(day)) {
        return item.filter(d => d !== day);
      } else {
        return [...item, day];
      }
    })
  }


  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-10 flex justify-center items-center">
      <div className='bg-white p-6 rounded-md shadow-lg text-center w-4/5 h-5/6 flex flex-col'>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-lg font-bold border-4 border-double border-gray-400 shadow-lg p-3 rounded-md font-GmarketSansMedium flex-grow'>
            예약
          </div>
          <button onClick={handelResClose} className='ml-4 rounded-lg  font-ChosunGu font-bold'>
            <FaXmark size={40} className='fill-gray-700 hover:fill-red-400' />
          </button>
        </div>
        <div className='flex space-x-5 flex-grow'>
          <div className='w-1/3 rounded-md shadow-md flex flex-col overflow-auto'>
            <div className='bg-blue-200 h-12 flex-shrink-0 rounded-t-md flex justify-center items-center font-ChosunGu font-bold'>예약 목록</div> {/* 고정 */}
            <div className='bg-neutral-100 flex-grow rounded-b-md space-y-3 pt-5'>
              {reserveData.map((item, idx) => (
                <div key={idx} className='flex bg-white rounded-md shadow-md p-1 px-2 space-x-2'>
                  <div className='flex justify-center items-center pr-2'>
                    <div className='bg-blue-100 rounded-full w-5 flex justify-center font-NanumSquareNeoVariable text-sm'>{item.rsrvtId}</div>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex items-center space-x-3'>
                      <div className={`font-NanumSquareNeoVariable ${item.reservationItems === 'motor' ? 'text-blue-500' : 'text-orange-400'}`}>{item.reservationItems === 'motor' ? '모터' : '조명'}</div>
                      {item.reservationMethod === 'dayWeek' ? (
                        <div className='font-NanumSquareNeoVariable'>{item.repeatDayTime}</div>
                      ) : (
                        <div>
                          <div className='font-NanumSquareNeoVariable'>{formatDateTime(item.startDate)}</div>
                          <div className='font-NanumSquareNeoVariable'>{formatDateTime(item.finshDate)}</div>
                        </div>
                      )}
                    </div>
                    <div className='flex space-x-3'>
                      <div className='font-NanumSquareNeoVariable'>{item.reservationMethod === 'dayWeek' ? '반복' : '날짜'}</div>
                      {item.reservationMethod === 'dayWeek' ? (
                      // <div className='bg-indigo-200'>{item.repeatDay}</div>
                      <div className='font-NanumSquareNeoVariable'>토</div>
                      ) : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='bg-neutral-200 w-2/3 rounded-md shadow-md flex flex-col items-center p-3'>
            <div className='bg-white w-full h-48 flex flex-col justify-center items-center space-y-4'>
              <div className='bg-neutral-300 rounded-lg w-1/3 h-16 flex justify-center p-2'>
                <button onClick={() => clickReserveMenu('light')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable font-semibold ${reserveMenu === 'light' ? 'bg-white' : ''}`}>조명</button>
                <button onClick={() => clickReserveMenu('motor')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable font-semibold ${reserveMenu === 'motor' ? 'bg-white' : ''}`}>모터</button>
              </div>
              <div className='bg-neutral-300 rounded-lg w-1/3 h-16 flex justify-center p-2'>
                <button onClick={() => clickReserveDate('week')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable font-semibold ${reserveDate === 'week' ? 'bg-white' : ''}`}>요일 예약</button>
                <button onClick={() => clickReserveDate('date')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable font-semibold ${reserveDate === 'date' ? 'bg-white' : ''}`}>날짜 예약</button>
              </div>
            </div>
            {reserveDate === 'week' ? (
              <div className=' bg-white w-full flex-grow space-y-10 pt-5'>
                <div className='flex flex-col items-center space-y-3'>
                  <div className='font-ChosunGu font-bold text-lg'>요일 선택</div>
                  <div className='flex space-x-2'>
                    <button onClick={() => handleClickDays('일')} className={`${days.includes('일') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>일</button>
                    <button onClick={() => handleClickDays('월')} className={`${days.includes('월') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>월</button>
                    <button onClick={() => handleClickDays('화')} className={`${days.includes('화') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>화</button>
                    <button onClick={() => handleClickDays('수')} className={`${days.includes('수') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>수</button>
                    <button onClick={() => handleClickDays('목')} className={`${days.includes('목') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>목</button>
                    <button onClick={() => handleClickDays('금')} className={`${days.includes('금') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>금</button>
                    <button onClick={() => handleClickDays('토')} className={`${days.includes('토') ? 'bg-blue-100' : ''} border py-2 px-3 hover:bg-gray-100 font-NanumBarunpen`}>토</button>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='font-ChosunGu font-bold text-lg'>시간 선택</div>
                  <div className='flex justify-center space-x-5'>
                    <div className='bg-blue-50 rounded-md w-1/5 h-16 flex justify-center p-2'>
                      <button onClick={() => clickReserveStart('morning')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveStartTime === 'morning' ? 'bg-white' : ''}`}>오전</button>
                      <button onClick={() => clickReserveStart('after')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveStartTime === 'after' ? 'bg-white' : ''}`}>오후</button>
                    </div>
                    <div className='border-2 border-blue-50 rounded-lg w-1/5 h-16 flex justify-center p-2 items-center space-x-5'>
                      <input className='font-NanumBarunpen w-10 flex text-center outline-none' placeholder='00' />
                      <div className='font-NanumBarunpen'>:</div>
                      <input className='font-NanumBarunpen w-10 flex text-center outline-none' placeholder='00' />
                    </div>
                    <span className='flex items-center font-NanumBarunpen'>부터</span>
                  </div>
                  <div className='flex justify-center space-x-5'>
                  <div className='bg-blue-50 rounded-md w-1/5 h-16 flex justify-center p-2'>
                      <button onClick={() => clickReserveFinish('morning')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveFinishTime === 'morning' ? 'bg-white' : ''}`}>오전</button>
                      <button onClick={() => clickReserveFinish('after')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveFinishTime === 'after' ? 'bg-white' : ''}`}>오후</button>
                    </div>
                    <div className='border-2 border-blue-50 rounded-lg w-1/5 h-16 flex justify-center p-2 items-center space-x-5'>
                      <input className='font-NanumBarunpen w-10 flex text-center outline-none' placeholder='00' />
                      <div className='font-NanumBarunpen'>:</div>
                      <input className='font-NanumBarunpen w-10 flex text-center outline-none' placeholder='00' />
                    </div>
                    <span className='flex items-center font-NanumBarunpen'>까지</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className=' bg-white w-full flex-grow pt-5 flex'>
                <div className='flex flex-col items-center justify-center flex-grow space-y-10'>
                  <div className='text-lg font-ChosunGu font-bold'>시작일시(ON)</div>
                  <div className='space-y-16 flex flex-col items-center'>
                    <div className='flex space-x-5'>
                      <div className='font-ChosunGu font-bold'>날짜</div>
                      <input type='date' className='font-NanumSquareNeoVariable' />
                    </div>
                    <div className='flex space-x-5 items-center'>
                      <div className='font-ChosunGu font-bold'>시간</div>
                      <div className='flex space-x-3'>
                      <div className='bg-blue-50 rounded-md flex p-1 w-32 h-12'>
                          <button onClick={() => clickReserveStart('morning')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveStartTime === 'morning' ? 'bg-white' : ''}`}>오전</button>
                          <button onClick={() => clickReserveStart('after')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveStartTime === 'after' ? 'bg-white' : ''}`}>오후</button>
                        </div>
                        <div className='border-2 border-blue-50 rounded-lg flex p-2 w-32 h-12 justify-center items-center space-x-3'>
                          <input className='font-NanumBarunpen w-10 flex text-center outline-none bg-transparent' placeholder='00' />
                          <div className='font-NanumBarunpen'>:</div>
                          <input className='font-NanumBarunpen w-10 flex text-center outline-none bg-transparent' placeholder='00' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center flex-grow space-y-10'>
                  <div className='text-lg font-ChosunGu font-bold'>종료일시(OFF)</div>
                  <div className='space-y-16 flex flex-col items-center'>
                    <div className='flex space-x-5'>
                      <div className='font-ChosunGu font-bold'>날짜</div>
                      <input type='date' className='font-NanumSquareNeoVariable' />
                    </div>
                    <div className='flex space-x-5 items-center'>
                    <div className='font-ChosunGu font-bold'>시간</div>
                      <div className='flex space-x-3'>
                        <div className='bg-blue-50 rounded-md flex p-1 w-32 h-12'>
                          <button onClick={() => clickReserveFinish('morning')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveFinishTime === 'morning' ? 'bg-white' : ''}`}>오전</button>
                          <button onClick={() => clickReserveFinish('after')} className={`w-full rounded-md flex justify-center items-center font-NanumSquareNeoVariable ${reserveFinishTime === 'after' ? 'bg-white' : ''}`}>오후</button>
                        </div>
                        <div className='border-2 border-blue-50 rounded-lg flex p-2 w-32 h-12 justify-center items-center space-x-3'>
                          <input className='font-NanumBarunpen w-10 flex text-center outline-none bg-transparent' placeholder='00' />
                          <div className='font-NanumBarunpen'>:</div>
                          <input className='font-NanumBarunpen w-10 flex text-center outline-none bg-transparent' placeholder='00' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-center items-center mt-5'>
          <button className='border rounded-lg py-2 px-4 hover:border-2 hover:border-blue-300 font-ChosunGu font-bold'>확인</button>
        </div>
      </div>
    </div>


  )
}

const DetailBar = ({ markerData, showControlModal, setShowControlModal, showReserveModal, setShowReserveModal }) => {
  const { naver } = window;
  const setIsDetailBar = useSetRecoilState(DetailBarState);
  const [stateDetailData, setStateDetailData] = useState([]);

  //현재
  const [lightStatus, setLightStatus] = useState(markerData.statusLighting);
  const [awningStatus, setAwningStatus] = useState(markerData.statusAwningExpand);
  const [modeStatus, setModeStatus] = useState(markerData.statusOperationMode);

  const [showAlert, setShowAlert] = useState(false);

  //초기
  const [initialLightStatus, setInitialLightStatus] = useState(lightStatus);
  const [initialAwningStatus, setInitialAwningStatus] = useState(awningStatus);
  const [initialModeStatus, setInitialModeStatus] = useState(modeStatus);

  const [alertMessage, setAlertMessage] = useState('');



  useEffect(() => {

    const position = new naver.maps.LatLng(markerData.latitude, markerData.longitude);

    const map = new naver.maps.Map('map2', {
      center: position,
      zoom: 17
    });

    //센터 이동
    naver.maps.Event.once(map, 'tilesloaded', function () {
      map.panBy(new naver.maps.Point(80, 0));
    });

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(markerData.latitude, markerData.longitude),
      map: map
    });

    //최종은 기상청 날씨?
    const temperature = markerData.statusTemperature; // 현재 온도
    let weatherIconUrl;
    if (temperature < 0) {
      weatherIconUrl = 'https://i.ibb.co/vwFhLJm/temperature.png'; // 눈 아이콘
    } else if (temperature < 15) {
      weatherIconUrl = 'https://i.ibb.co/Fbb7QhL/cloudy-2.png'; // 구름 아이콘
    } else {
      weatherIconUrl = 'https://i.ibb.co/bQjr55h/sun.png'; // 맑음 아이콘
    }

    const windspeed = markerData.statusWindSpeed;
    // let windIconUrl;

    const infoWindow = new naver.maps.InfoWindow({
      content: `
      <div style='display: flex; background-color: transparent;'>
        <div style='
          text-align: center;
          border-radius: 5px;
          overflow: hidden; /* rounded corners와 함께 사용하면 내부 요소가 밖으로 나오지 않음 */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
          padding: 8px; /* 내용과 테두리 사이의 여백 */
          margin-right: 12px;
        '>
          <img src='${weatherIconUrl}' width="40" height="40" alt='날씨 아이콘' />
          <br>
          <div style='font-family: "ChosunGu"; font-weight: bold;'>${temperature}°C</div>
        </div>
        <div style='
          text-align: center;
          border-radius: 5px;
          overflow: hidden; /* rounded corners와 함께 사용하면 내부 요소가 밖으로 나오지 않음 */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
          padding: 8px; /* 내용과 테두리 사이의 여백 */
        '>
          <img src='https://i.ibb.co/Jnb44GQ/wind.png' width="40" height="40" alt='풍속' />
          <br>
          <div style='font-family: "ChosunGu"; font-weight: bold;'>${windspeed}</div>
        </div>
    </div>
  `,
      borderWidth: 0,
      position: position,
      anchorSkew: true,
      anchorSize: new naver.maps.Size(0, 0),
      pixelOffset: new naver.maps.Point(100, 70)
    });

    infoWindow.open(map, marker);

    return () => {
      infoWindow.close();
    }

  }, [markerData])



  //button
  // const clickControlButton = (controlStatus) => {
  const clickControlButton = () => {
    // setModalStatus(controlStatus);
    setShowControlModal(true);
  }

  // console.log(parseInt(markerData.batteryCondition) <= 20);
  // console.log(typeof markerData.statusBatteryCharge);

  const clickLightControl = (status) => {
    setLightStatus(status);
    // console.log("lightstatus", status)
  }

  const clickAwningControl = (status) => {
    setAwningStatus(status);
    // console.log("awningstatus", status)
  }

  const clickModeStatus = (status) => {
    setModeStatus(status);
    // console.log("modestatus", status)
  }

  useEffect(() => {
    if (showControlModal) {
      setInitialLightStatus(markerData.statusLighting);
      setInitialAwningStatus(markerData.statusAwningExpand);
      setInitialModeStatus(markerData.statusOperationMode);
    }
  }, [showControlModal, markerData]);

  const handleCloseModal = () => {
    // 초기 상태로 복원
    setLightStatus(initialLightStatus);
    setAwningStatus(initialAwningStatus);
    setModeStatus(initialModeStatus);
    setShowControlModal(false);
  };
  const handelControlConfirm = () => {
    let message = '';
    let isChange = false;

    if (lightStatus !== initialLightStatus) {
      message += `조명을 ${initialLightStatus.toUpperCase()}에서 ${lightStatus.toUpperCase()}(으)로 변경하였습니다.`;
      isChange = true;
    }
    if (awningStatus !== initialAwningStatus) {
      message += `어닝을 ${initialAwningStatus.toUpperCase()}에서 ${awningStatus.toUpperCase()}(으)로 변경하였습니다.`;
      isChange = true;
    }
    if (modeStatus !== initialModeStatus) {
      message += `모드를 ${initialModeStatus === 'auto' ? '자동' : '수동'}에서 ${modeStatus === 'auto' ? '자동' : '수동'}으로 변경하였습니다.`;
      isChange = true;
    }

    if (isChange) {
      setAlertMessage(message);
    } else {
      setAlertMessage("변경사항이 없습니다.");
    }
    setShowAlert(true);
    setTimeout(() => { setShowAlert(false) }, 3000);
    // setShowControlModal(false);
  }


  //reserve
  const [reserveMenu, setReserveMenu] = useState('light');
  const [reserveDate, setReserveDate] = useState('week');
  const [reserveStartTime, setReserveStartTime] = useState('morning');
  const [reserveFinishTime, setReserveFinishTime] = useState('morning');





  return (
    <div className='flex bg-white h-72 items-center py-5 pl-5 px-8 space-x-8'>
      <div id="map2" style={{ width: '20%', height: '100%' }} className='flex justify-center items-center rounded-lg shadow-lg'></div>
      <div className='flex flex-grow h-full space-x-10'>
        <div className='flex flex-col bg-neutral-100 w-1/3 shadow-lg rounded-lg p-3'>
          <div className='flex justify-between h-1/3 rounded-t-lg p-1 border-b'>
            <div className='w-32 flex flex-col justify-center items-center space-y-2'>
              <div className='bg-white px-3 shadow-md font-NanumSquareNeoVariable text-sm'>Device ID</div>
              <div className='font-ChosunGu font-bold'>{markerData.deviceId}</div>
            </div>
            <div className='w-32 flex flex-col justify-center items-center space-y-2'>
              <div className='bg-white px-3 shadow-md font-NanumSquareNeoVariable text-sm'>Control ID</div>
              <div className='font-ChosunGu font-bold'>{markerData.controlId}</div>
            </div>
            <div className='w-32 flex flex-col justify-center items-center space-y-2'>
              <div className='bg-white px-3 shadow-md font-NanumSquareNeoVariable text-sm'>관리번호</div>
              {markerData.managementNumber.length > 8 ? (
                <div className="text-sm whitespace-nowrap font-ChosunGu font-bold">
                  {markerData.managementNumber}
                </div>
              ) : (
                <div className='font-ChosunGu font-bold'>{markerData.managementNumber}</div>
              )}
            </div>
          </div>
          <div className=' h-1/2 flex flex-col p-2 space-y-12 pt-5'>
            <div className='flex space-x-5 items-center'>
              <div className='flex'>
                <div className='bg-white px-3 shadow-md font-NanumSquareNeoVariable'>설치장소</div>
              </div>
              <div className='flex-1 font-ChosunGu font-bold'>{markerData.installationLocationMemo}</div>
            </div>
            <div className='flex space-x-5 items-center'>
              <div className='bg-white px-3 shadow-md font-NanumSquareNeoVariable'>모드</div>
              <div className='font-ChosunGu font-bold'>{markerData.statusOperationMode === 'auto' ? "자동" : "수동"}</div>
            </div>
          </div>
        </div>
        <div className='flex justify-between w-1/2 space-x-10 bg-neutral-100 p-3 rounded-lg shadow-lg'>
          <div className='w-1/5 flex flex-col rounded-3xl justify-center items-center'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <TbTent size={30} className='text-amber-700' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                어닝
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full space-y-1'>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusAwningExpand === 'on' ? 'text-emerald-400' : 'text-red-400'} font-bold font-SDSamliphopangcheOutline text-2xl`}>{markerData.statusAwningExpand.toUpperCase()}</div>
            </div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <GiNetworkBars size={30} className='fill-blue-500' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                통신
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full space-y-1'>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusConnected === 'on' ? 'text-emerald-400' : 'text-red-400'} font-bold font-SDSamliphopangcheOutline text-2xl`}>{markerData.statusConnected.toUpperCase()}</div>
            </div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <IoBatteryChargingOutline size={35} className='fill-green-600' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                배터리
              </span>
            </div>
            <div className='flex flex-col justify-center items-center h-2/3 border-t w-full space-y-1'>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusBatteryCharge <= 20 ? 'text-red-400' : 'text-emerald-400'} font-SDSamliphopangcheOutline text-2xl`}>{markerData.statusBatteryCharge}%</div>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.batteryCondition === 'normal' ? 'text-emerald-400' : 'text-red-400'} font-GeekbleMalang2WOFF2 text-2xl`}>{markerData.batteryCondition === 'normal' ? "정상" : "고장"}</div>
            </div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <FaRegLightbulb size={30} className='fill-yellow-500' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                조명
              </span>
            </div>
            <div className='flex flex-col justify-center items-center h-2/3 border-t w-full space-y-1'>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusLighting === 'on' ? 'text-emerald-400' : 'text-red-400'} font-bold font-SDSamliphopangcheOutline text-2xl`}>{markerData.statusLighting.toUpperCase()}</div>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.lightingCondition === 'normal' ? 'text-emerald-400' : 'text-red-400'} font-GeekbleMalang2WOFF2 text-2xl`}>{markerData.lightingCondition === 'normal' ? "정상" : "고장"}</div>
            </div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <FaWhmcs size={30} className='fill-zinc-600' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                모터
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full space-y-1'>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.motorCondition === 'normal' ? 'text-emerald-400' : 'text-red-400'} font-GeekbleMalang2WOFF2 text-2xl`}>{markerData.motorCondition === 'normal' ? "정상" : "고장"}</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-end my-5 w-40'>
          <button onClick={clickControlButton} className='bg-teal-700 text-white shadow-md w-full h-1/3 rounded-2xl flex items-center justify-center mb-7 font-ChosunGu font-bold'>제어버튼</button>
          {showControlModal && (
            <ControlBtnContent manageNum={markerData.managementNumber} handelControlConfirm={handelControlConfirm} handleCloseModal={handleCloseModal}
              clickLightControl={clickLightControl} clickAwningControl={clickAwningControl} clickModeStatus={clickModeStatus}
              lightStatus={lightStatus} awningStatus={awningStatus} modeStatus={modeStatus} />
          )}
          <Alert show={showAlert} message={alertMessage} />
          <button onClick={() => setShowReserveModal(true)} className='bg-cyan-700 text-white shadow-md  w-full h-1/3 rounded-2xl flex items-center justify-center font-ChosunGu font-bold'>예약버튼</button>
          {showReserveModal && (
            <ReserveBtnContent handelResClose={() => setShowReserveModal(false)} deviceId={markerData.deviceId} reserveMenu={reserveMenu} setReserveMenu={setReserveMenu} reserveDate={reserveDate} setReserveDate={setReserveDate} reserveStartTime={reserveStartTime} setReserveStartTime={setReserveStartTime} reserveFinishTime={reserveFinishTime} setReserveFinishTime={setReserveFinishTime} />
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailBar;