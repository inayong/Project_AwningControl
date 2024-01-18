import React, { useEffect, useRef, useState } from 'react'

const WebSocketConnect = () => {
    const [message, setMessage] = useState([]);
    const socket = useRef();

    useEffect(() => {
      const token = localStorage.getItem("token");
  
      const ws = new WebSocket(`ws://10.125.121.206:8080/user/socket/chatt?Authorization=${token}`)
      socket.current = ws;
    //   console.log("ws", ws)
  
    ws.onmessage = (event) => {
        const messages = JSON.parse(event.data);
        
            if (messages.eventType === '경고') {
                setMessage(item => [...item, messages])
            
        }
        
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

    // useEffect(() => {
    //     console.log("Updated messages:", message);
    //   }, [message]); 
  
  
    return (
        <div className='space-y-5 '>
            {message.map((item, idx) => (
                    <div key={idx} className='bg-white rounded-lg p-3'>
                        <div className='flex space-x-3 border-b-2 p-1'>
                            <div className='font-NanumSquareNeoVariable'>awningId</div>
                            <div className='font-GmarketSansMedium bg-neutral-200 w-6 flex justify-center rounded-full'>{item.awningId}</div>
                        </div>
                        <div className='font-GmarketSansMedium pt-2 space-y-2 flex flex-col justify-center items-center'>
                        {item.eventType2.includes('고장') && <div>{item.eventType2}</div>}
                        {item.eventType3.includes('고장') && <div>{item.eventType3}</div>}
                        </div>
                    </div>
                ))}
        </div>
    );
  }

export default WebSocketConnect