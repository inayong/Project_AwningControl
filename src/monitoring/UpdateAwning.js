import React, { useEffect, useRef, useState } from 'react'
import { SigunguData } from '../data/SigunguData';

const FormSection = ({ labelLeft, labelRight, leftRef, rightRef, leftValue, rightValue, leftName, rightName, leftChange, rightChange }) => {
    return (
        <div className='flex py-4 pl-3 w-full'>
            <div className='flex flex-col w-1/2'>
                <div className=''>{labelLeft}</div>
                <input className='w-48' name={leftName} ref={leftRef} value={leftValue} onChange={leftChange}></input>
            </div>
            <div className='flex flex-col w-1/2'>
                <div className=''>{labelRight}</div>
                <input className='w-48' name={rightName} ref={rightRef} value={rightValue} onChange={rightChange}></input>
            </div>
        </div>
    );
};

const UpdateAwning = ({ data, onClose }) => {
    const [formData, setFormData] = useState(data);

    const { naver } = window;
    const { sigungu, si } = SigunguData();
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [searchLocation, setSearchLocation] = useState({ lat: 0, lng: 0 });
    const [displayLocation, setDisplayLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [displayAddress, setDisplayAddress] = useState('');
    const [installDate, setInstallDate] = useState(''); //유효한 기본값 제공해아함
    const [expireDate, setExpireDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [changedFields, setChangedFields] = useState([]);
    const markerRef = useRef();

    const manageNum = useRef();
    const locationMemo = useRef();
    const deviceId = useRef();
    const controlId = useRef();
    const openLeft = useRef();
    const openRight = useRef();
    const windThreshold = useRef();
    const awningReopen = useRef();

    const selSiRef = useRef();
    const selGuRef = useRef();
    // const [guSel, setGuSel] = useState([]);
    const [guSel, setGuSel] = useState(() => {
        if (formData.managementArea1) {
            const initialSi = formData.managementArea1;
            const filteredGu = sigungu
                .filter(item => item.address.split(" ")[0] === initialSi)
                .map(item => item.address.split(" ")[1]);
            return [...new Set(filteredGu)].sort();
        }
        return [];
    });

    const [selectSi, setSelectSi] = useState('');
    const [selectGu, setSelectGu] = useState('');

    const handleMapClick = (lat, lng) => {
        setLocation({ lat, lng });
        setDisplayLocation({ lat, lng })
    }

    useEffect(() => {

        const position = new naver.maps.LatLng(formData.latitude, formData.longitude);

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

            setLocation({ lat: clickLatLng.y, lng: clickLatLng.x })
            // console.log("location", location)
            marker.setPosition(clickLatLng);
            // setNewMarker(marker);
            console.log("clickLatLng", clickLatLng)

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
        markerRef.current = marker;
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

    //select
    const handleSelSi = (event) => {
        const selectedSi = event.target.value;
        setSelectSi(selectedSi);
        setFormData(prevFormData => ({
            ...prevFormData,
            managementArea1: selectedSi,
            managementArea2: '' // "구" 선택을 초기화
        }));

        const filteredGu = sigungu
            .filter(item => item.address.split(" ")[0] === selectedSi)
            .map(item => item.address.split(" ")[1]);
        const selGu = [...new Set(filteredGu)].sort();
        setGuSel(selGu);
    };

    console.log("data.managementArea1", data.managementArea1)

    const handleSelGu = (event) => {
        setSelectGu(selGuRef.current.value);
        const selectedGu = event.target.value;
        setSelectGu(selectedGu);

        // formData 상태 업데이트
        setFormData(prevFormData => ({
            ...prevFormData,
            managementArea2: selectedGu
        }));
    }


    const installedDate = formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : '';
    const expiredDate = formData.finishDate ? new Date(formData.finishDate).toISOString().split('T')[0] : '';


    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // console.log("location", location)
    // console.log("displayLocation", displayLocation)
    // console.log("formData", formData)
    // console.log("displayAddress", displayAddress)
    // console.log("formDatalatitude", formData.latitude)
    // console.log("formDatalongitude", formData.longitude)
    console.log("formDataArea2", formData.managementArea2)
    console.log("DataArea2", data.managementArea2)


    const locationReset = () => {
        setDisplayLocation({ lat: 0, lng: 0 });
        setLocation({ lat: 0, lng: 0 });
        setDisplayAddress('');

        const position = new naver.maps.LatLng(formData.latitude, formData.longitude);
        // 마커의 위치를 새로운 위치로 설정
        if (markerRef.current) {
            markerRef.current.setPosition(position);
        }
    }


    const handleUpdateSubmit = () => {
        fetch("http://10.125.121.206:8080/admin/device/mod", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => {
                if (resp.ok) {
                    alert("장치 수정 완료")
                    setConfirmModal(false);
                    setShowModal(false);
                    window.location.reload();
                } else {
                    alert("장치 수정 실패")
                }
            })
            .catch((err) => {
                console.log("장치 수정 중 오류:", err)
            })
    };

    const fieldNames = {
        awningOpenTimeLeft: "어닝 열림시간 - 좌",
        awningOpenTimeRight: "어닝 열림시간 - 우",
        windSpeedThreshold: "풍속 임계값",
        latitude: "위도",
        longitude: "경도",
        awningReopenTimeMinutes: "어닝 재열림 시간",
        controlId: "제어기ID",
        deviceId: "기구ID",
        finishDate: "계약만료기간",
        startDate: "설치일자",
        installationLocationMemo: "설치장소",
        managementNumber: "관리번호",
        managementArea1: "관리구역",
        managementArea2: "관리구역"
    };

    const contentChange = () => {
        const changes = Object.keys(formData).filter(key => formData[key] !== data[key]);
        const uniqueChanges = new Set(changes.map(key => fieldNames[key] || key));
        return Array.from(uniqueChanges)
    }

    const updateConfirm = () => {
        if (formData.managementArea1 && !formData.managementArea2) {
            alert("관리구역에서 '구'를 선택해주세요.")
            return;
        }

        const changes = contentChange();
        if (changes.length > 0) {
            setConfirmModal(true);
            setChangedFields(changes);
        } else {
            alert("수정 항목이 없습니다.")
        }
        
    }

    const confirmCancle = () => {
        setConfirmModal(false);
    }





    return (
        <div className='bg-slate-200 flex h-full flex-col'>
            <div id="map" style={{ width: '100%', height: '200px' }} className='border-4'></div>
            <div>
                <div className='flex'>
                    <div className='flex'>
                        <div>주소</div>
                        <input type='text' value={inputAddress} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='주소 입력' />
                    </div>
                    <div>
                        {displayAddress.roadAddress || displayAddress.jibunAddress}
                    </div>
                </div>
                <div>
                    위/경도 {displayLocation.lat === 0 ? formData.latitude : displayLocation.lat} / {displayLocation.lng === 0 ? formData.longitude : displayLocation.lng}
                    {displayLocation.lat !== 0 && (
                        <button onClick={locationReset}>reset</button>
                    )}
                </div>
                {/* <div> */}
                <div className='flex'>
                    <div>관리번호</div>
                    <input type='text' name='managementNumber' ref={manageNum} value={formData.managementNumber} onChange={handleFormChange} />
                </div>

                <div className='pr-3 flex pt-3'>
                    <div>관리구역</div>
                    <select onChange={handleSelSi} name='managementArea1' ref={selSiRef} value={formData.managementArea1} className='w-32 mr-3'>
                        <option value=''>시</option>
                        {si.map((items) => (
                            <option key={items}>{items}</option>
                        ))}
                    </select>
                    <select onChange={handleSelGu} name='managementArea2' ref={selGuRef} value={formData.managementArea2} className='w-32 mr-3'>
                        <option value=''>구</option>
                        {guSel.map((items) => (
                            <option key={items}>{items}</option>
                        ))}
                    </select>
                </div>
                {/* </div> */}
                <FormSection labelLeft="기구ID" leftName="deviceId" leftRef={deviceId} leftValue={formData.deviceId} leftChange={handleFormChange} labelRight="제어기ID" rightName="controlId" rightRef={controlId} rightValue={formData.controlId} rightChange={handleFormChange} />
                <FormSection labelLeft="어닝 열림시간 - 좌(초)" leftName="awningOpenTimeLeft" leftRef={openLeft} leftValue={formData.awningOpenTimeLeft} leftChange={handleFormChange} labelRight="어닝 열림시간 - 우(초)" rightName="awningOpenTimeRight" rightRef={openRight} rightValue={formData.awningOpenTimeRight} rightChange={handleFormChange} />
                <FormSection labelLeft="풍속 임계값" leftName="windSpeedThreshold" leftRef={windThreshold} leftValue={formData.windSpeedThreshold} leftChange={handleFormChange} labelRight="어닝 재열림 시간(분)" rightName="awningReopenTimeMinutes" rightRef={awningReopen} rightValue={formData.awningReopenTimeMinutes} rightChange={handleFormChange} />
                <div>
                    <div>설치장소</div>
                    <input name='installationLocationMemo' value={formData.installationLocationMemo} onChange={handleFormChange} />
                </div>
                <div className='flex'>
                    <div className='flex flex-col w-1/2'>
                        <div className=''>설치일자</div>
                        <input name='startDate' type='date' value={installedDate} onChange={handleFormChange} className='w-48'></input>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <div className=''>계약만료기간</div>
                        <input type='date' name='finishDate' value={expiredDate} onChange={handleFormChange} className='w-48'></input>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4 pt-3">
                <button onClick={updateConfirm} className="px-3 py-1 bg-red-500 text-white rounded-md">수정</button>
                {confirmModal && (
                    <div className="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-25 flex justify-center items-center py-14">
                        <div className="bg-white p-3 rounded-md">
                            {changedFields && changedFields.map((item, idx) => (
                            <div key={idx}>{item}</div>
                            ))}
                            <div>수정하시겠습니까?</div>
                            <button onClick={handleUpdateSubmit} className="px-3 py-1 bg-red-500 text-white rounded-md">확인</button>
                            <button onClick={confirmCancle} className="ml-4 px-3 py-1 bg-gray-300 rounded-md">취소</button>
                        </div>
                    </div>
                )}
                <button onClick={onClose} className="ml-4 px-3 py-1 bg-gray-300 rounded-md">취소</button>
            </div>
        </div>
    )
}

export default UpdateAwning;