import axios, { AxiosError } from 'axios';

import { LocalStorageManager } from './localStorage';

export const BASE_URL = 'http://localhost:5000';

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${LocalStorageManager.getToken()}`,
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    if (error.response) throw new Error(error.response.data.message);
    return Promise.reject(error);
  },
);
