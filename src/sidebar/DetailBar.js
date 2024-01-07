import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NotiMapState } from './NotiMapState';
import { DetailBarState } from './DetailBarState';
import { useLocation } from 'react-router-dom';
import NaverMap from '../component/NaverMap';

const DetailBar = ({ markerData }) => {
  const { naver } = window;
  const setIsDetailBar = useSetRecoilState(DetailBarState);


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

    const temperature = 26; // 현재 온도
    let weatherIconUrl;
    if (temperature < 0) {
      weatherIconUrl = 'https://i.ibb.co/vwFhLJm/temperature.png'; // 눈 아이콘
    } else if (temperature < 15) {
      weatherIconUrl = 'https://i.ibb.co/yk5bGZJ/cloudy.png'; // 구름 아이콘
    } else {
      weatherIconUrl = 'https://i.ibb.co/bQjr55h/sun.png'; // 맑음 아이콘
    }

    const infoWindow = new naver.maps.InfoWindow({
      content: `
    <div style='
      text-align: center
      overflow: hidden; /* rounded corners와 함께 사용하면 내부 요소가 밖으로 나오지 않음 */
      background-color: white; /* 배경색 지정 */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
      padding: 10px; /* 내용과 테두리 사이의 여백 */
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

  return (
    <div className='flex bg-slate-50 h-72 items-center'>
      <div id="map2" style={{ width: '300px', height: '200px' }} className='flex justify-center items-center ml-5'></div>
      <div className='flex-grow'>
        <div>{markerData.installationLocationMemo}</div>
        <button onClick={clickCancel}>취소</button>
      </div>
    </div>
  )
}

export default DetailBar;