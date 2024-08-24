'use client';

import { Card, Button, CardBody } from '@nextui-org/react';

interface SelectionsProps {
  buttons: string[];
  onClick: (question: string) => void;
}

const Selections: React.FC<SelectionsProps> = ({ buttons, onClick }) => {
  return (
    <Card isBlurred>
      <CardBody>
        <div className="grid grid-cols-5 gap-4">
          {buttons.map((buttonText, index) => (
            <Button onClick={() => onClick(buttonText)} key={index} variant="flat" className="w-full">{buttonText}</Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Selections;
