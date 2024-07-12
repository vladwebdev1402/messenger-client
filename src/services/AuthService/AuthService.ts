import { apiInstance, LocalStorageManager } from '@/api';

import { User } from '@/types';

import { SignDto } from './type';

export class AuthService {
  static async SignIn(data: SignDto) {
    const response = await apiInstance.post<{ token: string }>(
      '/auth/signin',
      data,
    );
    LocalStorageManager.setToken(response.data.token);
    return response.data;
  }

  static async SignUp(data: SignDto) {
    const response = await apiInstance.post('/auth/signup', data);
    return response.data;
  }

  static async getUser() {
    const response = await apiInstance.get<User>('user');
    return response.data;
  }
}
