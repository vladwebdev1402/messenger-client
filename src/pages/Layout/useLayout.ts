import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { BASE_URL, LocalStorageManager } from '@/api';
import { useAuthStore, useSocketStore } from '@/store';
import { AuthService } from '@/services';

export const useLayout = () => {
  const { data, error, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['user'],
    queryFn: async () => await AuthService.getUser(),
  });

  const [isOpen, setIsOpen] = useState(true);
  const socket = useSocketStore((state) => state.socket);
  const isAuth = useAuthStore((state) => state.isAuth);
  const socketCreatedRef = useRef(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setSocket = useSocketStore((state) => state.setSoket);

  const changeIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (data) setUser(data);
    if (error) {
      setUser(null);
      setIsAuth(false);
    }
  }, [data, error]);

  useEffect(() => {
    if (isAuth && !socket && !socketCreatedRef.current) {
      refetch();

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
