import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });    

    useEffect(() => {
        // const container = document.getElementById('map');
        const mapOptions = {
            center: new window.naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10,
        };
        // const map = new window.naver.maps.Map(container, options);
        const map = new window.naver.maps.Map('map', mapOptions);

        window.naver.maps.Event.addListener(map, 'click', function(e) {
            const clickLatLng = e.coord;

            const lat = clickLatLng._lat;
            const lng = clickLatLng._lng;

            setLocation({lat, lng});
        });
    }, []);
    // naver.maps.onJSContentLoaded = initGeocoder;

  return (
    <div>
        <div>MainMap</div>
        <div id="map" style={{ width:'100%', height:'400px' }}></div>
        <div>위도: {location.lat}, 경도: {location.lng}</div>
    </div>
  )
}

export default MainMap;