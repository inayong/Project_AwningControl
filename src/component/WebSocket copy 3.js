import { Stomp } from '@stomp/stompjs';
import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';

const WebSocket = () => {
    
    useEffect(() => {
        const socket = new SockJS('ws://10.125.121.206:8080');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/user/socket/chatt', (message) => {
                console.log(JSON.parse(message.body).connect);
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        }
    }, []);
    


    return (
        <div>WebSocket</div>
    )
}

export default WebSocket;