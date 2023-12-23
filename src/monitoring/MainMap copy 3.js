import React, { useEffect, useState } from 'react';
import NaverMap from '../component/NaverMap';

const MainMap = () => {
    const { naver } = window;

    // const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [clickAddress, setClickAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    // const [map, setMap] = useState(null);
    // const [markers, setMarkers] = useState(null);
    const [mapData, setMapData] = useState();


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







    return (
        <div >
            {mapData && mapData.length > 0 && (
                <NaverMap 
                mapData={mapData} 
                lat={mapData[0].latitude} 
                lng={mapData[0].longitude} 
                showMarker={(true)}
                width={'100%'}
                height={'100vh'}
                
                 />
            )}
        </div>
    )
}

export default MainMap;