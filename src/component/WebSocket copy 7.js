import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


const WebSocket = () => {
  const webSocket = useRef(null);

  useEffect(() => {
    // const ws = new WebSocket('ws://10.125.121.206:8080/user/socket/chatt');
    // console.log("token", localStorage.getItem("token"))
    
    webSocket.current = new Client({
        brokerURL: 'ws://10.125.121.206:8080/user/socket/chatt',
        onConnect: () => {
          console.log('success');
          subscribe();
        },
        connectHeaders: { // 이 부분 새로 추가
          Authorization: localStorage.getItem('token'),
        },
      });
      webSocket.current.activate();

    // const socket = new WebSocket('ws://10.125.121.206:8080/user/socket/chatt');
    // webSocket.current = new Client({
    //   webSocketFactory: () => socket,
    //   onConnect: () => {
    //     console.log('WebSocket Connection Success');
    //     // 여기에 구독 로직 추가
    //   },
    //   connectHeaders: {
    //     Authorization: localStorage.getItem('token'),
    //   },
    // });

    // webSocket.current.activate();

    // return () => {
    //   if (webSocket.current) {
    //     webSocket.current.deactivate();
    //   }
    // };
    

  }, []);


  return (
    <div>
      <div>Received Messages</div>

    </div>
  );
}

export default WebSocket;