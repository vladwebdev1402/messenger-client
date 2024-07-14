import { RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
  updateInfinityMessagesCache,
  updateMessagesCache,
  useGetInfinityMessagesByChatId,
} from '@/api';
import { useAuthStore, useSocketStore } from '@/store';
import { Message } from '@/types';

import { sortByDate } from './helpers';

export const useMessageList = (listRef: RefObject<HTMLDivElement>) => {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const isScrolled = useRef(false);
  const client = useQueryClient();

  const { data, fetchNextPage, isFetching } = useGetInfinityMessagesByChatId(
    Number(id),
  );

  const getMessagesFromPages = data
    ? data.pages.reduce(
        (acc: Message[], curr) => [...curr.messages, ...acc],
        [],
      )
    : [];

  const sortedData = sortByDate(getMessagesFromPages);
  const handleAddLength = async () => {
    listRef.current?.scrollTo({
      top: 100,
    });
    setTimeout(() => fetchNextPage(), 150);
  };

  useEffect(() => {
    const handleMessageReceive = (message: Message) => {
      updateInfinityMessagesCache(Number(id), client, message);

      updateMessagesCache(Number(id), client, message);

      if (user && user.id === message.idUser) {
        setTimeout(() => {
          listRef.current?.scrollTo({ top: 1000000 });
        }, 50);
      }
    };

    if (socket) {
      socket.on('message/receive', handleMessageReceive);
    }

    return () => {
      if (socket) socket.off('message/receive', handleMessageReceive);
    };
  }, [socket, id, client, user, listRef]);

  useEffect(() => {
    if (
      listRef.current &&
      Object.keys(sortedData).length !== 0 &&
      !isScrolled.current
    ) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight });
      isScrolled.current = true;
    }
  }, [listRef, sortedData, isScrolled, id]);

  useLayoutEffect(() => {
    if (listRef.current) listRef.current.scrollTo({ top: 1000000 });
  }, [id, listRef, sortedData]);

  return {
    user,
    sortedData,
    cursor: data?.pages.at(-1)?.nextCursor || null,
    isFetching,
    handleAddLength,
  };
};
