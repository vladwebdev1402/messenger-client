import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';

import { getMessagesResponse, MessageService } from '@/api/requests';
import { Message } from '@/types';

export const useGetInfinityMessagesByChatId = (idChat: number) =>
  useInfiniteQuery({
    enabled: !Number.isNaN(idChat),
    refetchOnWindowFocus: false,
    queryKey: ['message', idChat],
    initialPageParam: { page: 1, length: 80 },
    queryFn: ({ pageParam }) =>
      MessageService.getMessagesByChatId(
        idChat,
        pageParam.length,
        pageParam.page,
      ),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export const updateInfinityMessagesCache = (
  idChat: number,
  client: QueryClient,
  newMessage: Message,
) => {
  client.setQueryData(
    ['message', idChat],
    (oldData?: {
      pages: getMessagesResponse[];
      pageParams: {
        page: number;
        length: number;
      };
    }): {
      pages: getMessagesResponse[];
      pageParams: {
        page: number;
        length: number;
      };
    } => {
      if (!oldData)
        return {
          pages: [
            {
              messages: [newMessage],
              nextCursor: null,
            },
          ],
          pageParams: {
            length: 80,
            page: 1,
          },
        };

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
