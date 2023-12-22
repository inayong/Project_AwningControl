import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const { naver } = window;

    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    // const [map, setMap] = useState(null);
    // const [markers, setMarkers] = useState(null);
    const [mapData, setMapData] = useState();


    const getData = () => {
        // console.log("token", localStorage.getItem("token"))
        fetch("http://10.125.121.206:8080/user/map", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setMapData(data);
                console.log("map", data)
            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getData();
    }, [])

    // const latMarker = mapData.map((item) => item.latitude);
    // console.log("latMarker",latMarker);
    // const lngMarker = mapData.map((item) => item.longitude);
    // console.log("lngMarker",lngMarker);

    //지도 불러오기
    useEffect(() => {
        //나중에 마커 찍고 그 중앙으로 포지션 잡기
        if (mapData && mapData.length > 0) {

            // const position = new naver.maps.LatLng(latMarker[0], lngMarker[0]);

            const map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(mapData[0].latitude, mapData[0].longitude),
                zoom: 15
            });

            mapData.forEach(item => {
                const position = new naver.maps.LatLng(item.latitude, item.longitude);
                const marker = new naver.maps.Marker({
                    position: position,
                    map: map,
                    icon: {
                        url: "https://i.ibb.co/59GrrwW/location-pin-blue.png",
                        size: new naver.maps.Size(16, 16),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(8, 8)
                    }
                });

            });
        }
    }, [mapData]);





    return (
        <div className='flex'>
            <div id="map" style={{ width: '100%', height: '100dvb' }}></div>
        </div>
    )
}

export default MainMap;