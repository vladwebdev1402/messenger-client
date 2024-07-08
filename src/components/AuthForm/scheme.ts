import { z } from 'zod';

export const authScheme = z.object({
  login: z
    .string()
    .min(8, { message: 'Минимальная длина логина составляет 8 символов' }),
  password: z
    .string()
    .min(10, { message: 'Минимальная длина пароля составляет 10 символов' }),
});
