import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';

import { Button, useCreateChatStore } from '@/components';
import { ROUTER_PATHS } from '@/constants';
import { useSocketStore } from '@/store';
import { LocalStorageManager } from '@/api';

import { MessageForm, MessageList } from './components';

const ChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const socket = useSocketStore((state) => state.socket);
  const createChatUserId = useCreateChatStore((state) => state.userId);
  const clearCreateChatStore = useCreateChatStore((state) => state.clearStore);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitMessage = (data: { message: string }) => {
    if (socket && id) {
      if (createChatUserId === null) {
        socket.emit('message/send', {
          token: `Bearer ${LocalStorageManager.getToken()}`,
          message: data.message,
          idChat: Number(id),
        });
      }

      if (Number.isNaN(Number(id))) {
        socket.emit('chat/private/create', {
          token: `Bearer ${LocalStorageManager.getToken()}`,
          idSecondUser: createChatUserId,
          message: data.message,
        });
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="pt-3 pb-5 pl-2 pr-2 bg-border w-full">
        <Button
          onClick={() => {
            clearCreateChatStore();
            navigate(ROUTER_PATHS.main);
          }}
        >
          Закрыть
        </Button>
      </div>
      <div>
        <MessageList listRef={listRef} />
        <MessageForm onSubmit={handleSubmitMessage} />
      </div>
    </div>
  );
};

export { ChatPage };
