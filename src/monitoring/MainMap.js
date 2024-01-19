import React, { useEffect, useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { NotiMapState } from '../component/atoms/NotiMapState';
import { SidebarState } from '../component/atoms/SidebarState';
import DetailBar from '../sidebar/DetailBar';
import { DetailBarState } from '../component/atoms/DetailBarState';
import { BiChevronsDown } from "react-icons/bi";
import { CiCircleChevDown } from "react-icons/ci";
import '../css/detailbar.css';
import { DetailMapDataState } from '../component/atoms/DetailMapDataState ';
import { useLocation } from 'react-router-dom';
import { FilterMarkerState } from '../component/atoms/FilterMarkerState';

const MainMap = ({ mapData }) => {
    const { naver } = window;

    // const [mapData, setMapData] = useState();
    const [markerOpen, setMarkerOpen] = useRecoilState(NotiMapState);
    const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);

    const [detailMapData, setDetailMapData] = useState();
    const [mapDataDetail, setMapDataDetail] = useRecoilState(DetailMapDataState);

    const [showControlModal, setShowControlModal] = useState(false);
    const [showReserveModal, setShowReserveModal] = useState(false);

    const markerFilterStatus = useRecoilValue(FilterMarkerState);

    const filterMapData = mapData.filter(item => {
        if (markerFilterStatus === 'all') return true;

        if (markerFilterStatus === 'normal') {
            return item.batteryCondition === 'normal' && item.lightingCondition === 'normal' && item.motorCondition === 'normal' && item.statusConnected !== 'off';
        }

        if (markerFilterStatus === 'failure') {
            return item.batteryCondition !== 'normal' || item.lightingCondition !== 'normal' || item.motorCondition !== 'normal';
        }

        if (markerFilterStatus === 'disconnect') {
            return item.batteryCondition === 'normal' && item.lightingCondition === 'normal' && item.motorCondition === 'normal' && item.statusConnected === 'off';
        }
    });
    
    

    //지도 불러오기
    useEffect(() => {
        //나중에 마커 찍고 그 중앙으로 포지션 잡기
        if (mapData && mapData.length > 0) {

            // const position = new naver.maps.LatLng(latMarker[0], lngMarker[0]);

            const map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(mapData[0].latitude, mapData[0].longitude),
                zoom: 10
            });

            // const markers = [];

            filterMapData.forEach(item => {
                const position = new naver.maps.LatLng(item.latitude, item.longitude);

                //어닝장비 아이콘 표시/정상이면 녹색, 고장이면 노란색, 통신두절이면 적색
                // https://i.ibb.co/ftzFTDR/location-pin-yellow-64.png
                let markerUrl;
                if (item.batteryCondition !== 'normal' || item.lightingCondition !== 'normal' || item.motorCondition !== 'normal') {
                    markerUrl = 'https://i.ibb.co/ftzFTDR/location-pin-yellow-64.png';
                } else if (item.statusConnected === 'off') {
                    markerUrl = 'https://i.ibb.co/5MqN3j7/location-pin-red-64.png';
                } else {
                    markerUrl = 'https://i.ibb.co/nr90vdz/location-pin-green-64.png';
                }
                // else if (item.statusAwningExpand === 'on') {
                //     markerUrl = 'https://i.ibb.co/nr90vdz/location-pin-green-64.png';
                // } else if (item.statusAwningExpand === 'off') {
                //     markerUrl = 'https://i.ibb.co/4V14zHY/location-pin-blue-64.png';
                // }

                if (markerUrl) {
                    const marker = new naver.maps.Marker({
                        // position: position.destinationPoint(90, 15),
                        position: position,
                        map: map,
                        icon: {
                            content: `<div style="width: 40px; height: 40px; background-image: url('${markerUrl}'); background-size: cover;"></div>`, //64px
                            anchor: new naver.maps.Point(16, 32)
                        }
                    });

                    // markers.push(marker);

                    naver.maps.Event.addListener(marker, "click", (e) => {
                        console.log("Marker clicked, moving center to:", position);
                        // map.setCenter(marker.getPosition());
                        // map.setCenter(position);
                        setMarkerOpen({ isOpen: true, markerData: item });
                        setIsDetailBar(true);
                        setDetailMapData(item);
                        setMapDataDetail(item);
                        // console.log("isOpen",markerOpen);
                        console.log("item", item);
                    })
                }

            });
        }
    }, [mapData, filterMapData]);
    // }, [mapData, setMarkerOpen, filterMapData]);

    useEffect(() => {
        setMarkerOpen({ isOpen: false, isOpen2: false })
        // getData();

    }, [])

    //button
    //control button
    // const clickControlButton = () => {
    //     setShowControlModal(true);
    // }

    const location = useLocation();

    useEffect(() => {
        setIsDetailBar(false);
    }, [location])



    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            {isDetailBar ?
                <div className='flex justify-center items-center w-10 rounded-full'>
                    <button className='absolute w-10 h-10 rounded-full bg-transparent text-xl focus:outline-none'>
                        <CiCircleChevDown onClick={() => setIsDetailBar(false)} size={40} className='fill-gray-600' />
                    </button>
                </div> : ''}
            {/* {isDetailBar && mapDataDetail && detailMapData && ( */}
            {isDetailBar && mapDataDetail && (
                <div className='h-72 w-full'>
                    <DetailBar markerData={mapDataDetail} setShowControlModal={setShowControlModal} showControlModal={showControlModal} showReserveModal={showReserveModal} setShowReserveModal={setShowReserveModal} />
                </div>
            )}
        </div>
    )
}

export default MainMap;