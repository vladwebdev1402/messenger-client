import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { updateOnlineInCashe } from '@/api';
import { useAuthStore, useSocketStore } from '@/store';

import { useCreateChatStore } from './store';

export const useChatCard = (userId: number, idChat?: number) => {
  const navigate = useNavigate();
  const setUserId = useCreateChatStore((state) => state.setUserId);
  const client = useQueryClient();

  const currentUser = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);

  const handleChatClick = () => {
    if (!idChat) setUserId(userId);
    navigate('/' + idChat);
  };

  useEffect(() => {
    if (socket && currentUser && idChat !== null) {
      const handleWindowBeforeUnload = () => {
        socket.emit('chat/leave', { idChat, idUser: currentUser.id });
      };

      window.addEventListener('beforeunload', handleWindowBeforeUnload);

      socket.emit('chat/join', { idChat, idUser: currentUser.id });

      const handleConnect = (idUser: number) => {
        updateOnlineInCashe(client, idUser, true);
      };

      const handleDisconnect = (idUser: number) => {
        updateOnlineInCashe(client, idUser, false);
      };

      socket.on('chat/connect', handleConnect);
      socket.on('chat/disconnect', handleDisconnect);

      return () => {
        if (idChat !== null) {
          window.removeEventListener('beforeunload', handleWindowBeforeUnload);
          socket.emit('chat/leave', { idChat, idUser: currentUser.id });
          socket.off('chat/connect', handleConnect);
          socket.off('chat/disconnect', handleDisconnect);
        }
      };
    }
  }, [socket, currentUser, idChat, client]);

  return { handleChatClick };
};
