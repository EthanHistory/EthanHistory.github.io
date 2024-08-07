// components/Chat.tsx
'use client';

import { useEffect, useState } from 'react';
import Message from './Message';

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    setMessages(["Hi, I am Inseong Han, a Gen AI/ML Engineer. Please ask about me!"]);
  }, []);

  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <Message key={index} text={message} />
      ))}
    </div>
  );
};

export default Chat;
