import { useQuery } from '@tanstack/react-query';

import { ChatService } from '@/services';

export const useChatList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => await ChatService.getAllChats(),
  });

  return { isLoading, error, data };
};
