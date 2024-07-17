import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useChatsStore, useSocketStore } from '@/store';
import { updateMessagesCache, useGetChats } from '@/api';
import { Message } from '@/types';

export const useChatList = () => {
  const setChats = useChatsStore((state) => state.setChats);
  const chats = useChatsStore((state) => state.chats);
  const socket = useSocketStore((state) => state.socket);
  const client = useQueryClient();
  const { isLoading, error, data } = useGetChats();

  useEffect(() => {
    const handleMessageReceive = (message: Message) => {
      updateMessagesCache(Number(message.idChat), client, message);
    };

    if (socket) {
      socket.on('message/receive', handleMessageReceive);
    }

    return () => {
      if (socket) socket.off('message/receive', handleMessageReceive);
    };
  }, [socket, client]);

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data, setChats]);

  return { isLoading, error, chats };
};
