import { RefObject, useEffect, useRef } from 'react';
import { Message } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useGetMessagesByChatId } from '@/api';
import { useAuthStore, useSocketStore } from '@/store';

import { sortByDate } from './helpers';

export const useMessageList = (listRef: RefObject<HTMLDivElement>) => {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const { data } = useGetMessagesByChatId(Number(id));
  const isScrolled = useRef(false);
  const client = useQueryClient();
  const sortedData = sortByDate(data || []);

  useEffect(() => {
    if (socket) {
      socket.on('message/receive', (message: Message) => {
        client.setQueryData(
          ['message', Number(id), 20],
          (oldData: Message[]) => [...oldData, message],
        );
      });
    }
  }, [socket, id, client]);

  useEffect(() => {
    if (
      listRef.current &&
      Object.keys(sortedData).length !== 0 &&
      !isScrolled.current
    ) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight });
      isScrolled.current = true;
    }
  }, [listRef, sortedData, isScrolled]);

  useEffect(() => {
    isScrolled.current = false;
  }, [id]);

  return {
    user,
    sortedData,
    listRef,
  };
};
