import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { BASE_URL, LocalStorageManager } from '@/api';
import { useAuthStore, useSocketStore } from '@/store';

export const useLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSoket);
  const isAuth = useAuthStore((state) => state.isAuth);
  const socketCreatedRef = useRef(false);

  const changeIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isAuth && !socket && !socketCreatedRef.current) {
      const socket = io(BASE_URL, {
        query: { token: `Bearer ${LocalStorageManager.getToken()}` },
      });
      setSocket(socket);
      socketCreatedRef.current = true;
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [isAuth, socket]);

  return {
    isOpen,
    changeIsOpen,
  };
};
