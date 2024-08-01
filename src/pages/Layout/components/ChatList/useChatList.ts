import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useSocketStore } from '@/store';
import {
  addChatInCashe,
  updateInfinityMessagesCache,
  updateLastMessageInCashe,
  useGetChats,
} from '@/api';
import { Chat, Message, User } from '@/types';
import { useDebounce } from '@/hooks';

export const useChatList = () => {
  const [searchLogin, setSearchLogin] = useState('');
  const socket = useSocketStore((state) => state.socket);
  const client = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, data } = useGetChats();

  const handleSearch = (value: string) => setSearchLogin(value);

  const debounceSearch = useDebounce(handleSearch, 500);

  useEffect(() => {
    const handleChatCreate = ({
      chat,
      message,
      creator,
      user,
    }: {
      message: Message;
      chat: Chat;
      user: User;
      creator: boolean;
    }) => {
      addChatInCashe(client, chat, user, message);
      updateLastMessageInCashe(client, chat.id, message);
      updateInfinityMessagesCache(chat.id, client, message);
      if (creator) navigate('/' + chat.id);
    };

    const handleMessageReceive = (message: Message) => {
      updateLastMessageInCashe(client, Number(message.idChat), message);
    };

    if (socket) {
      socket.on('message/receive', handleMessageReceive);
      socket.on('chat/private/create', handleChatCreate);
    }

    return () => {
      if (socket) {
        socket.off('message/receive', handleMessageReceive);
        socket.off('chat/private/create', handleChatCreate);
      }
    };
  }, [socket, client, navigate]);

  return {
    isLoading,
    error,
    chats: data,
    searchLogin,
    debounceSearch,
  };
};
