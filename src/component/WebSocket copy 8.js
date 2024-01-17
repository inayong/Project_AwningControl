import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


const WebSocket = () => {
  const webSocket = useRef(null);

  // useEffect(() => {
    
  //   webSocket.current = new Client({
  //       brokerURL: 'ws://10.125.121.206:8080/user/socket/chatt',
  //       connectHeaders: { // 이 부분 새로 추가
  //         Authorization: localStorage.getItem('token'),
  //       },
  //       debug: function (str) {
  //         console.log('STOMP: ' + str);
  //       },
  //     });

  //     webSocket.current.onConnect = () => {
  //       console.log('success');
  //       // subscribe();
  //     }

  //     webSocket.current.activate();

  //     return () => {
  //       if (webSocket.current) {
  //         webSocket.current.deactivate();
  //       }
  //     };
    

  // }, []);


  return (
    <div>
      <div>Received Messages</div>

    </div>
  );
}

export default WebSocket;