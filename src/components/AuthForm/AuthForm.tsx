import { ReactNode } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  PasswordInput,
} from '../ui';
import { authScheme } from './scheme';

type AuthFormProps = {
  onSubmit: (data: z.infer<typeof authScheme>) => void;
  children?: ReactNode;
};

const AuthForm = ({ onSubmit, children }: AuthFormProps) => {
  const form = useForm<z.infer<typeof authScheme>>({
    resolver: zodResolver(authScheme),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="login"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Логин" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput placeholder="Пароль" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-5">{children}</div>
      </form>
    </Form>
  );
};

export { AuthForm };
