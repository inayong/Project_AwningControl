import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const { naver } = window;

    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');    
    const [inputAddress, setInputAddress] = useState('');

    //지도 불러오기
    useEffect(() => {
        // const container = document.getElementById('map');
        // const navermaps = window.naver.maps;
        const mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10,
        };
        // const map = new window.naver.maps.Map(container, options);
        const map = new naver.maps.Map('map', mapOptions);

        let marker = null;
        
        // 이전 마커 제거하기!!!!!!!!!!!!!!!
        naver.maps.Event.addListener(map, 'click', function(e) {
            const clickLatLng = e.coord; //좌표

            // const lat = clickLatLng._lat;
            // const lng = clickLatLng._lng;
            const lat = clickLatLng.y; //위도
            const lng = clickLatLng.x; //경도

            setLocation({ lat, lng });

            if (!marker) {
                marker = new naver.maps.Marker({
                    position: clickLatLng,
                    map: map
                });
            } else {
                marker.setPosition(clickLatLng);
            }

            // const marker = new naver.maps.Marker({
            //     position: clickLatLng,
            //     map: map
            // });
            // marker.setPosition(clickLatLng)

            //좌표 -> 주소
            naver.maps.Service.reverseGeocode({
                coords: clickLatLng,
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR
                ].join(',')
            }, function(status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                    return alert('Something wrong!');
                }
                const result = response.v2, // 검색 결과의 컨테이너
                items = result.results, // 검색 결과의 배열
                address = result.address; // 검색 결과로 만든 주소
                // console.log("배열", items)
                // console.log("주소", address)
                setClickAddress(address);
                console.log("click", address);
                // console.log("cc", response.v2.addresses[0])
            });
        });

    }, []);

    //button
    const handleSearch = () => {
        naver.maps.Service.geocode({
            query: inputAddress
        }, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }
            const result = response.v2,
                items = result.addresses;
                console.log("검색 결과",items)
        });
    };

    //input
    const handleInputChange = (e) => {
        setInputAddress(e.target.value);
    }

  return (
    <div>
        <div>MainMap</div>
        <input 
            id='address-input'
            type='text'
            placeholder='주소를 입력하세요.'
            value={inputAddress}
            onChange={handleInputChange}
            // onKeyDown={(e) => {
            //     if (e.key === 'Enter') {
            //         handleSearch();
            //     }
            // }}
        />
        <button onClick={handleSearch}>검색</button>
        <div id="map" style={{ width:'100%', height:'400px' }}></div>
        <div>위도: {location.lat}, 경도: {location.lng}</div>
    </div>
  )
}

export default MainMap;