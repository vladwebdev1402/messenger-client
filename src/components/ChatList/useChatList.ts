import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ChatService } from '@/services';
import { useChatsStore } from '@/store';

export const useChatList = () => {
  const chats = useChatsStore((state) => state.chats);
  const setChats = useChatsStore((state) => state.setChats);

  const { isLoading, error, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['chats'],

    queryFn: async () => await ChatService.getAllChats(),
  });

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data]);

  return { isLoading, error, chats };
};
