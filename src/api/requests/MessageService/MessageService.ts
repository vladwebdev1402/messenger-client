import { apiInstance, getMessagesResponse } from '@/api';

export class MessageService {
  static async getMessagesByChatId(id: number, length?: number) {
    const response = await apiInstance.get<getMessagesResponse>(
      `/message/${id}?length=${length || 20}`,
    );
    return response.data;
  }
}
