import { create } from 'zustand';

import { LocalStorageManager } from '@/api';
import { User } from '@/types';

type State = {
  isAuth: boolean;
  user: User | null;
};
type Action = {
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  user: null,
  isAuth: LocalStorageManager.checkToken(),
  setIsAuth: (isAuth) => set({ isAuth }),
  setUser: (user) => set({ user }),
}));
