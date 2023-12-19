import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');    

    //지도 불러오기
    useEffect(() => {
        // const container = document.getElementById('map');
        const navermaps = window.naver.maps;
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

        const infoWindow = new navermaps.InfoWindow({
            anchorSkew: true
        });
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
                // console.log("배열", items)
                // console.log("주소", address)
                setClickAddress(address);
                console.log("click", address.jibunAddress);
            })
        });

        // 불정로 6 주소나옴
        //주소->좌표
        navermaps.Service.geocode({
            query: '수림로 71'
        }, function(status, response) {
            if (status !== navermaps.Service.Status.OK) {
                return alert('Something wrong!');
            }
            const result = response.v2,
                items = result.addresses;
                console.log("불",items)
        })

        // 좌표-> 주소
        // navermaps.Service.reverseGeocode({
        //     coords: new navermaps.LatLng(37.3595704, 127.105399),
        // }, function(status, response) {
        //     if (status !== navermaps.Service.Status.OK) {
        //         return alert('Something wrong!');
        //     }
        //     const result = response.v2,
        //     items = result.results,
        //     address = result.addresses;
        //     console.log("배열", items)
        //     console.log("주소", address)
        // })

    }, []);

  return (
    <div>
        <div>MainMap</div>
        <div id="map" style={{ width:'100%', height:'400px' }}></div>
        <div>위도: {location.lat}, 경도: {location.lng}</div>
    </div>
  )
}

export default MainMap;