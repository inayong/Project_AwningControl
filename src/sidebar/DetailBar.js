import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NotiMapState } from './NotiMapState';
import { DetailBarState } from './DetailBarState';
import { useLocation } from 'react-router-dom';
import NaverMap from '../component/NaverMap';
import { FaRegLightbulb, FaWhmcs } from "react-icons/fa";
import { IoBatteryChargingOutline } from "react-icons/io5";
import { GiNetworkBars } from "react-icons/gi";
import { TbTent } from "react-icons/tb";

const DetailBar = ({ markerData }) => {
  const { naver } = window;
  const setIsDetailBar = useSetRecoilState(DetailBarState);
  const [stateDetailData, setStateDetailData] = useState([]);


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

    const infoWindow = new naver.maps.InfoWindow({
      content: `
    <div style='
      text-align: center;
      border-radius: 5px;
      overflow: hidden; /* rounded corners와 함께 사용하면 내부 요소가 밖으로 나오지 않음 */
      background-color: white; /* 배경색 지정 */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
      padding: 8px; /* 내용과 테두리 사이의 여백 */
    '>
      <img src='${weatherIconUrl}' width="40" height="40" alt='날씨 아이콘' />
      <br>
      ${temperature}°C
    </div>
  `,
      borderWidth: 0,
      position: position,
      anchorSkew: true,
      anchorSize: new naver.maps.Size(0, 0),
      pixelOffset: new naver.maps.Point(80, 50)
    });

    infoWindow.open(map, marker);

    return () => {
      infoWindow.close();
    }

  }, [markerData])




  const clickCancel = () => {
    setIsDetailBar(false);
  }

  //   if (!markerData) {
  //     return null; 
  // }

  // useEffect(() => {
  //   fetch("http://10.125.121.206:8080/user/device/view", {
  //     method: "GET",
  //     headers: {
  //       'Authorization': localStorage.getItem("token"),
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setStateDetailData(data);
  //       console.log("StateDetailData", data)
  //     })
  //     .catch(err => console.error(err))
  //   }, [])

  return (
    <div className='flex bg-white h-72 items-center py-5 pl-5 px-8 space-x-8'>
      <div id="map2" style={{ width: '20%', height: '100%' }} className='flex justify-center items-center'></div>
      <div className='flex flex-grow h-full space-x-10'>
        <div className='flex flex-col bg-slate-50 w-1/3 shadow-lg rounded-lg'>
          <div className='flex justify-between h-1/3 rounded-t-lg p-1 border-b'>
            <div className='w-32 flex flex-col justify-center items-center'>
              <div className='bg-white px-3 shadow-md'>Device ID</div>
              <div className=''>123456</div>
            </div>
            <div className='w-32 flex flex-col justify-center items-center'>
              <div className='bg-white px-3 shadow-md'>Control ID</div>
              <div className=''>456789</div>
            </div>
            <div className='w-32 flex flex-col justify-center items-center'>
              <div className='bg-white px-3 shadow-md'>관리번호</div>
              <div className=''>987321</div>
            </div>
          </div>
          <div className=' h-1/2 flex flex-col p-2 space-y-8'>
            <div className='flex space-x-5'>
              <div className='flex'>
                <div className='bg-white px-3 shadow-md'>설치장소</div>
                <div className='pl-3'>:</div>
              </div>
              <div>{markerData.installationLocationMemo}</div>
            </div>
            <div className='flex '>
              <div className='bg-white px-3 shadow-md'>모드</div>
              <div>자동</div>
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
            <div className='flex flex-col justify-center items-center h-2/3 border-t w-full space-y-1'>
              {/* <div className='flex justify-center items-center h-full w-full rounded-b-3xl bg-emerald-400 text-white font-bold text-2xl'>ON</div> */}
              <div className='flex justify-center items-center h-full w-full rounded-b-3xl text-emerald-400 font-bold text-2xl'>ON</div>
              <div className='flex justify-center items-center h-full w-full rounded-b-3xl text-red-400 font-bold text-2xl'>고장</div>
            </div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <GiNetworkBars size={30} className='fill-blue-500' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                통신
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full'>상태</div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <FaRegLightbulb size={30} className='fill-yellow-500' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                조명
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full'>상태</div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <IoBatteryChargingOutline size={35} className='fill-emerald-500' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                배터리
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full'>상태</div>
          </div>
          <div className='w-1/5 rounded-3xl'>
            <div className='flex justify-center items-center h-1/3 border-b w-full'>
              <FaWhmcs size={30} className='fill-zinc-600' />
              <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 pt-14">
                모터
              </span>
            </div>
            <div className='flex justify-center items-center h-2/3 border-t w-full'>상태</div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-end my-5 w-40 space-y-5'>
          <div className='bg-red-300 w-full h-1/3 rounded-2xl flex items-center justify-center'>제어버튼2</div>
          <div className='bg-green-300 w-full h-1/3 rounded-2xl flex items-center justify-center'>예약버튼2</div>
        </div>
      </div>
    </div>
  )
}

export default DetailBar;