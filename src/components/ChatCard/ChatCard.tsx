import { FC } from 'react';

import { Chat, Message, User } from '@/types';
import { getTime } from '@/helpers';

import { Avatar, AvatarFallback, Typography } from '../ui';
import { useChatCard } from './useChatCard';

type Props = {
  user: User;
  chat?: Chat;
  lastMessage?: Message;
};

const ChatCard: FC<Props> = ({ user, chat, lastMessage }) => {
  const { handleChatClick } = useChatCard(user.id, chat?.id);

  return (
    <div
      className="flex p-2 gap-2 transition-all cursor-pointer hover:bg-slate-300 dark:hover:bg-primary-foreground border-b-[1px] border-border"
      onClick={handleChatClick}
    >
      <Avatar className="w-16 h-16 relative overflow-visible">
        <AvatarFallback>{user.id}</AvatarFallback>
        {user.isOnline && (
          <div className="rounded-full absolute w-3 h-3 bg-green-600 border-[1px] border-green-900 right-1 bottom-2" />
        )}
      </Avatar>
      <div className="overflow-hidden w-full">
        <Typography variant="p" className="font-medium text-nowrap">
          {user.login}
        </Typography>
        {lastMessage && (
          <Typography variant="p" className="mt-2 flex gap-2 justify-between">
            <>
              <div className="overflow-hidden w-full text-ellipsis text-nowrap">
                {lastMessage.message}
              </div>
              <span className="text-xs pl-2 text-end mt-3 font-medium">
                {getTime(lastMessage.createdAt || '')}
              </span>
            </>
          </Typography>
        )}
      </div>
    </div>
  );
};

export { ChatCard };
