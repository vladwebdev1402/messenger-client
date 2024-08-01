import { QueryClient, useQuery } from '@tanstack/react-query';

import { AllChatsResponse, ChatService } from '@/api/requests';

import { Chat, Message, User } from '@/types';

export const useGetChats = () =>
  useQuery<AllChatsResponse>({
    refetchOnWindowFocus: false,
    queryKey: ['chats'],
    queryFn: async () => await ChatService.getAllChats(),
  });

export const addChatInCashe = (
  client: QueryClient,
  chat: Chat,
  user: User,
  message: Message,
) => {
  client.setQueryData(['chats'], (oldData: AllChatsResponse) => [
    ...oldData,
    {
      chat,
      user,
      lastMessage: message,
    },
  ]);
};

export const updateOnlineInCashe = (
  client: QueryClient,
  idUser: number,
  isOnline: boolean,
) => {
  client.setQueryData(['chats'], (oldData: AllChatsResponse) =>
    oldData.map((item) => {
      if (item.user.id === idUser)
        return { ...item, user: { ...item.user, isOnline } };
      return item;
    }),
  );
};

export const updateLastMessageInCashe = (
  client: QueryClient,
  chatId: number,
  message: Message,
) => {
  client.setQueryData(['chats'], (oldData: AllChatsResponse) =>
    oldData.map((item) => {
      if (item.chat.id === chatId) return { ...item, lastMessage: message };
      return item;
    }),
  );
};
