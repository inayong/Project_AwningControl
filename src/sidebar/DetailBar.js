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

const DetailBar = ({ markerData, showControlModal, setShowControlModal }) => {
  const { naver } = window;
  const setIsDetailBar = useSetRecoilState(DetailBarState);
  const [stateDetailData, setStateDetailData] = useState([]);

  const [lightStatus, setLightStatus] = useState(markerData.statusLighting);
  const [awningStatus, setAwningStatus] = useState(markerData.statusAwningExpand);
  const [modeStatus, setModeStatus] = useState(markerData.statusOperationMode);
  // const [modalStatus, setModalStatus] = useState('');
  // const [isActive, setIsActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [lightStatusRef, setLightStatusRef] = useState(lightStatus);
  const [awningStatusRef, setAwningStatusRef] = useState(awningStatus);
  const [modeStatusRef, setModeStatusRef] = useState(modeStatus);
  // const awningStatusRef = useRef(markerData.statusAwningExpand);
  // const modeStatusRef = useRef(markerData.statusOperationMode);
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
          ${temperature}°C
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
          ${windspeed}
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
    console.log("lightstatus", status)
  }

  const clickAwningControl = (status) => {
    setAwningStatus(status);
    console.log("awningstatus", status)
  }

  const clickModeStatus = (status) => {
    setModeStatus(status);
    console.log("modestatus", status)
  }

  const handelControlConfirm = () => {
    let message = '';
    let isChange = false;

    if (lightStatus !== lightStatusRef.current) {
      message += '조명 변경';
      isChange = true;
    }
    if (awningStatus !== awningStatusRef.current) {
      message += '어닝 변경';
      isChange = true;
    }
    if (modeStatus !== modeStatusRef.current) {
      message += '모드 변경';
      isChange = true;
    }

    if (isChange) {
      setAlertMessage(message);
      setShowAlert(true);
      setTimeout(() => { setShowAlert(false) }, 3000);
    } else {
      setAlertMessage("xxxx");
      setShowAlert(true);
      setTimeout(() => { setShowAlert(false) }, 1000);
    }

    setLightStatusRef(lightStatus);
    setAwningStatusRef(awningStatus);
    setModeStatusRef(modeStatus);

  }
  useEffect(() => {
    console.log("현재 lightStatus:", lightStatus);
    // console.log("이전 lightStatus:", lightStatusRef.current);
  }, [lightStatus]);



  useEffect(() => {
    setLightStatus(markerData.statusLighting);
  }, [markerData]);




  return (
    <div className='flex bg-white h-72 items-center py-5 pl-5 px-8 space-x-8'>
      <div id="map2" style={{ width: '20%', height: '100%' }} className='flex justify-center items-center'></div>
      <div className='flex flex-grow h-full space-x-10'>
        <div className='flex flex-col bg-slate-50 w-1/3 shadow-lg rounded-lg p-3'>
          <div className='flex justify-between h-1/3 rounded-t-lg p-1 border-b'>
            <div className='w-32 flex flex-col justify-center items-center space-y-2'>
              <div className='bg-white px-3 shadow-md'>Device ID</div>
              <div className=''>{markerData.deviceId}</div>
            </div>
            <div className='w-32 flex flex-col justify-center items-center space-y-2'>
              <div className='bg-white px-3 shadow-md'>Control ID</div>
              <div className=''>{markerData.controlId}</div>
            </div>
            <div className='w-32 flex flex-col justify-center items-center space-y-2'>
              <div className='bg-white px-3 shadow-md'>관리번호</div>
              {markerData.managementNumber.length > 8 ? (
                <div className="text-sm whitespace-nowrap">
                  {markerData.managementNumber}
                </div>
              ) : (
                <div className=''>{markerData.managementNumber}</div>
              )}
            </div>
          </div>
          <div className=' h-1/2 flex flex-col p-2 space-y-12 pt-5'>
            <div className='flex space-x-5 items-center'>
              <div className='flex'>
                <div className='bg-white px-3 shadow-md'>설치장소</div>
              </div>
              <div className='flex-1'>{markerData.installationLocationMemo}</div>
            </div>
            <div className='flex space-x-5 items-center'>
              <div className='bg-white px-3 shadow-md'>모드</div>
              <div className=''>{markerData.statusOperationMode === 'auto' ? "자동" : "수동"}</div>
            </div>
          </div>
        </div>
        <div className='flex justify-between w-1/2 space-x-10 bg-slate-50 p-3 rounded-lg shadow-lg'>
          <div className='w-1/5 flex flex-col rounded-3xl justify-center items-center'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <TbTent size={30} className='text-amber-700' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                어닝
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full space-y-1'>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusAwningExpand === 'on' ? 'text-emerald-400' : 'text-red-400'} font-bold text-2xl`}>{markerData.statusAwningExpand.toUpperCase()}</div>
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
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusConnected === 'on' ? 'text-emerald-400' : 'text-red-400'} font-bold text-2xl`}>{markerData.statusConnected.toUpperCase()}</div>
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
              {/* <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${parseInt(markerData.statusBatteryCharge) <= 20 ? 'text-red-400' : 'text-emerald-400'} font-bold text-2xl`}>{markerData.statusBatteryCharge}%</div> */}
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusBatteryCharge <= 20 ? 'text-red-400' : 'text-emerald-400'} font-bold text-2xl`}>{markerData.statusBatteryCharge}%</div>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.batteryCondition === 'normal' ? 'text-emerald-400' : 'text-red-400'} font-bold text-2xl`}>{markerData.batteryCondition === 'normal' ? "정상" : "고장"}</div>
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
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.statusLighting === 'on' ? 'text-emerald-400' : 'text-red-400'} font-bold text-2xl`}>{markerData.statusLighting.toUpperCase()}</div>
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.lightingCondition === 'normal' ? 'text-emerald-400' : 'text-red-400'} font-bold text-2xl`}>{markerData.lightingCondition === 'normal' ? "정상" : "고장"}</div>
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
              <div className={`flex justify-center items-center h-full w-full rounded-b-3xl ${markerData.motorCondition === 'normal' ? 'text-emerald-400' : 'text-red-400'} font-bold text-2xl`}>{markerData.motorCondition === 'normal' ? "정상" : "고장"}</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-end my-5 w-40'>
          <button onClick={clickControlButton} className='bg-slate-300 shadow-md w-full h-1/3 rounded-2xl flex items-center justify-center mb-5'>제어버튼</button>
          {showControlModal && (
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-10 flex justify-center">
              <div className='bg-white p-6 rounded-md shadow-lg text-center w-1/3 h-1/2 mt-40'>
                <div className='w-full h-full p-3 space-y-10'>
                  <div className='flex justify-center items-center '>
                    <div className='text-lg font-bold border-2 p-3 w-1/2 rounded-md'>{markerData.managementNumber}</div>
                  </div>
                  <div className='space-y-10 flex flex-col justify-center items-center'>
                    <div className='flex space-x-3 justify-center items-center'>
                      <div>조명</div>
                      <div className='border-2 '>
                        <button onClick={() => clickLightControl('on')} className={`border-r py-3 px-6 hover:bg-emerald-500 ${lightStatus === 'on' ? 'bg-emerald-500' : ''}`}>ON</button>
                        <button onClick={() => clickLightControl('off')} className={`border-l py-3 px-6 hover:bg-red-500 ${lightStatus === 'off' ? 'bg-red-500' : ''}`}>OFF</button>
                      </div>
                    </div>
                    <div className='flex space-x-3 justify-center items-center'>
                      <div>어닝</div>
                      <div className='border-2 '>
                        <button onClick={() => clickAwningControl('on')} className={`border-r py-3 px-6 hover:bg-emerald-500 ${awningStatus === 'on' ? 'bg-emerald-500' : ''}`}>ON</button>
                        <button onClick={() => clickAwningControl('off')} className={`border-l py-3 px-6 hover:bg-red-500 ${awningStatus === 'off' ? 'bg-red-500' : ''}`}>OFF</button>
                      </div>
                    </div>
                    <div className='flex space-x-3 justify-center items-center'>
                      <div>모드</div>
                      <div className='border-2 '>
                        <button onClick={() => clickModeStatus('auto')} className={`border-r py-3 px-6 hover:bg-emerald-500 ${modeStatus === 'auto' ? 'bg-emerald-500' : ''}`}>자동</button>
                        <button onClick={() => clickModeStatus('manual')} className={`border-l py-3 px-6 hover:bg-blue-500 ${modeStatus === 'manual' ? 'bg-blue-500' : ''}`}>수동</button>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center space-x-3'>
                    <button onClick={handelControlConfirm} className='border p-3 hover:border-2 hover:border-blue-300' >확인</button>
                    <button onClick={() => setShowControlModal(false)} className='border p-3 hover:border-2 hover:border-gray-400' >취소</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Alert show={showAlert} message={alertMessage} />
          <button className='bg-slate-300 shadow-md  w-full h-1/3 rounded-2xl flex items-center justify-center'>예약버튼</button>
        </div>
      </div>
    </div>
  )
}

export default DetailBar;