'use client';

import { Avatar, Card } from '@nextui-org/react';
import Typewriter from 'typewriter-effect';

type MessageProps = {
  text: string;
};

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <Card className="message-card">
      <div className="flex items-center space-x-4">
        <Avatar
          src="/inseong_avatar.jpg" // Use your avatar path
          isBordered
          color="primary"
          radius="md"
          className="w-12 h-12 text-tiny"
        />
        <div className="message-text">
          <Typewriter
            options={{
              strings: [text],
              autoStart: true,
              loop: false,
              delay: 10,
              deleteSpeed: Infinity
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default Message;