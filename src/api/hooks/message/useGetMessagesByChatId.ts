import { useQuery } from '@tanstack/react-query';

import { MessageService } from '@/api/requests';
import { Message } from '@/types';

export const useGetMessagesByChatId = (idChat: number, length = 20) =>
  useQuery<Message[]>({
    refetchOnWindowFocus: false,
    queryKey: ['message', idChat, length],
    queryFn: async () =>
      await MessageService.getMessagesByChatId(idChat, length),
  });
