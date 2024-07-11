import { apiInstance } from '@/api';
import { Message } from '@/types';

export class MessageService {
  static async getMessagesByChatId(id: number) {
    const response = await apiInstance.get<Message[]>('/message/' + id);
    return response.data;
  }
}
