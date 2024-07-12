import { ArrowLeftToLine } from 'lucide-react';
import clsx from 'clsx';

import { Button, Typography } from '../ui';
import { ChatCard } from '../ChatCard';
import { useChatList } from './useChatList';

type ChatListProps = {
  isLayoutOpen: boolean;
  changeIsOpenLayout: () => void;
};

const ChatList = ({ isLayoutOpen, changeIsOpenLayout }: ChatListProps) => {
  const { chats } = useChatList();

  return (
    <div>
      <div
        className={clsx('pl-4 pt-3 pb-5 pr-4 flex items-center bg-slate-50', {
          'justify-between': isLayoutOpen,
          'justify-end': !isLayoutOpen,
        })}
      >
        {isLayoutOpen && (
          <Typography variant="h2" className="">
            Чаты
          </Typography>
        )}
        <Button
          variant="outline"
          className="p-2 w-10 h-10"
          onClick={changeIsOpenLayout}
        >
          <ArrowLeftToLine
            size="24"
            className={clsx(' transition-all', {
              'rotate-180': !isLayoutOpen,
            })}
          />
        </Button>
      </div>
      {chats && (
        <div>
          {chats.map((chat) => (
            <ChatCard key={chat.idChat} idChat={chat.idChat} user={chat.user} />
          ))}
        </div>
      )}
    </div>
  );
};

export { ChatList };
