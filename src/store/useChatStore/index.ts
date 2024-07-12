import { create } from 'zustand';

import { User } from '@/types';

type State = {
  chats: { idChat: number; user: User }[] | null;
};

type Action = {
  setChats: (chats: { idChat: number; user: User }[]) => void;
  setOnline: (idUser: number, isOnline: boolean) => void;
};

export const useChatsStore = create<State & Action>((set) => ({
  chats: null,
  setChats: (chats) => set({ chats }),
  setOnline: (idUser, isOnline) =>
    set((state) => ({
      chats: state.chats?.map((chat) =>
        chat.user.id === idUser
          ? { ...chat, user: { ...chat.user, isOnline } }
          : chat,
      ),
    })),
}));
