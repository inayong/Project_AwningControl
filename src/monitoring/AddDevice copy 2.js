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
  const [newMarker, setNewMarker] = useState();
  const [newMap, setNewMap] = useState();

  useEffect(() => {

    const position = new naver.maps.LatLng(37.3595704, 127.105399);

    const map = new naver.maps.Map('map', {
      center: position,
      zoom: 10
    });
    setNewMap(map);

    // const marker = new naver.maps.Marker({
    //   position: position,
    //   map: map
    // });

    // let marker = null;

    naver.maps.Event.addListener(map, 'click', function (e) {
      const clickLatLng = e.coord;
      const lat = clickLatLng.y;
      const lng = clickLatLng.x;

      let marker = newMarker || new naver.maps.Marker({
        position: clickLatLng,
        map: map
      })

      setLocation({ lat, lng });
      marker.setPosition(clickLatLng);
      setNewMarker(marker);

      //좌표 => 주소
      naver.maps.Service.reverseGeocode({
        coords: clickLatLng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
      }, function (status, response) {
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
    if (!newMap || !inputAddress) return;

    naver.maps.Service.geocode({
      query: inputAddress,
    }, function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("주소 검색 결과가 없습니다.");
      }
      const result = response.v2,
        items = result.addresses;
        point = new naver.maps.LatLng(items.y, items.x);
      console.log("검색 결과", items)

      //검색 마커
      // 이전에 생성된 마커가 있다면 제거합니다.
    if (newMarker) {
      newMarker.setMap(null);
    }

    // 새 마커를 생성하고 지도에 표시합니다.
    let searchMarker = new naver.maps.Marker({
      position: point,
      map: newMap
    });


      // const inputLatLng = new naver.maps.LatLng(items[0].y, items[0].x);
      // console.log("inputLatLng", inputLatLng)

      // let searchMarker = newMarker || new naver.maps.Marker({
      //   position: inputLatLng,
      //   map: newMap
      // })
      // searchMarker.setPosition(inputLatLng);
      setNewMarker(searchMarker);
      newMap.setCeter(point);
      setLocation({ lat: items.y, lng: items.x });

    });
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // console.log("keydown", handleKeyDown)
      handleSearch();
    }
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
                <input type='text' value={inputAddress} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='주소 입력' />
                <button onClick={handleSearch}><CiSearch /></button>
              </div>
              <div>위·경도 {location.lat} / {location.lng}</div>
            </div>
            <div className='py-7 pl-3'>관리구역</div>
            <FormSection labelLeft="관리번호" labelRight="설치장소 메모" />
            <FormSection labelLeft="기구ID" labelRight="제어기ID" />
            <FormSection labelLeft="어닝 열림시간 - 좌(초)" labelRight="어닝 열림시간 - 우(초)" />
            <FormSection labelLeft="풍속 임계값" labelRight="어닝 재열림 시간(분)" />
            <FormSection labelLeft="설치일자" labelRight="계약만료기간" />
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