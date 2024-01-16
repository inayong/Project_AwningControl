import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';


const WebSocket = () => {
  const webSocket = useRef(null);
  
  useEffect(() => {
    webSocket.current = new WebSocket("ws://10.125.121.206:8080/user/socket/chatt");
    webSocket.current.onopen = () => {
      console.log("websocket 연결");
    }
   
  }, [])

  return (
    <div>
      <div>Received Messages</div>
      
    </div>
  );
}

export default WebSocket;