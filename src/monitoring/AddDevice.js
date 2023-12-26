import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";

const FormSection = ({ labelLeft, labelRight }) => {
  return (
    <div className='flex py-7 pl-3'>
      <div className='w-1/2'>{labelLeft}</div>
      <div>{labelRight}</div>
    </div>
  );
};

const AddDevice = () => {
  const { naver } = window;
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [clickAddress, setClickAddress] = useState('');
  const [inputAddress, setInputAddress] = useState('');

  useEffect(() => {

    const position = new naver.maps.LatLng(37.3595704, 127.105399);

    const map = new naver.maps.Map('map', {
      center: position,
      zoom: 10
    });
    
    const marker = new naver.maps.Marker({
      position: position,
      map: map
  });

    // let marker = null;

    naver.maps.Event.addListener(map, 'click', function(e) {
      const clickLatLng = e.coord;
      const lat = clickLatLng.y;
      const lng = clickLatLng.x;

      setLocation({ lat, lng });
      marker.setPosition(clickLatLng);

      //좌표 => 주소
      naver.maps.Service.reverseGeocode({
        coords: clickLatLng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
      }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("wrong");
        }
        const result = response.v2,
        items = result.results,
        address = result.address;

        setClickAddress(address);
        console.log("click", address);
      });
    });

  }, [])

  const handleSearch = () => {
    naver.maps.Service.geocode({
      query: inputAddress
    }, function(status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("wrong");
      }
      const result = response.v2,
      items = result.addresses;
      console.log("검색 결과", items)
    });
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  }

  return (
    <div className='h-screen bg-slate-200 flex justify-center items-center'>
      <div className=' flex bg-white w-[80%] h-[80%]'>
        <div className='flex bg-slate-400 w-2/5 h-full'>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div className='w-2/3 text-lg p-3 flex flex-col'>
            <div className='flex justify-center text-xl font-bold p-1'>
              <div className='border p-3 w-2/3 text-center rounded-lg'>장치 추가</div>
            </div>
          <div className='bg-slate-50 flex-grow '>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2 flex'>
                <div className='pr-3'>주소</div>
                <input type='text' value={inputAddress} onChange={handleInputChange} placeholder='주소 입력'></input>
                <button onClick={handleSearch}><CiSearch /></button>
              </div>
              <div>위·경도 {location.lat} / {location.lng}</div>
            </div>
            <div className='py-7 pl-3'>관리구역</div>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2'>관리번호</div>
              <div>설치장소 메모</div>
            </div>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2'>기구ID</div>
              <div>제어기ID</div>
            </div>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2'>어닝 열림시간 - 좌(초)</div>
              <div>어닝 열림시간 - 우(초)</div>
            </div>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2'>풍속 임계값</div>
              <div>어닝 재열림 시간(분)</div>
            </div>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2'>설치일자</div>
              <div>계약만료기간</div>
            </div>
          </div>
            <div className='flex justify-center m-1'>
              <button className='border mr-3 p-1'>추가</button>
              <button className='border ml-3 p-1'>취소</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddDevice;