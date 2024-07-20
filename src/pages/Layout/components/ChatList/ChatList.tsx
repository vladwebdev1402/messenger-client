import { ChangeEvent } from 'react';
import { ArrowLeftToLine } from 'lucide-react';
import clsx from 'clsx';

import { Button, ChatCard, Input, Typography } from '@/components';

import { useChatList } from './useChatList';
import { ChatListSkeleton } from './ChatListSkeleton';

type ChatListProps = {
  isLayoutOpen: boolean;
  changeIsOpenLayout: () => void;
};

const ChatList = ({ isLayoutOpen, changeIsOpenLayout }: ChatListProps) => {
  const {
    chats,
    isLoading,
    debounceSearch,
    searchData,
    searchLogin,
    searchFetching,
  } = useChatList();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          <Input placeholder="Поиск..." onChange={handleSearchChange} />
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
      {searchLogin !== '' && (
        <div>
          {searchFetching && <ChatListSkeleton />}
          {!searchFetching &&
            searchData &&
            searchData.map((user) => (
              <ChatCard key={user.id} idChat={null} user={user} />
            ))}
          {!searchFetching && searchData?.length === 0 && (
            <Typography className="mt-4 text-center">
              Ничего не найдено
            </Typography>
          )}
        </div>
      )}
      {isLoading && <ChatListSkeleton />}

      {chats && searchLogin === '' && (
        <div className="overflow-auto scroll max-h-[calc(100dvh-76px)]">
          {chats.map((chat) => (
            <ChatCard key={chat.idChat} idChat={chat.idChat} user={chat.user} />
          ))}
        </div>
      )}
    </div>
  );
};

export { ChatList };
