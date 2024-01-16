import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';


const WebSocket = () => {
  const webSocket = useRef(null);
  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //     const ws = new WebSocket('ws://10.125.121.206:8080/user/socket/chatt')


  //     ws.onmessage = (event) => {
  //       const message = event.data;
  //       setMessages(prev => [...prev, message]);
  //     };

  //     ws.onerror = (error) => {
  //       console.error('WebSocket error:', error);
  //     };

  //     ws.onclose = () => {
  //       console.log('WebSocket connection closed');
  //     };

  //     return () => {
  //       ws.close();
  //     };
  //   }, []);
  useEffect(() => {
    // const webSocketLogin = useCallback(() => {
    webSocket.current = new WebSocket("ws://10.125.121.206:8080/user/socket/chatt");
    webSocket.current.onopen = () => {
      console.log("websocket 연결");
    }
    // webSocket.current.onmessage = (event) => {
    //     console.log("mess", event.data);
    //     setMessages(event.data);
    // }
    //     webSocket.current.onmessage = (message) => {
    //         const dataSet = JSON.parse(message.data);
    //         setSocketData(dataSet);
    //     }
    // })
  }, [])

  return (
    <div>
      <h2>Received Messages</h2>
      {/* <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default WebSocket;