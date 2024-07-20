import { User } from '@/types';
import { apiInstance } from '@/api/instance';

export class UserService {
  static async getSearchUsers(login: string) {
    const users = await apiInstance.get<User[]>(`/user/search?login=${login}`);
    return users;
  }
}
