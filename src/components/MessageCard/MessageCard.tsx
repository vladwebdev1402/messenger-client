import { FC } from 'react';
import clsx from 'clsx';

import { Message } from '@/types';
import { getTime } from '@/helpers';

import { Card, CardDescription } from '../ui';

type Props = {
  message: Message;
  isMyMessage: boolean;
};

const MessageCard: FC<Props> = ({ message, isMyMessage }) => {
  return (
    <Card
      className={clsx('self-start max-w-160 p-2', {
        'bg-secondary': isMyMessage,
      })}
    >
      <span className="font-medium text-sm">
        {isMyMessage ? 'Вы' : message.user.login}
      </span>
      <div className="p-0">
        <CardDescription>
          {message.message}
          <span className="text-xs float-right pl-2 text-end mt-2 font-medium">
            {getTime(message.createdAt)}
          </span>
        </CardDescription>
      </div>
    </Card>
  );
};

export { MessageCard };