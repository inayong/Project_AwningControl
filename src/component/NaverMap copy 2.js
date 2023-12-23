import React, { useEffect } from 'react';

const NaverMap = ({ mapData, showMarker, lat, lng, width, height}) => {
    const { naver } = window;

    useEffect(() => {

        const mapCenter = mapData && mapData.length > 0
        ? new naver.maps.LatLng(mapData[0].latitude, mapData[0].longitude)
        : new naver.maps.LatLng(lat, lng);
        
        
        const mapOptions = {
            center: mapCenter,
            zoom: 15
        };
        const map = new naver.maps.Map('map', mapOptions);

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
    }, [mapData, showMarker, lat, lng])

    return (
        <div className='flex'>
            <div id="map" style={{ width: width, height: height }}></div>
        </div>
    )
}

export default NaverMap;