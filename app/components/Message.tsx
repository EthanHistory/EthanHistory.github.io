import { Avatar, Card, CardBody } from '@nextui-org/react';
import { useEffect, useRef } from 'react';

type MessageProps = {
  text: string;
  role: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
};

const Message: React.FC<MessageProps> = ({ text, role, scrollContainerRef }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const urlRegex = /https?:\/\/[^\s]+/g;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  const boldRegex = /\*\*(.*?)\*\*/g;
  const italicRegex = /\*(.*?)\*/g;

  const formatText = (input: string) => {
    let formattedText = input.replace(urlRegex, (url) => {
      return `<a href="${url}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    formattedText = formattedText.replace(emailRegex, (email) => {
      return `<a href="mailto:${email}" class="text-blue-500 underline">${email}</a>`;
    });

    formattedText = formattedText.replace(boldRegex, (match, p1) => {
      return `<strong>${p1}</strong>`;
    });

    formattedText = formattedText.replace(italicRegex, (match, p1) => {
      return `<em>${p1}</em>`;
    });

    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  };

  useEffect(() => {
    if (scrollContainerRef.current && messageRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [text, scrollContainerRef]);

  const formattedText = formatText(text);

  // Determine avatar image based on role
  const getAvatarImage = (role: string) => {
    switch (role) {
      case 'user':
        return '/user_avatar.jpg'; // Replace with the actual user avatar image path
      case 'ai':
        return '/inseong_avatar.jpg'; // Replace with the actual assistant avatar image path
      case 'system':
      default:
        return '/inseong_avatar.jpg'; // Replace with the actual system avatar image path
    }
  };

  const avatarImgPath = getAvatarImage(role);

  return (
    <Card isBlurred className="message-card">
      <CardBody>
        <div className="flex items-center space-x-4">
          <Avatar
            src={avatarImgPath}
            color="primary"
            radius="md"
            className="flex-shrink-0"
          />
          <div
            className="message-text"
            ref={messageRef}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Message;
