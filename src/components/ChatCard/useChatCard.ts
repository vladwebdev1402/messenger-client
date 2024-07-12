import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuthStore, useChatsStore, useSocketStore } from '@/store';
import { useGetMessagesByChatId } from '@/api';

export const useChatCard = (idChat: number) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMessagesByChatId(idChat);

  const setOnline = useChatsStore((state) => state.setOnline);
  const currentUser = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);

  const handleChatClick = () => navigate('/' + idChat);

  useEffect(() => {
    if (socket && currentUser) {
      const handleWindowBeforeUnload = () => {
        socket.emit('chat/leave', { idChat, idUser: currentUser.id });
      };

      window.addEventListener('beforeunload', handleWindowBeforeUnload);

      socket.emit('chat/join', { idChat, idUser: currentUser.id });

      const handleConnect = (idUser: number) => {
        setOnline(idUser, true);
      };

      const handleDisconnect = (idUser: number) => {
        setOnline(idUser, false);
      };

      socket.on('chat/connect', handleConnect);
      socket.on('chat/disconnect', handleDisconnect);

      return () => {
        window.removeEventListener('beforeunload', handleWindowBeforeUnload);
        socket.emit('chat/leave', { idChat, idUser: currentUser.id });
        socket.off('chat/connect', handleConnect);
        socket.off('chat/disconnect', handleDisconnect);
      };
    }
  }, [socket, currentUser]);

  return { isLoading, error, data, handleChatClick };
};
