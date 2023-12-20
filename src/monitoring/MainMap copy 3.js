import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';

const MainMap = () => {
    const { naver } = window;

    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    //지도 불러오기
    useEffect(() => {
        const mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10,
        };
        // const map = new window.naver.maps.Map(container, options);
        const newMap = new naver.maps.Map('map', mapOptions);
        setMap(newMap);

        naver.maps.Event.addListener(newMap, 'click', function (e) {
            const clickLatLng = e.coord; //좌표
            // console.log("clickLatLng", clickLatLng)
            // const lat = clickLatLng._lat;
            // const lng = clickLatLng._lng;
            // const lat = clickLatLng.y; //위도
            // const lng = clickLatLng.x; //경도

            // setLocation({ lat, lng });

            let newMarker = marker || new naver.maps.Marker({
                position: clickLatLng,
                map: newMap //마커를 맵에 추가
            })
            newMarker.setPosition(clickLatLng);
            newMarker.setPosition(clickLatLng);
            setMarker(newMarker);

            // if (!marker) { // 처음 클릭시
            //     marker = new naver.maps.Marker({ // 마커 생성
            //         position: clickLatLng,
            //         map: map //마커를 맵에 추가
            //     });
            // } else {
            //     marker.setPosition(clickLatLng); //클릭한 위치로 마커 업데이트
            // }


            //좌표 -> 주소
            naver.maps.Service.reverseGeocode({
                coords: clickLatLng,
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR
                ].join(',')
            }, function (status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                    return alert('주소를 찾을 수 없습니다.');
                }
                const result = response.v2, // 검색 결과의 컨테이너
                    items = result.results, // 검색 결과의 배열
                    address = result.address; // 검색 결과로 만든 주소
                // console.log("배열", items)
                // console.log("주소", address)
                setClickAddress(address);
                console.log("click", address);
            });
        });
        //     // Clean-up 함수 - 컴포넌트 언마운트 시 이벤트 리스너 제거
        //     return () => {
        //         naver.maps.Event.removeListener(clickListener);
        //     };
        // }, [naver, map]);

    }, [naver]);

    //button
    const handleSearch = () => {
        if (!map) return;

        naver.maps.Service.geocode({
            query: inputAddress
        }, function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('주소를 찾을 수 없습니다.');
            }
            const result = response.v2,
                items = result.addresses;
            console.log("검색 결과", items)
            // console.log("lat",items[0].y)
            // console.log("lng",items[0].x)
            const inputLatLng = new naver.maps.LatLng(items[0].y, items[0].x);
            console.log("inputLatLng", inputLatLng)

            let newMarker = marker || new naver.maps.Marker({
                position: inputLatLng,
                map: map
            });
            newMarker.setPosition(inputLatLng);
            setMarker(newMarker);
            map.setCenter(inputLatLng);

            // if (!marker) { // 처음 클릭시
            //     marker = new naver.maps.Marker({ // 마커 생성
            //         position: inputLatLng,
            //         map: map //마커를 맵에 추가
            //     });
            // } else {
            //     marker.setPosition(inputLatLng); //클릭한 위치로 마커 업데이트
            // }
            // map.setCenter(inputAddress);

        });
    };

    //input
    const handleInputChange = (e) => {
        setInputAddress(e.target.value);
    }

    //enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className='flex'>
            <div>
                <Sidebar />
            </div>
            <div>
                    <input
                        id='address-input'
                        type='text'
                        placeholder='주소를 입력하세요.'
                        value={inputAddress}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            {/* <div>위도: {location.lat}, 경도: {location.lng}</div> */}
        </div>
    )
}

export default MainMap;