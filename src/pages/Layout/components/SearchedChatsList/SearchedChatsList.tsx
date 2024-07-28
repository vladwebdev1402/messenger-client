import { FC } from 'react';

import { ChatCard, ChatListSkeleton, Typography } from '@/components';

import { useSearchedChatsList } from './useSearchedChatsList';

type SearchedChatsListProps = {
  searchLogin: string;
};

const SearchedChatsList: FC<SearchedChatsListProps> = ({ searchLogin }) => {
  const { searchFetching, searchResult } = useSearchedChatsList(searchLogin);

  if (searchLogin !== '')
    return (
      <div className="overflow-auto max-h-[calc(100dvh-76px)] scroll">
        {searchResult.myChats.map((chat) => (
          <ChatCard key={chat.idChat} idChat={chat.idChat} user={chat.user} />
        ))}
        {searchFetching && <ChatListSkeleton />}
        {!searchFetching && searchResult.searchChats.length > 0 && (
          <Typography className="mt-4 mb-4 text-center">
            Результаты поиска
          </Typography>
        )}
        {!searchFetching &&
          searchResult.searchChats.map((user) => (
            <ChatCard key={user.id} idChat={null} user={user} />
          ))}
        {!searchFetching && searchResult.searchChats.length === 0 && (
          <Typography className="mt-4 text-center">
            Ничего не найдено
          </Typography>
        )}
      </div>
    );

  return <></>;
};

export { SearchedChatsList };
