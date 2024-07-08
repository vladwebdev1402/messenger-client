import { create } from 'zustand';

import { LocalStorageManager } from '@/api';

type State = {
  isAuth: boolean;
};
type Action = {
  setIsAuth: (isAuth: boolean) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  isAuth: LocalStorageManager.checkToken(),
  setIsAuth: (isAuth) => set({ isAuth }),
}));
