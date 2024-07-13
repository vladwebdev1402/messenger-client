import { FC } from 'react';

import { User } from '@/types';
import { getTime } from '@/helpers';

import { Avatar, AvatarFallback, Typography } from '../ui';
import { useChatCard } from './useChatCard';

type Props = {
  idChat: number;
  user: User;
};

const ChatCard: FC<Props> = ({ idChat, user }) => {
  const { data, handleChatClick } = useChatCard(idChat);

  return (
    <div
      className="flex p-2 gap-2 transition-all cursor-pointer hover:bg-slate-200 border-b-[1px] border-b-slate-300"
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
        <Typography variant="p" className="mt-2 flex gap-2 justify-between">
          {data && (
            <>
              <div className="overflow-hidden w-full text-ellipsis text-nowrap">
                {data.at(-1)?.message}
              </div>
              <span className="text-xs pl-2 text-end mt-3 font-medium">
                {getTime(data.at(-1)?.createdAt || '')}
              </span>
            </>
          )}
        </Typography>
      </div>
    </div>
  );
};

export { ChatCard };
