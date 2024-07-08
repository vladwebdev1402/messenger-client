import { apiInstance } from '@/api';

export class ChatService {
  static async getAllChats() {
    const response = await apiInstance.get('chat');
    return response;
  }
}
