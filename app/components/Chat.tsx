import { forwardRef, useImperativeHandle, useState } from 'react';
import Message from './Message';

export type ChatHandle = {
  addMessage: (text: string, role: string) => void;
  updateLastMessage: (text: string) => void;
};

type MessageType = {
  text: string;
  role: string;
};

const Chat = forwardRef<ChatHandle, { scrollContainerRef: React.RefObject<HTMLDivElement> }>(
  ({ scrollContainerRef }, ref) => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    useImperativeHandle(ref, () => ({
      addMessage(text: string, role: string) {
        setMessages((prevMessages) => [...prevMessages, { text, role }]);
      },
      updateLastMessage(text: string) {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = text; // Update the last message's text
          return newMessages;
        });
      },
    }));

    return (
      <div>
        <Message
          text={"Hi, I am Inseong Han, a Gen AI/ML Engineer. Please ask about me!"}
          role="system"
          scrollContainerRef={scrollContainerRef}
        />
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            role={message.role}
            scrollContainerRef={scrollContainerRef}
          />
        ))}
      </div>
    );
  }
);

export default Chat;
