import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');    
    const [inputAddress, setInputAddress] = useState('');
    const navermaps = window.naver.maps;
    //지도 불러오기
    useEffect(() => {
        // const container = document.getElementById('map');
        // const navermaps = window.naver.maps;
        const mapOptions = {
            center: new navermaps.LatLng(37.3595704, 127.105399),
            zoom: 10,
        };
        // const map = new window.naver.maps.Map(container, options);
        const map = new navermaps.Map('map', mapOptions);

        navermaps.Event.addListener(map, 'click', function(e) {
            const clickLatLng = e.coord; //좌표

            // const lat = clickLatLng._lat;
            // const lng = clickLatLng._lng;
            const lat = clickLatLng.y; //위도
            const lng = clickLatLng.x; //경도

            setLocation({ lat, lng });

        // const infoWindow = new navermaps.InfoWindow({
        //     anchorSkew: true
        // });
        // map.setCursor('pointer');

            //좌표 -> 주소
            navermaps.Service.reverseGeocode({
                coords: clickLatLng,
            }, function(status, response) {
                if (status !== navermaps.Service.Status.OK) {
                    return alert('Something wrong!');
                }
                const result = response.v2, // 검색 결과의 컨테이너
                items = result.results, // 검색 결과의 배열
                address = result.address; // 검색 결과로 만든 주소
                console.log("배열", items)
                console.log("주소", address)
                setClickAddress(address);
                console.log("click", address.jibunAddress);
                // console.log("cc", response.v2.addresses[0])
            })
        });

        

    }, []);

    const handleSearch = () => {
        navermaps.Service.geocode({
            query: inputAddress
        }, function(status, response) {
            if (status !== navermaps.Service.Status.OK) {
                return alert('Something wrong!');
            }
            const result = response.v2,
                items = result.addresses;
                console.log("검색 결과",items)
        });
    };

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