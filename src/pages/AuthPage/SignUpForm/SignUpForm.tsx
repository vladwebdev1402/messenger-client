import { FC } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

import { AuthForm, Button, Typography } from '@/components';

import { AuthProps } from '../type';

const SignUpForm: FC<AuthProps> = ({
  currentMode,
  isLoading,
  error,
  onSubmit,
  changeMode,
}) => {
  return (
    <div
      className={clsx(
        'w-full duration-500 pl-4 pr-4 absolute translate-x-full scale-50',
        {
          'translate-x-0 scale-100': currentMode === 'signup',
        },
      )}
    >
      <Typography variant="h2" className="text-center">
        Регистрация
      </Typography>
      <div className="mt-4">
        <AuthForm onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin mr-4" />}
              Зарегистрироваться
            </Button>
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={changeMode}
            >
              Перейти к авторизации
            </Button>
          </div>
        </AuthForm>
        {error && <Typography className="text-red-600">{error}</Typography>}
      </div>
    </div>
  );
};

export { SignUpForm };
