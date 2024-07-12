import { FC } from 'react';

import { User } from '@/types';

import { Avatar, AvatarFallback, Typography } from '../ui';
import { useChatCard } from './useChatCard';

type Props = {
  idChat: number;
  user: User;
};

const ChatCard: FC<Props> = ({ idChat, user }) => {
  const { data } = useChatCard(idChat);

  return (
    <div className="flex p-2 gap-2 transition-all cursor-pointer hover:bg-slate-200 border-b-[1px] border-b-slate-300">
      <Avatar className="w-16 h-16 relative overflow-visible">
        <AvatarFallback>{user.id}</AvatarFallback>
        {user.isOnline && (
          <div className="rounded-full absolute w-3 h-3 bg-green-600 border-[1px] border-green-900 right-1 bottom-2" />
        )}
      </Avatar>
      <div className="overflow-hidden">
        <Typography variant="p" className="font-medium text-nowrap">
          {user.login}
        </Typography>
        <Typography
          variant="p"
          className="overflow-hidden text-ellipsis text-nowrap"
        >
          {data && data.at(-1)?.message}
        </Typography>
      </div>
    </div>
  );
};

export { ChatCard };
