import React, { useEffect, useState } from 'react';

const MainMap = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');    
    const [inputAddress, setInputAddress] = useState('');
    const navermaps = window.naver.maps;
    let infoWindow = null;
    //지도 불러오기
    useEffect(() => {
        // const container = document.getElementById('map');
        // const navermaps = window.naver.maps;
        const mapOptions = {
            center: new navermaps.LatLng(37.3595704, 127.105399),
            zoom: 10,
        };
        
        // const map = new window.naver.maps.Map(container, options);
        const map = new navermaps.Map('map', mapOptions);

        const initGeocoder = () => {
            const latlng = map.getCenter();
            const utmk = navermaps.TransCoord.fromLatLngToUTMK(latlng);
            const tm128 = navermaps.TransCoord.fromUTMKToTM128(utmk);
            const naverCoord = navermaps.TransCoord.fromTM128ToNaver(tm128);

            infoWindow = new navermaps.InfoWindow({
                content: ''
            });
            map.addListener('click', function(e) {
                const latlng = e.coord, //좌표
                utmk = navermaps.TransCoord.fromLatLngToUTMK(latlng),
                tm128 = navermaps.TransCoord.fromUTMKToTM128(utmk),
                naverCoord = navermaps.TransCoord.fromTM128ToNaver(tm128);

                utmk.x = parseFloat(utmk.x.toFixed(1));
                utmk.y = parseFloat(utmk.y.toFixed(1));

                infoWindow.setContent([
                    '<div style="padding:10px;width:380px;font-size:14px;line-height:20px;">',
                    '<strong>LatLng</strong> : '+ '좌 클릭 지점 위/경도 좌표' +'<br />',
                    '<strong>UTMK</strong> : '+ '위/경도 좌표를 UTMK 좌표로 변환한 값' +'<br />',
                    '<strong>TM128</strong> : '+ '변환된 UTMK 좌표를 TM128 좌표로 변환한 값' +'<br />',
                    '<strong>NAVER</strong> : '+ '변환된 TM128 좌표를 NAVER 좌표로 변환한 값' +'<br />',
                    '</div>'
                ].join(''));

                infoWindow.open(map, latlng);
                console.log('LatLng: ' + latlng.toString());
                console.log('UTMK: ' + utmk.toString());
                console.log('TM128: ' + tm128.toString());
                console.log('NAVER: ' + naverCoord.toString());

                //좌표 -> 주소
                navermaps.Service.reverseGeocode({
                    coords: latlng,
                }, function(status, response) {
                    if (status !== navermaps.Service.Status.OK) {
                        return alert('Something wrong!');
                    }
                    const result = response.v2, // 검색 결과의 컨테이너
                    items = result.results, // 검색 결과의 배열
                    address = result.address; // 검색 결과로 만든 주소
                    console.log("배열", items)
                    console.log("주소", address)
                    setClickAddress(address);
                    // console.log("click", address.jibunAddress);
                    // console.log("cc", response.v2.addresses[0])
                })
            });
        }
                initGeocoder();
    }, []);

    

  return (
    <div>
        <div>MainMap</div>
        
        <div id="map" style={{ width:'100%', height:'400px' }}></div>
        {/* <div>위도: {location.lat}, 경도: {location.lng}</div> */}
    </div>
  )
}

export default MainMap;