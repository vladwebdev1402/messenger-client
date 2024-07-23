import { useState } from 'react';

import { LocalStorageManager, useSignInMutate, useSignUpMutate } from '@/api';
import { useAuthStore } from '@/store';

import { Mode } from './type';

export const useAuthPage = () => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const [mode, setMode] = useState<Mode>('signin');

  const signUpMutate = useSignUpMutate({
    onSuccess: () => setMode('signin'),
  });

  const signInMutate = useSignInMutate({
    onSuccess: (data) => {
      LocalStorageManager.setToken(data.token);
      setIsAuth(true);
    },
  });

  const onSubmit = (data: { login: string; password: string }) => {
    if (mode === 'signin') signInMutate.mutateAsync(data);
    else signUpMutate.mutateAsync(data);
  };

  const changeMode = () => {
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
    onSubmit,
    changeMode,
  };
};
