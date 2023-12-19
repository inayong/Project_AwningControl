import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');    

    //지도 불러오기
    useEffect(() => {
        const navermaps = window.naver.maps;

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

        const searchCoordinateToAddress = (latlng) => {
            infoWindow.close();

            navermaps.Service.reverseGeocode({
                coords: latlng,
                orders: [
                    navermaps.Service.OrderType.ADDR,
                    navermaps.Service.OrderType.ROAD_ADDR 
                ].join(',')
            }, function(status, response) {
                if (status === navermaps.Service.Status.ERROR) {
                    return alert('Wrong!');
                }

                const items = response.v2.results,
                    address = '',
                    htmlAddresses = [];

                for (const i=0, ii=items.length, item, addrType; i<ii; i++) {
                    item = items[i];
                    address = makeAddress(item) || '';
                    addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

                    htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
                }

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                    htmlAddresses.join('<br />'),
                    '</div>'
                ].join('\n'));

                infoWindow.open(map, latlng);
            })
        }


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