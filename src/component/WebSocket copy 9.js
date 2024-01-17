import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


const WebSocket = () => {
  const webSocket = useRef(null);
  const [message, setMessage] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // console.log("token", token)
  //   const ws = new WebSocket(`ws://10.125.121.206:8080/user/socket/chatt?Authorization=${token}`);
  //   ws.onopen = () => {
  //     console.log("WEBSOCKET")
  //   }
  //   ws.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     setMessage(item => [...item, message]);
  //     console.log("MESSAGE", message)
  //   }

  //   // webSocket.current = new WebSocket(`ws://10.125.121.206:8080/user/socket/chatt?Authorization=${token}`);
  //   //     webSocket.current.onopen = () => {
  //   //         console.log("websocket 연결");
  //   //     }

  //   //     return () => {
  //   //       if (webSocket.current) {
  //   //         webSocket.current.close();
  //   //       }
  //   //     };
  // }, []);
  const socket = useRef();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const ws = new WebSocket(`ws://10.125.121.206:8080/user/socket/chatt?Authorization=${token}`)
    socket.current = ws;
    console.log("ws", ws)


    ws.onmessage = (event) => {
      const message = event.data;
      setMessage(prev => [...prev, message]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);


  return (
    <div>
      <div>{message}</div>

    </div>
  );
}

export default WebSocket;