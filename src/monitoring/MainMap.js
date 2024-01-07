import React, { useEffect, useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { NotiMapState } from '../sidebar/NotiMapState';
import { SidebarState } from '../sidebar/SidebarState';
import DetailBar from '../sidebar/DetailBar';
import { DetailBarState } from '../sidebar/DetailBarState';

const MainMap = ({ mapData }) => {
    const { naver } = window;

    // const [mapData, setMapData] = useState();
    const [markerOpen, setMarkerOpen] = useRecoilState(NotiMapState);
    const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);

    const [detailMapData, setDetailMapData] = useState();

    // const getData = () => {
    //     // console.log("token", localStorage.getItem("token"))
    //     fetch("http://10.125.121.206:8080/user/map", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": localStorage.getItem("token")
    //         }
    //     })
    //         .then(resp => resp.json())
    //         .then(data => {
    //             setMapData(data);
    //             console.log("map", data)
    //         })
    //         .catch(err => console.error(err))
    // }
    useEffect(() => {
        setMarkerOpen({isOpen: false, isOpen2: false})
        // getData();

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
                    markerUrl = 'https://i.ibb.co/5MqN3j7/location-pin-red-64.png';
                } else if (item.statusAwningExpand === 'on') {
                    markerUrl = 'https://i.ibb.co/nr90vdz/location-pin-green-64.png';
                } else if (item.statusAwningExpand === 'off') {
                    markerUrl = 'https://i.ibb.co/4V14zHY/location-pin-blue-64.png';
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

                    naver.maps.Event.addListener(marker, "click", () => {
                        setMarkerOpen({isOpen: true, markerData: item});
                        setIsDetailBar(true);
                        setDetailMapData(item);
                        // console.log("isOpen",markerOpen);
                        // console.log("item",item);
                    })
                }

            });
        }
    }, [mapData, setMarkerOpen]);




    return (
        <div className='flex flex-col h-screen'>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            {isDetailBar && detailMapData && (
                <div className='h-72'>
                    <DetailBar markerData={detailMapData} />
                </div>
            )}
        </div>
    )
}

export default MainMap;