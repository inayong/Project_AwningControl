import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const { naver } = window;

    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    // const [map, setMap] = useState(null);
    // const [markers, setMarkers] = useState(null);

    //지도 불러오기
    useEffect(() => {
        //나중에 마커 찍고 그 중앙으로 포지션 잡기
        const position = new naver.maps.LatLng(37.3595704, 127.105399);

        const map = new naver.maps.Map('map', {
            center: position,
            zoom: 15
        });

        const marker = new naver.maps.Marker({
            position: position,
            map: map
        });

        naver.maps.Event.addListener(map, 'click', function (e) {
            const clickLatLng = e.coord; //좌표

            marker.setPosition(clickLatLng);


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