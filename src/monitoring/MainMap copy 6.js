import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';

const MainMap = () => {
    const { naver } = window;

    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState(null);

    //지도 불러오기
    useEffect(() => {
        const mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10,
        };
        // const map = new window.naver.maps.Map(container, options);
        const newMap = new naver.maps.Map('map', mapOptions);
        // setMap(newMap);


        naver.maps.Event.addListener(newMap, 'click', function (e) {
            const clickLatLng = e.coord; //좌표

            if (!markers) {
                const marker = new naver.maps.Marker({
                    position: clickLatLng,
                    map: newMap //마커를 맵에 추가
                });
                setMarkers(marker);
            } else {

                markers.setPosition(clickLatLng);
            }
            // setMarker(newMarker);


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

                setClickAddress(address);
                console.log("click", address);
            });
        });

    }, [naver]);





    return (
        <div className='flex'>
            <div id="map" style={{ width: '100%', height: '100dvb' }}></div>
        </div>
    )
}

export default MainMap;