import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { LocalStorageManager } from '@/api';
import { AuthService } from '@/services';
import { useAuthStore } from '@/store';

export const useAuthPage = () => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const signInMutate = useMutation({
    mutationFn: AuthService.SignIn,
    onSuccess: (data) => {
      LocalStorageManager.setToken(data.token);
      setIsAuth(true);
    },
  });

  const signUpMutate = useMutation({
    mutationFn: AuthService.SignUp,
    onSuccess: () => {
      setMode('signin');
    },
  });

  const onSumbit = (data: { login: string; password: string }) => {
    if (mode === 'signin') signInMutate.mutateAsync(data);
    else signUpMutate.mutateAsync(data);
  };

  const handleModeButtonClick = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    signInMutate.reset();
    signUpMutate.reset();
  };

  return {
    mode,
    signIn: {
      isLoading: signInMutate.isPending,
      error: signInMutate.error?.message,
    },
    signUp: {
      isLoading: signUpMutate.isPending,
      error: signUpMutate.error?.message,
    },
    onSumbit,
    handleModeButtonClick,
  };
};
