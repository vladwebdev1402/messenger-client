import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components';
import { ROUTER_PATHS } from '@/constants';
import { useSocketStore } from '@/store';
import { LocalStorageManager } from '@/api';

import { MessageForm, MessageList } from './components';
import { useRef } from 'react';

const ChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const socket = useSocketStore((state) => state.socket);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitMessage = (data: { message: string }) => {
    if (socket && id) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
      socket.emit('message/send', {
        token: `Bearer ${LocalStorageManager.getToken()}`,
        message: data.message,
        idChat: Number(id),
      });
    }
  };

  return (
    <div className="w-full">
      <div className="pt-3 pb-5 pl-2 pr-2 bg-slate-50 w-full">
        <Button onClick={() => navigate(ROUTER_PATHS.main)}>Закрыть</Button>
      </div>
      <div>
        <MessageList listRef={listRef} />
        <MessageForm onSubmit={handleSubmitMessage} />
      </div>
    </div>
  );
};

export { ChatPage };