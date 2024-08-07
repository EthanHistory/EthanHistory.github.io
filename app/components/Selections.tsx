// components/Chat.tsx
'use client';

import { Card, Button, CardBody } from '@nextui-org/react';

interface SelectionsProps {
  buttons: string[];
}

const Selections: React.FC<SelectionsProps> = ({ buttons }) => {
  return (
    <Card>
      <CardBody>
        {buttons.map((buttonText, index) => (
            <Button>{buttonText}</Button>
        ))}
      </CardBody>
    </Card>
  );
};

export default Selections;
