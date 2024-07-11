import { apiInstance } from '@/api';

import { AllChatsResponse } from './type';

export class ChatService {
  static async getAllChats() {
    const response = await apiInstance.get<AllChatsResponse[]>('chat');
    return response.data;
  }
}
