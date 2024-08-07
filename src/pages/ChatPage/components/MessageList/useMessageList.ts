import { RefObject, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
  updateInfinityMessagesCache,
  useGetInfinityMessagesByChatId,
} from '@/api';
import { useCreateChatStore } from '@/components';
import { useAuthStore, useSocketStore } from '@/store';
import { Message } from '@/types';

import { sortByDate } from './helpers';

export const useMessageList = (listRef: RefObject<HTMLDivElement>) => {
  const { id } = useParams<{ id: string }>();
  const currentUserId = useCreateChatStore((state) => state.userId);
  const user = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const client = useQueryClient();
  const navigate = useNavigate();

  const { data, fetchNextPage, isLoading, isFetching } =
    useGetInfinityMessagesByChatId(Number(id));

  const getMessagesFromPages = data
    ? data.pages.reduce(
        (acc: Message[], curr) => [...curr.messages, ...acc],
        [],
      )
    : [];

  const sortedData = sortByDate(getMessagesFromPages);

  const handleAddLength = async () => {
    if (listRef.current) listRef.current.scrollTo({ top: 900 });
    setTimeout(() => fetchNextPage(), 150);
  };

  useLayoutEffect(() => {
    const idChat = Number(id);
    if (currentUserId === null && Number.isNaN(idChat)) navigate('/');
  }, [id, currentUserId, navigate]);

  useEffect(() => {
    const handleMessageReceive = (message: Message) => {
      updateInfinityMessagesCache(Number(id), client, message);

      if (
        listRef.current &&
        ((user && user.id === message.idUser) ||
          listRef.current.scrollHeight - listRef.current.scrollTop < 1000)
      ) {
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

  // отвечает за скролл после получения первого ответа
  useEffect(() => {
    if (listRef.current && !isLoading && data?.pages.length === 1) {
      listRef.current.scrollTo({ top: 1000000 });
    }
  }, [listRef, isLoading, data]);

  // отвечает за скролл при переходе на чат
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 1000000 });
    }
  }, [id, listRef]);

  // отвечает за скролл до рендера при переходе на чат
  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 1000000 });
    }
  }, [id, listRef]);

  return {
    user,
    sortedData,
    cursor: data?.pages.at(-1)?.nextCursor || null,
    isFetching,
    isLoading,
    handleAddLength,
  };
};
