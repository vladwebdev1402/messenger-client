export class LocalStorageManager {
  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken(): string {
    return localStorage.getItem('token') || '';
  }

  static checkToken(): boolean {
    return localStorage.getItem('token') !== null;
  }

  static removeToken() {
    localStorage.removeItem('token');
  }
}
