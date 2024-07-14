import { Message } from '@/types';

export type getMessagesResponse = {
  messages: Message[];
  nextCursor: number | null;
};
