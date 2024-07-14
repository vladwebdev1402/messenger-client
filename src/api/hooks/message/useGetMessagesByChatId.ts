import { QueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getMessagesResponse, MessageService } from '@/api/requests';
import { Message } from '@/types';

export const useGetMessagesByChatId = (idChat: number, length = 20) =>
  useQuery<getMessagesResponse>({
    refetchOnWindowFocus: false,
    queryKey: ['message', idChat, length],
    queryFn: async () =>
      await MessageService.getMessagesByChatId(idChat, length),
  });

export const useGetInfinityMessagesByChatId = (idChat: number) =>
  useInfiniteQuery({
    queryKey: ['message', idChat],
    initialPageParam: 20,
    queryFn: ({ pageParam }) =>
      MessageService.getMessagesByChatId(idChat, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export const updateInfinityMessagesCache = (
  idChat: number,
  client: QueryClient,
  newMessage: Message,
) => {
  client.setQueryData(
    ['message', idChat],
    (oldData: { pages: getMessagesResponse[]; pageParams: number }) => {
      return {
        ...oldData,
        pages: oldData.pages.map((page, index) => {
          if (index === 0)
            return { ...page, messages: [...page.messages, newMessage] };
          return page;
        }),
      };
    },
  );
};

export const updateMessagesCache = (
  idChat: number,
  client: QueryClient,
  newMessage: Message,
) => {
  client.setQueryData(['message', idChat, 1], () => ({
    messages: [newMessage],
  }));
};
