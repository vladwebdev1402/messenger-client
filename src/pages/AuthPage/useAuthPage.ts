import { useState } from 'react';

import { LocalStorageManager, useSignInMutate, useSignUpMutate } from '@/api';
import { useAuthStore } from '@/store';

export const useAuthPage = () => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const signUpMutate = useSignUpMutate({
    onSuccess: () => setMode('signin'),
  });

  const signInMutate = useSignInMutate({
    onSuccess: (data) => {
      LocalStorageManager.setToken(data.token);
      setIsAuth(true);
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
