import { create } from 'zustand';

type State = {
  userId: null | number;
};

type Action = {
  setUserId: (id: number) => void;
  clearStore: () => void;
};

export const useCreateChatStore = create<State & Action>((set) => ({
  userId: null,
  clearStore: () => set({ userId: null }),
  setUserId: (id) => set({ userId: id }),
}));
