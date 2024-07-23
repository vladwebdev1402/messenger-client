import { FC } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

import { AuthForm, Button, Typography } from '@/components';

import { AuthProps } from '../type';

const SignInForm: FC<AuthProps> = ({
  currentMode,
  isLoading,
  error,
  onSubmit,
  changeMode,
}) => {
  return (
    <div
      className={clsx('w-full duration-500 pl-4 pr-4 left-0 top-0 absolute', {
        'translate-x-[-100%] scale-50': currentMode !== 'signin',
        'scale-100 translate-x-0': currentMode === 'signin',
      })}
    >
      <Typography variant="h2" className="text-center">
        Авторизация
      </Typography>
      <div className="mt-4">
        <AuthForm onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin mr-4" />}
              Авторизоваться
            </Button>
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={changeMode}
            >
              Перейти к регистрации
            </Button>
          </div>
        </AuthForm>
        {error && <Typography className="text-red-600">{error}</Typography>}
      </div>
    </div>
  );
};

export { SignInForm };
