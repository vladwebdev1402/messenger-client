import { Socket } from 'socket.io-client';
import { create } from 'zustand';

type State = {
  socket: null | Socket;
};

type Action = {
  setSoket: (socket: null | Socket) => void;
};

export const useSocketStore = create<State & Action>((set) => ({
  socket: null,
  setSoket: (socket) => set({ socket }),
}));
