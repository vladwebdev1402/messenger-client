import { ChangeEvent } from 'react';
import { ArrowLeftToLine } from 'lucide-react';
import clsx from 'clsx';

import { Button, ChatCard, Input } from '@/components';

import { useChatList } from './useChatList';
import { ChatListSkeleton } from './ChatListSkeleton';
import { SearchedChatsList } from '../SearchedChatsList';

type ChatListProps = {
  isLayoutOpen: boolean;
  changeIsOpenLayout: () => void;
};

const ChatList = ({ isLayoutOpen, changeIsOpenLayout }: ChatListProps) => {
  const {
    chats,
    isLoading,
    debouceSearchLogin,
    searchLogin,
    debounceSearch,
    setSearchLogin,
  } = useChatList();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchLogin(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <div>
      <div
        className={clsx(
          'pl-4 pt-3 pb-5 pr-4 flex items-center gap-2 bg-border',
          {
            'justify-between': isLayoutOpen,
            'justify-end opacity-0 sm:opacity-100': !isLayoutOpen,
          },
        )}
      >
        {isLayoutOpen && (
          <Input
            placeholder="Поиск..."
            onChange={handleSearchChange}
            value={searchLogin}
          />
        )}

        <Button
          variant="outline"
          className={clsx('p-2 w-10 h-10', {
            'hidden sm:block': !isLayoutOpen,
          })}
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

      <SearchedChatsList searchLogin={debouceSearchLogin} />
      {isLoading && <ChatListSkeleton />}

      {chats && debouceSearchLogin === '' && (
        <div className="overflow-auto scroll max-h-[calc(100dvh-76px)]">
          {chats.map((chat) => (
            <ChatCard
              key={chat.chat.id}
              chat={chat.chat}
              user={chat.user}
              lastMessage={chat.lastMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { ChatList };
