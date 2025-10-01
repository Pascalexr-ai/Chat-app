import React, { useState } from 'react';
import { FaComments, FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import '../styles/chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', text: 'Hey there!' },
    { id: 2, sender: 'Bot', text: 'Welcome to the chat room.' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), sender: 'You', text: message };
    setMessages([...messages, newMsg]);
    setMessage('');
    // Later: emit to socket or send to backend
  };

  return (
    <div className="chat-container">
      <h2><FaComments /> Chat</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
            <FaUserCircle />
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}><FaPaperPlane /></button>
      </div>
    </div>
  );
}

export default Chat;

