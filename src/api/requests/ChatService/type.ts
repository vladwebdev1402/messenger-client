import { Chat, Message, User } from '@/types';

export type AllChatsResponse = {
  chat: Chat;
  user: User;
  lastMessage: Message;
}[];
