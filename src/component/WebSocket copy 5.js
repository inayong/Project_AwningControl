import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';


const WebSocket = () => {
  const webSocket = useRef(null);
  
  useEffect(() => {
    // webSocket.current = new WebSocket("ws://10.125.121.206:8080/user/socket/chatt");
    // const ws = new WebSocket("ws://10.125.121.206:8080/user/socket/chatt");
    const ws = new WebSocket('ws://10.125.121.206:8080/user/socket/chatt', ['protocol'], {
  headers: {
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU5Nzk1NTEsInVzZXJuYW1lIjoiZGFvbiJ9.r4L0UgRd0rQODQq6WOh6E1qe517nvSRv3JEDpA9SMpA',
  },
});
    // webSocket.current.onopen = () => {
    //   console.log("websocket 연결");
    // }
    ws.onopen = () => {
      // ws.send(JSON.stringify({ type: "Authorization", token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU5Nzk1NTEsInVzZXJuYW1lIjoiZGFvbiJ9.r4L0UgRd0rQODQq6WOh6E1qe517nvSRv3JEDpA9SMpA' }));
      console.log("websocket 연결");
    };
   
  }, [])

  return (
    <div>
      <div>Received Messages</div>
      
    </div>
  );
}

export default WebSocket;