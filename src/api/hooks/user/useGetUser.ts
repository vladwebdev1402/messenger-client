import { QueryOptions, useQuery } from '@tanstack/react-query';
import { AuthService } from '@/api/requests';
import { User } from '@/types';

export const useGetUser = (options?: QueryOptions<User>) =>
  useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['user'],
    queryFn: async () => await AuthService.getUser(),
    ...options,
  });
