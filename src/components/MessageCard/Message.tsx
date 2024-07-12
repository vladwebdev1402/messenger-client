import { FC } from 'react';
import clsx from 'clsx';

import { Message } from '@/types';

import { Card, CardDescription } from '../ui';

type Props = {
  message: Message;
  isMyMessage: boolean;
};

const MessageCard: FC<Props> = ({ message, isMyMessage }) => {
  return (
    <Card
      className={clsx('self-start max-w-80 p-2', {
        'bg-secondary': isMyMessage,
      })}
    >
      <div className="font-medium text-sm">
        {isMyMessage ? 'Вы' : message.user.login}
      </div>
      <div className="p-0">
        <CardDescription>{message.message}</CardDescription>
      </div>
    </Card>
  );
};

export { MessageCard };
