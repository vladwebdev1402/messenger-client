import { useNavigate, useParams } from 'react-router-dom';

import { useGetMessagesByChatId } from '@/api';
import { Button, MessageCard } from '@/components';
import { useAuthStore } from '@/store';
import { ROUTER_PATHS } from '@/constants';

const ChatPage = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const { data } = useGetMessagesByChatId(Number(params.id));

  if (data && user)
    return (
      <div className="w-full">
        <div className="pt-3 pb-5 pl-2 pr-2 bg-slate-50 w-full">
          <Button onClick={() => navigate(ROUTER_PATHS.main)}>Закрыть</Button>
        </div>
        <div>
          <div className="flex flex-col gap-3 pl-2 pr-2">
            {data.map((msg) => (
              <MessageCard
                message={msg}
                isMyMessage={msg.idUser === user.id}
                key={msg.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export { ChatPage };
