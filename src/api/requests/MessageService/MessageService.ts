import { apiInstance } from '@/api';
import { Message } from '@/types';

export class MessageService {
  static async getMessagesByChatId(id: number, length?: number) {
    const response = await apiInstance.get<Message[]>(
      `/message/${id}?length=${length || 20}`,
    );
    return response.data;
  }
}
