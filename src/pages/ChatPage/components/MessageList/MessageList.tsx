import { FC, RefObject } from 'react';

import { MessageCard } from '@/components';

import { useMessageList } from './useMessageList';

type Props = {
  listRef: RefObject<HTMLDivElement>;
};

const MessageList: FC<Props> = ({ listRef }) => {
  const { sortedData, user } = useMessageList(listRef);

  if (user)
    return (
      <div
        className="flex flex-col gap-3 p-3 overflow-auto h-[calc(100dvh-72px-96px)]"
        ref={listRef}
      >
        {Object.keys(sortedData).map((date) => (
          <div className="flex flex-col gap-3 p-3" key={date}>
            <div className="self-center bg-primary text-sm rounded p-1 text-primary-foreground">
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
