import { Loader2 } from 'lucide-react';

import { AuthForm, Button, Typography } from '@/components';
import { useAuthPage } from './useAuthPage';

const AuthPage = () => {
  const { mode, signIn, signUp, handleModeButtonClick, onSumbit } =
    useAuthPage();

  return (
    <div className="container max-w-md mt-24">
      <Typography variant="h2" className="text-center">
        {mode === 'signin' ? 'Авторизация' : 'Регистрация'}
      </Typography>
      <div className="mt-4">
        <AuthForm onSubmit={onSumbit}>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={signIn.isLoading || signUp.isLoading}
            >
              {(signIn.isLoading || signUp.isLoading) && (
                <Loader2 className="animate-spin" />
              )}
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
        {(signIn.error || signUp.error) && (
          <Typography className="text-red-600">
            {signIn.error || signUp.error}
          </Typography>
        )}
      </div>
    </div>
  );
};

export { AuthPage };
