import { useMutation } from '@tanstack/react-query';

import { MutationOptions } from '@/types';
import { AuthService, SignDto } from '@/api/requests';

export const useSignInMutate = (
  options?: MutationOptions<{ token: string }, SignDto>,
) =>
  useMutation({
    mutationFn: AuthService.SignIn,
    ...options,
  });
