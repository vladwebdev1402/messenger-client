import { User } from '@/types';

export type AllChatsResponse = {
  chat: {
    members: ({
      user: User;
    } & {
      id: number;
      idChat: number;
      idUser: number;
    })[];
  };
} & {
  id: number;
  idChat: number;
  idUser: number;
};
