import { useEffect } from 'react';

import { useChatsStore } from '@/store';
import { useGetChats } from '@/api';

export const useChatList = () => {
  const chats = useChatsStore((state) => state.chats);
  const setChats = useChatsStore((state) => state.setChats);

  const { isLoading, error, data } = useGetChats();

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data, setChats]);

  return { isLoading, error, chats };
};
