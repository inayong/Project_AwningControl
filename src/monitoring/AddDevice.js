import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { SigunguData } from '../data/SigunguData';


const FormSection = ({ labelLeft, labelRight, leftRef, rightRef }) => {
  return (
    <div className='flex py-4 pl-3 w-full'>
      <div className='flex flex-col w-1/2'>
        <div className=''>{labelLeft}</div>
        <input className='w-48' ref={leftRef}></input>
      </div>
      <div className='flex flex-col w-1/2'>
        <div className=''>{labelRight}</div>
        <input className='w-48' ref={rightRef}></input>
      </div>
    </div>
  );
};

const AddDevice = () => {
  const { naver } = window;
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [searchLocation, setSearchLocation] = useState({ lat: 0, lng: 0 });
  const [displayLocation, setDisplayLocation] = useState({ lat: 0, lng: 0 });
  const [clickAddress, setClickAddress] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [displayAddress, setDisplayAddress] = useState('');
  // const [date, setDate] = useState(new Date());
  const [installDate, setInstallDate] = useState(''); //유효한 기본값 제공해아함
  const [expireDate, setExpireDate] = useState('');

  const handleMapClick = (lat, lng) => {
    setLocation({ lat, lng });
    setDisplayLocation({ lat, lng })
  }

  useEffect(() => {

    const position = new naver.maps.LatLng(37.3595704, 127.105399);

    const map = new naver.maps.Map('map', {
      center: position,
      zoom: 10
    });
    // setNewMap(map);

    const marker = new naver.maps.Marker({
      position: position,
      map: map
    });

    // let marker = null;

    naver.maps.Event.addListener(map, 'click', function (e) {
      const clickLatLng = e.coord;
      handleMapClick(clickLatLng.y, clickLatLng.x);
      // const lat = clickLatLng.y;
      // const lng = clickLatLng.x;

      // let marker = newMarker || new naver.maps.Marker({
      //   position: clickLatLng,
      //   map: map
      // })

      // setLocation({ lat, lng });
      setLocation({ lat: clickLatLng.y, lng: clickLatLng.x })
      // console.log("location", location)
      marker.setPosition(clickLatLng);
      // setNewMarker(marker);

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
        setDisplayAddress(address);
      });
    });

  }, [])

  const handleSearch = () => {
    naver.maps.Service.geocode({
      query: inputAddress
    }, function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("wrong");
      }
      const result = response.v2,
        items = result.addresses;
      console.log("검색 결과", items)

      if (items.length > 1) {
        alert("주소를 정확히 입력해주세요.")
        return;
      }

      if (items.length === 1) {
        setSearchLocation({ lat: items[0].y, lng: items[0].x });
        setDisplayLocation({ lat: items[0].y, lng: items[0].x });
        setSearchAddress(items)
        setDisplayAddress(items[0])
      }
    });
    // console.log("searchLocation", searchLocation)
    console.log("displayAddress", displayAddress)
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleInstallDateChange = (e) => {
    setInstallDate(e.target.value)
    // console.log("iidate", e.target.value)
  }
  // console.log("iidate", installDate);
  const handleExpireDateChange = (e) => {
    setExpireDate(e.target.value)
    // console.log("eedate", e.target.value)
  }

  //select
  const { sigungu, si, gun, gu } = SigunguData();
  const selSiRef = useRef();
  const selGuRef = useRef();
  const selDongRef = useRef();
  const [siSel, setSiSel] = useState([]);
  const [guSel, setGuSel] = useState([]);
  const [dongSel, setDongSel] = useState([]);
  //초기화
  const [selectedSi, setSelectedSi] = useState('');
const [selectedGu, setSelectedGu] = useState('');
const [selectedDong, setSelectedDong] = useState('');

  const handleSelSi = () => {
    // console.log("selref", selSiRef.current.value)
    const selectSi = selSiRef.current.value;
    
    const selgufil = sigungu
      .filter((items) => items.address.split(" ")[0] === selectSi)
      .map((item) => item.address.split(" ")[1]);

    const selGu = [...new Set(selgufil)];
    setGuSel(selGu);
    // console.log("selsi", siSel)
    setSelectedSi(selSiRef.current.value)
    setSelectedGu('');
    setSelectedDong('');
  }

  const handleSelGu = () => {
    const selectSi = selSiRef.current.value;
    const selectGu = selGuRef.current.value;

    const seldongfil = sigungu
      .filter((items) => items.address.split(" ")[0] === selectSi
        && items.address.split(" ")[1] === selectGu)
      .map((item) => item.address.split(" ")[2]);

    const selDong = [...new Set(seldongfil)];
    setDongSel(selDong);
    setSelectedGu(selGuRef.current.value);
    setSelectedDong('');
    console.log("selSiRef", selSiRef.current.value)
    console.log("selGuRef", selGuRef.current.value)
  }

  // const handleSelDong = () => {
  //   setSelectedDong(selDongRef.current.value);
  // }

  //fetch
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLogitude] = useState('');
  // const [managementArea1, setManagementArea1] = useState('');
  // const [managementArea2, setManagementArea2] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [finishDate, setFinishDate] = useState('');
  // const [manageNum, setManageNum] = useState('');
  // const [locationMemo, setLocationMemo] = useState('');
  // const [deviceId, setDeviceId] = useState('');
  // const [controlId, setControlId] = useState('');
  // const [openLeft, setOpenLeft] = useState('');
  // const [openRight, setOpenRight] = useState('');
  // const [windThreshold, setWindThreshold] = useState('');
  // const [awningReopen, setAwningReopen] = useState('');
  const manageNum = useRef();
  const locationMemo = useRef();
  const deviceId = useRef();
  const controlId = useRef();
  const openLeft = useRef();
  const openRight = useRef();
  const windThreshold = useRef();
  const awningReopen = useRef();

  const fetchAddDevice = () => {
    fetch("http://10.125.121.206:8080/admin/device/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        'latitude':  displayLocation.lat,
        'longitude': displayLocation.lng,
        'managementArea1': selSiRef.current.value,
        'managementArea2': selGuRef.current.value,
        'managementNumber': manageNum.current.value,
        'installationLocationMemo': locationMemo.current.value,
        'deviceId': deviceId.current.value,
        'controlId': controlId.current.value,
        'awningOpenTimeLeft': openLeft.current.value,
        'awningOpenTimeRight': openRight.current.value,
        'windSpeedThreshold': windThreshold.current.value,
        'awningReopenTimeMinutes': awningReopen.current.value,
        'startDate': installDate,
        'finshDate': expireDate,
      })
    })
      // .then((resp) => {
      //   if (!resp.ok) {
      //     throw new Error(`HTTP error! status: ${resp.status}`);
      //   }
      //   return resp.json();
      // }) 받기로한 json이없으므로 syntax error
      .then(() => {
        console.log("성공")
      })
      .catch((err) => console.error("장치 추가 실패:", err))
    
  }

  // 'startDate': new Date(installDate).toISOString().split('T')[0],
  // 'finshDate': new Date(expireDate).toISOString().split('T')[0],

  const handleSubmit = () => {
    fetchAddDevice();
    console.log("date", new Date(installDate).toISOString().split('T')[0])
    console.log("locationMemo", locationMemo.current.value)
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
          <div className='bg-slate-50 flex-grow w-full'>
            <div className='flex flex-col pt-5 pb-3 pl-3'>
              <div className='flex'>
                <div className='flex w-1/2'>
                  <div className='pr-3'>주소</div>
                  <input type='text' value={inputAddress} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='주소 입력' />
                  <button onClick={handleSearch}><CiSearch /></button>
                </div>
                <div>위·경도 {displayLocation.lat} / {displayLocation.lng}</div>
              </div>
              <div className='flex flex-col'>
                <div className='pt-2 text-sm'>전체 주소</div>
                <div className='text-base text-gray-500 pt-1'>{displayAddress.roadAddress || displayAddress.jibunAddress}</div>
              </div>
            </div>
            <div className='flex pb-6 pt-2 pl-3'>
              <div className='pr-3'>관리구역</div>
              <select onChange={handleSelSi} ref={selSiRef} value={selectedSi} className='w-32 mr-3'>
                <option value=''>시</option>
                {si.map((items) => (
                  <option key={items}>{items}</option>
                ))}
              </select>
              <select onChange={handleSelGu} ref={selGuRef} value={selectedGu} className='w-32 mr-3'>
                <option value=''>구</option>
                {guSel.map((items) => (
                  <option key={items}>{items}</option>
                ))}
              </select>
              {/* <select onChange={handleSelDong} ref={selDongRef} value={selectedDong} className='w-32'>
                <option>동</option>
                {dongSel.map((items) => (
                  <option key={items}>{items}</option>
                ))}
              </select> */}
            </div>
            <FormSection labelLeft="관리번호" leftRef={manageNum} labelRight="설치장소 메모" rightRef={locationMemo}/>
            <FormSection labelLeft="기구ID" leftRef={deviceId} labelRight="제어기ID" rightRef={controlId} />
            <FormSection labelLeft="어닝 열림시간 - 좌(초)" leftRef={openLeft} labelRight="어닝 열림시간 - 우(초)" rightRef={openRight} />
            <FormSection labelLeft="풍속 임계값" leftRef={windThreshold} labelRight="어닝 재열림 시간(분)" rightRef={awningReopen} />
            <div className='flex py-4 pl-3 w-full'>
              <div className='flex flex-col w-1/2'>
                <div className=''>설치일자</div>
                <input type='date' value={installDate} onChange={handleInstallDateChange} className='w-48'></input>
              </div>
              <div className='flex flex-col w-1/2'>
                <div className=''>계약만료기간</div>
                <input type='date' value={expireDate} onChange={handleExpireDateChange} className='w-48'></input>
              </div>
            </div>
          </div>
          <div className='flex justify-center m-1'>
            <button onClick={handleSubmit} className='border mr-3 p-1'>추가</button>
            <button className='border ml-3 p-1'>취소</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDevice;