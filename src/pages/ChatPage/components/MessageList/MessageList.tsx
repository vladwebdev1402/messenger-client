import { FC, RefObject } from 'react';
import clsx from 'clsx';

import { InfinityScroll, MessageCard, Typography } from '@/components';

import { useMessageList } from './useMessageList';
import { MessageListSkeleton } from './MessageListSkeleton';

type Props = {
  listRef: RefObject<HTMLDivElement>;
};

const MessageList: FC<Props> = ({ listRef }) => {
  const { sortedData, user, cursor, isLoading, isFetching, handleAddLength } =
    useMessageList(listRef);

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3 p-3 overflow-auto h-[calc(100dvh-72px-96px)] scroll relative"
        ref={listRef}
      >
        <div className="flex flex-col gap-3 p-3">
          <MessageListSkeleton />
          <MessageListSkeleton />
        </div>
      </div>
    );
  }

  if (user)
    return (
      <div
        className="flex flex-col gap-3 p-3 overflow-auto h-[calc(100dvh-72px-96px)] scroll relative"
        ref={listRef}
      >
        <InfinityScroll
          isLoading={cursor !== null && isFetching}
          isStopScroll={Object.keys(sortedData).length === 0 || cursor === null}
          loader={
            <div className="flex flex-col gap-3 p-3">
              <MessageListSkeleton />
            </div>
          }
          onObserve={handleAddLength}
          className={clsx('top-[250px] left-0 w-full', {
            absolute: cursor === null || !isFetching,
          })}
        />
        {Object.keys(sortedData).length === 0 && (
          <div className="h-full w-full flex items-center justify-center">
            <Typography
              variant="h3"
              className="rounded-2xl bg-border p-3 text-center"
            >
              Здесь ещё нет сообщений
            </Typography>
          </div>
        )}
        {Object.keys(sortedData).map((date) => (
          <div className="flex flex-col gap-3 p-3" key={date}>
            <div className="self-center text-sm rounded p-1 bg-border dark:bg-primary-foreground">
              {date}
            </div>
            {sortedData[date].map((msg) => (
              <MessageCard
                message={msg}
                isMyMessage={msg.idUser === user.id}
                key={msg.id}
              />
            ))}
          </div>
        ))}
      </div>
    );
};

export { MessageList };
