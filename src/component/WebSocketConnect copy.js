import React, { useEffect, useRef, useState } from 'react'

const WebSocketConnect = () => {
    // const webSocket = useRef(null);
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
  
  
    //   ws.onmessage = (event) => {
    //     const message = event.data;
    //     setMessage(prev => [...prev, message]);
    //     // console.log(message)
    //   };
    ws.onmessage = (event) => {
        const messages = JSON.parse(event.data);
        console.log(messages)
        console.log("경고", messages.eventType === '경고')

        // if (messages.eventType2 === '배터리 상태 고장' || messages.eventType3 === '모터 상태 고장') {
            if (messages.eventType === '경고') {
                setMessage(item => [...item, messages])
            // setMessage(item => [...item, {
            //     awningId: messages.awningId,
            //     eventType2: messages.eventType2,
            //     eventType3: messages.eventType3,
            // }])
        }
        console.log("set", message)
    }
  
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

    useEffect(() => {
        console.log("Updated messages:", message);
      }, [message]); 
  
  
    return (
        <div>
            {message.map((item, idx) => {
                <div key={idx} className='bg-slate-300'>
                    <div>{item.awningId}</div>
                    <div>{item.eventType2}</div>
                    <div>{item.eventType3}</div>
                </div>
            })}
        </div>
    );
  }

export default WebSocketConnect