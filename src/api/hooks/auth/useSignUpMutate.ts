import { useMutation } from '@tanstack/react-query';
import { AuthService, SignDto } from '@/api/requests';
import { MutationOptions } from '@/types';

export const useSignUpMutate = (options?: MutationOptions<unknown, SignDto>) =>
  useMutation({
    mutationFn: async (params) => await AuthService.SignUp(params),
    ...options,
  });
