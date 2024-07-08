import { AuthForm, Button, Typography } from '@/components';
import { useState } from 'react';

const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const onSumbit = (data: { login: string; password: string }) => {
    console.log(data);
  };

  const handleModeButtonClick = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="container max-w-md mt-24">
      <Typography variant="h2" className="text-center">
        {mode === 'signin' ? 'Авторизация' : 'Регистрация'}
      </Typography>
      <div className="mt-4">
        <AuthForm onSubmit={onSumbit}>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              {mode === 'signin' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={handleModeButtonClick}
            >
              {mode === 'signin' ? 'Зарегистрироваться' : 'Авторизоваться'}
            </Button>
          </div>
        </AuthForm>
      </div>
    </div>
  );
};

export { AuthPage };
