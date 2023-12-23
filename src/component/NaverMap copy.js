import React, { useEffect } from 'react';

const NaverMap = ({ mapData, showMarker}) => {
    const { naver } = window;

    useEffect(() => {
        if (mapData && mapData.length > 0) {
            const map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(mapData[0].latitude, mapData[0].longitude),
                zoom: 15
            });

            if (showMarker) {
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
                    }
                });
            }
        }
    }, [mapData, showMarker])

    return (
        <div className='flex'>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
        </div>
    )
}

export default NaverMap;