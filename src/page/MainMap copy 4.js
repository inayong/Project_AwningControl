import React, { useEffect, useState } from 'react';

const MainMap = () => {
    //지도 불러오기
    useEffect(() => {
        const navermaps = window.naver.maps;
        const initializeMap = () => {
    
        const mapOptions = {
            center: new navermaps.LatLng(37.3595704, 127.105399),
            zoom: 15,
            mapTypeControl: true
        };
        const map = new navermaps.Map('map', mapOptions);

        const infoWindow = new navermaps.InfoWindow({
            anchorSkew: true
        });
    
        map.setCursor('pointer');

        // map.addListener('click', (e) => {
        //     searchCoordinateToAddress(e.coord);
        // });

        // searchCoordinateToAddress('정자동 178-1');

        function searchCoordinateToAddress(latlng) {
            infoWindow.close();

            navermaps.Service.reverseGeocode({
                coords: latlng,
                orders: [
                    navermaps.Service.OrderType.ADDR,
                    navermaps.Service.OrderType.ROAD_ADDR
                ].join(',')
            }, function(status, response) {
                if (status === navermaps.Service.Status.ERROR) {
                    return alert('wrong!');
                }

                const items = response.v2.results,
                address = '',
                htmlAddresses = [];

                for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
                    item = items[i];
                    address = makeAddress(item) || '';
                    addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

                    htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
                }

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                    htmlAddresses.join('<br />'),
                    '<div />'
                ].join('\n'));

                infoWindow.open(map, latlng);
            });
        }

        function searchAddressToCoordinate(address) {
            navermaps.Service.geocode({
                query: address
            }, function(status, response) {
                if (status === navermaps.Service.Status.ERROR) {
                    return alert("wrong");
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('totalCount' + response.v2.meta.totalCount);
                }

                const htmlAddresses = [],
                    item = response.v2.addresses[0],
                    point = new navermaps.Point(item.x, item.y);

                if (item.roadAddress) {
                    htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
                }

                if (item.jibunAddress) {
                    htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
                }

                if (item.englishAddress) {
                    htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
                }

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
                    htmlAddresses.join('<br />'),
                    '<br />'
                ].join('\n'));

                map.setCenter(point);
                infoWindow.open(map, point);
            })
        }

        function initGeocoder() {
            map.addListener('click', function(e) {
                searchCoordinateToAddress(e.coord);
            });

            const handleKeydown = (e) => {
                if (e.key === 'Enter') {
                    searchAddressToCoordinate(e.target.value)
                }
            }
        }


    };

    if (window.naver && navermaps) {
        initializeMap();
    } else {
        document.addEventListener('naverMapsLoaded', initializeMap);
    }

    return () => {
        document.removeEventListener('naverMapsLoaded', initializeMap);
    }
        
    }, []);

    // const searchAddress = (map, address) => {
    //     const navermaps = window.naver.maps;
    //     if (!map) return;

    //     navermaps.Service.geocode({
    //         query: address
    //     }, function(status, response) {
    //         if (status === navermaps.Service.Status.ERROR) {
    //             return alert('주소를 찾을 수 없음');
    //         }

    //         if (response.v2.meta.totalCount === 0) {
    //             return alert('검색 결과가 없음');
    //         }

    //         const item = response.v2.addresses[0];
    //         const point = new navermaps.Point(item.x, item.y);
    //         map.setCenter(point);
    //     });
    // };


  return (
    <div>
        <div>MainMap</div>
        <input
            id="address-input"
            type="text"
            placeholder="주소를 입력하세요"
            onKeyDown={handleKeydown}
        />
        <button id='search-button'>검색</button>
        <div id="map" style={{ width:'100%', height:'400px' }}></div>
        {/* <div>위도: {location.lat}, 경도: {location.lng}</div> */}

    </div>
  )
}

export default MainMap;