import React, { useEffect, useState } from 'react';

const WebSocket = () => {
  const [message, setMessage] = useState('');
  let socket;

  useEffect(() => {
    // Replace 'your-header-value' with the actual header value
    const token = localStorage.getItem('token');

    // Construct WebSocket URL with authorization parameter
    const wsUrl = `ws://10.125.121.206:8080/user/socket/chatt?Authorization=${encodeURIComponent(token)}`;

    // Create a new WebSocket instance
    socket = new WebSocket(wsUrl);

    // Event listener for receiving messages
    socket.onmessage = (event) => {
      setMessage(event.data);
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        // socket.close();
      }
    };
  }, []);

  // Function to send a message through the WebSocket
  const sendMessage = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('Hello, WebSocket!');
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Received Message: {message}</p>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocket;