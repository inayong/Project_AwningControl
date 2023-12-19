import React, { useEffect, useState } from 'react';

const MainMap = () => {
    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    // const [clickAddress, setClickAddress] = useState('');    
    // const [map, setMap] = useState();

    const searchAddress = (map, address) => {
        const navermaps = window.naver.maps;
        if (!map) return;

        navermaps.Service.geocode({
            query: address
        }, function(status, response) {
            if (status === navermaps.Service.Status.ERROR) {
                return alert('주소를 찾을 수 없음');
            }

            if (response.v2.meta.totalCount === 0) {
                return alert('검색 결과가 없음');
            }

            const item = response.v2.addresses[0];
            const point = new navermaps.Point(item.x, item.y);
            map.setCenter(point);
        });
    };

    //지도 불러오기
    useEffect(() => {
        const navermaps = window.naver.maps;

        const mapOptions = {
            center: new navermaps.LatLng(37.3595704, 127.105399),
            zoom: 15,
            mapTypeControl: true
        };
        const map = new navermaps.Map('map', mapOptions);

        const input = document.getElementById('address-input');
        input.addEventListener('input', (e) => {
            searchAddress(map, e.target.value);
        });

        // const infoWindow = new navermaps.InfoWindow({
        //     anchorSkew: true
        // });
        // map.setCursor('pointer');

        


            //좌표 -> 주소
            // navermaps.Service.reverseGeocode({
            //     coords: clickLatLng,
            // }, function(status, response) {
            //     if (status !== navermaps.Service.Status.OK) {
            //         return alert('Something wrong!');
            //     }
            //     const result = response.v2, // 검색 결과의 컨테이너
            //     items = result.results, // 검색 결과의 배열
            //     address = result.address; // 검색 결과로 만든 주소
            //     // console.log("배열", items)
            //     // console.log("주소", address)
            //     setClickAddress(address);
            //     console.log("click", address.jibunAddress);
            // })
        // });

        

    }, []);

  return (
    <div>
        <div>MainMap</div>
        <input
                id="address-input"
                type="text"
                placeholder="주소를 입력하세요"
            />
        <div id="map" style={{ width:'100%', height:'400px' }}></div>
        {/* <div>위도: {location.lat}, 경도: {location.lng}</div> */}

    </div>
  )
}

export default MainMap;