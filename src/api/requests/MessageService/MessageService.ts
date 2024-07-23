import { apiInstance, getMessagesResponse } from '@/api';

export class MessageService {
  static async getMessagesByChatId(id: number, length?: number, page?: number) {
    const response = await apiInstance.get<getMessagesResponse>(
      `/message/${id}`,
      {
        params: {
          page,
          length,
        },
      },
    );
    return response.data;
  }
}
