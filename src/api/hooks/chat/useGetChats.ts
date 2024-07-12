import { AllChatsResponse, ChatService } from '@/api/requests';
import { useQuery } from '@tanstack/react-query';

export const useGetChats = () =>
  useQuery<AllChatsResponse>({
    refetchOnWindowFocus: false,
    queryKey: ['chats'],
    queryFn: async () => await ChatService.getAllChats(),
  });
