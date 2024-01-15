import React, { useEffect, useRef, useState } from 'react';

const WebSocket = () => {
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        webSocket.current = new WebSocket("ws://10.125.121.206:8080/user/socket/chatt");
        webSocket.current.onopen = () => {
            console.log("websocket 연결");
        }
        webSocket.current.onmessage = (event) => {
            console.log("mess", event.data);
            setMessages(event.data);
        }
    }, [])
   


    return (
        <div>WebSocke{messages}</div>
    )
}

export default WebSocket;