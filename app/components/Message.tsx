'use client';

import { Avatar, Card, CardBody } from '@nextui-org/react';
import Typewriter from 'typewriter-effect';

type MessageProps = {
  text: string;
};

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <Card isBlurred className="message-card">
      <CardBody>
        <div className="flex items-center space-x-4">
          <Avatar
            src="/inseong_avatar.jpg"
            color="primary"
            radius="md"
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
      </CardBody>
    </Card>
  );
};

export default Message;
