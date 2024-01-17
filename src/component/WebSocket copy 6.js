import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';


const WebSocket = () => {
  // const webSocket = useRef(null);

  console.log("token", localStorage.getItem("token"))
  useEffect(() => {
    const ws = new WebSocket('ws://10.125.121.206:8080/user/socket/chatt');

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "authenticate", token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU5Nzk1NTEsInVzZXJuYW1lIjoiZGFvbiJ9.r4L0UgRd0rQODQq6WOh6E1qe517nvSRv3JEDpA9SMpA" }));
    };



    // ws.onopen = () => {
    //   console.log('WebSocket Connected');
    //   // 인증 정보를 서버에 전송
    //   ws.send(JSON.stringify({ action: "authenticate", token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU5Nzk1NTEsInVzZXJuYW1lIjoiZGFvbiJ9.r4L0UgRd0rQODQq6WOh6E1qe517nvSRv3JEDpA9SMpA" }));
    // };

    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.status === 'authenticated') {
    //     console.log('Authentication Successful');
    //     // 추가적인 로직 처리...
    //   } else {
    //     console.log('Authentication Failed');
    //     // 인증 실패 처리...
    //   }
    // };

    // ws.onclose = () => {
    //   console.log('WebSocket Disconnected');
    // };

    // return () => {
    //   ws.close();
    // };

  }, []);


  return (
    <div>
      <div>Received Messages</div>

    </div>
  );
}

export default WebSocket;