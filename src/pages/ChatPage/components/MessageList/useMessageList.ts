import { RefObject, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useGetMessagesByChatId } from '@/api';
import { useAuthStore, useSocketStore } from '@/store';
import { Message } from '@/types';

import { sortByDate } from './helpers';

export const useMessageList = (listRef: RefObject<HTMLDivElement>) => {
  const [length, setLength] = useState(20);
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const { data } = useGetMessagesByChatId(Number(id), length);
  const isScrolled = useRef(false);
  const client = useQueryClient();
  const sortedData = sortByDate(data || []);

  const handleAddLength = () => setLength(length + 20);

  useEffect(() => {
    const handleMessageReceive = (message: Message) => {
      client.setQueryData(
        ['message', Number(id), length],
        (oldData: Message[]) => [...oldData, message],
      );

      client.setQueryData(['message', Number(id), 1], () => [message]);

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
  }, [socket, id, client, user, listRef, length]);

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

  useEffect(() => {
    isScrolled.current = false;
  }, [id, isScrolled]);

  return {
    user,
    sortedData,
    handleAddLength,
  };
};
