import { useQuery } from '@tanstack/react-query';

import { MessageService } from '@/services';

export const useChatCard = (idChat: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['message' + idChat],
    queryFn: () => MessageService.getMessagesByChatId(idChat),
  });

  return { isLoading, error, data };
};
