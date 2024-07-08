import { apiInstance } from '@/api';

import { SignDto } from './type';

export class AuthService {
  static async SignIn(data: SignDto) {
    const response = await apiInstance.post<{ token: string }>(
      '/auth/signin',
      data,
    );
    return response.data;
  }

  static async SignUp(data: SignDto) {
    const response = await apiInstance.post('/auth/signup', data);
    return response.data;
  }
}
