import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/api/requests';

export const useGetSearchUsersByLogin = (login: string) =>
  useQuery({
    refetchOnWindowFocus: false,
    enabled: login !== '',
    queryKey: ['user', login],
    queryFn: async () => (await UserService.getSearchUsers(login)).data,
  });
