import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const params = useParams<{ id: string }>();

  return <div>{params.id}</div>;
};

export { ChatPage };
