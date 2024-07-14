import { FC, RefObject } from 'react';

import { InfinityScroll, MessageCard } from '@/components';

import { useMessageList } from './useMessageList';

type Props = {
  listRef: RefObject<HTMLDivElement>;
};

const MessageList: FC<Props> = ({ listRef }) => {
  const { sortedData, user, cursor, handleAddLength } = useMessageList(listRef);

  if (user)
    return (
      <div
        className="flex flex-col gap-3 p-3 overflow-auto h-[calc(100dvh-72px-96px)] scroll relative"
        ref={listRef}
      >
        <InfinityScroll
          isLoading={false}
          isStopScroll={Object.keys(sortedData).length === 0 || cursor === null}
          loader={<></>}
          onObserve={handleAddLength}
          className="absolute top-0 left-0 w-full"
        />
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
