import React, { useEffect } from 'react';

const NaverMap = ({ width, height }) => {
    const { naver } = window;

    useEffect(() => {

        const position = new naver.maps.LatLng(37.3595704, 127.105399);

        const map = new naver.maps.Map('map', {
            center: position,
            zoom: 10
        });

    }, [width, height])

    return (
        <div className='flex'>
            <div id="map" style={{ width: width, height: height }}></div>
        </div>
    )
}

export default NaverMap;