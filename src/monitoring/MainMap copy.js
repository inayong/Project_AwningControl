import React, { useEffect, useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { NotiMapState } from '../sidebar/NotiMapState';

const MainMap = () => {
    const { naver } = window;

    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    // const [map, setMap] = useState(null);
    // const [markers, setMarkers] = useState(null);
    const [mapData, setMapData] = useState();
    const setSettingOpen = useRecoilState(NotiMapState);


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


    //지도 불러오기
    useEffect(() => {
        //나중에 마커 찍고 그 중앙으로 포지션 잡기
        if (mapData && mapData.length > 0) {

            // const position = new naver.maps.LatLng(latMarker[0], lngMarker[0]);

            const map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(mapData[0].latitude, mapData[0].longitude),
                zoom: 10
            });

            

            mapData.forEach(item => {
                const position = new naver.maps.LatLng(item.latitude, item.longitude);


                let markerUrl;
                if (item.statusConnected === 'off') {
                    markerUrl = 'https://i.ibb.co/q7C4qH8/location-pin-red.png';
                } else if (item.statusAwningExpand === 'on') {
                    markerUrl = 'https://i.ibb.co/ZK3jNk4/location-pin-green.png';
                } else if (item.statusAwningExpand === 'off') {
                    markerUrl = 'https://i.ibb.co/FDd05PD/location-pin-blue.png';
                }

                if (markerUrl) {
                    const marker = new naver.maps.Marker({
                        position: position.destinationPoint(90, 15),
                        map: map,
                        icon: {
                            content: `<div style="width: 40px; height: 40px; background-image: url('${markerUrl}'); background-size: cover;"></div>`, //64px
                            anchor: new naver.maps.Point(16, 32)
                        }
                    });

                    naver.maps.Event.addListener(map, "click", () => {
                        setSettingOpen(true);
                    })
                }

            });
        }
    }, [mapData, setSettingOpen]);





    return (
        <div className='flex'>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            <div className='absolute bottom-10 right-10 z-10 w-32 h-32 bg-white flex flex-col justify-center items-center'>
                <div className='flex items-center justify-center w-full'>
                    <FaCircle size={25} className='fill-emerald-500' />
                    <div className='text-lg pl-5'>열림</div> 
                </div>
                <div className='flex items-center justify-center w-full py-2'>
                    <FaCircle size={25} className='fill-blue-500' />
                    <div className='text-lg pl-5'>닫힘</div> 
                </div>
                <div className='flex items-center justify-center w-full'>
                    <FaCircle size={25} className='fill-red-500' />
                    <div className='text-lg pl-5'>끊김</div> 
                </div>
            </div>
        </div>
    )
}

export default MainMap;