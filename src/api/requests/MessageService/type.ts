import { Message } from '@/types';

export type getMessagesResponse = {
  messages: Message[];
  nextCursor: {
    page: number;
    length: number;
  } | null;
};
