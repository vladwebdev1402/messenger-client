import { useQuery } from '@tanstack/react-query';

import { MessageService } from '@/api/requests';
import { Message } from '@/types';

export const useGetMessagesByChatId = (idChat: number) =>
  useQuery<Message[]>({
    refetchOnWindowFocus: false,
    queryKey: ['message', idChat],
    queryFn: async () => await MessageService.getMessagesByChatId(idChat),
  });
