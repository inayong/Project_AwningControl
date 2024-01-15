import React, { useEffect, useRef, useState } from 'react';

const WebSocket = () => {
    const [messages, setMessages] = useState([]);
    const webSocket = useRef();

    // useEffect(() => {
    //     webSocket.current = new WebSocket('ws://localhost:8080/user/socket/chatt');
    //     webSocket.current.onopen = () => {
    //         console.log("WebSocket 연결");
    //     };
    //     webSocket.current.onclose = (err) => {
    //         console.log(err);
    //     }
    //     webSocket.current.onerror = (err) => {
    //         console.log(err);
    //     }
    //     webSocket.current.onmessage = () => {
    //         setMessages((item) => item.data);
    //     }

    //     return () => {
    //         webSocket.current.close();
    //     }
    // }, [])

    // useEffect(() => {
    //     let wsUrl = 'ws://localhost:8080/user/socket/chatt';
    //     webSocket.current = new WebSocket(wsUrl);
    //     webSocket.current.onopen = () => {
    //         setMessages(webSocket.current.readyState);
    //     };

    //     return (
    //         if (webSocket.current.readyState) {
    //             webSocket.current.send(
    //                 JSON.stringify({
    //                     type: 
    //                 })
    //             )
    //         }
    //     )
    // }, [])

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/user/socket/chatt');
        // webSocket.current = ws;
        ws.onopen = () => ws.send('{"rqtype": "0000", "token": ""}');
        ws.onmessage = (e) => {
            setMessages(e.messages);
        }
    }, [])


    return (
        <div>WebSocket{messages}</div>
    )
}

export default WebSocket;