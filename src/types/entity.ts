export type User = {
  id: number;
  login: string;
  isOnline: boolean;
};

export type Chat = {
  id: number;
  name: string;
};

export type ChatMember = {
  id: number;
  idUser: number;
  idChat: number;
};

export type Message = {
  id: number;
  message: string;
  user: User;
  idUser: number;
  idChat: number;
  createdAt: Date;
};
