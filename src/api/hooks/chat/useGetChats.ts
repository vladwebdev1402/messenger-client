import { QueryClient, useQuery } from '@tanstack/react-query';

import { AllChatsResponse, ChatService } from '@/api/requests';

import { Chat, User } from '@/types';

export const useGetChats = () =>
  useQuery<AllChatsResponse>({
    refetchOnWindowFocus: false,
    queryKey: ['chats'],
    queryFn: async () => await ChatService.getAllChats(),
  });

export const updateChatsCashe = (
  client: QueryClient,
  chat: Chat,
  user: User,
) => {
  client.setQueryData(['chats'], (oldData: AllChatsResponse) => [
    ...oldData,
    { idChat: chat.id, user },
  ]);
};
