import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { useAuthPage } from './useAuthPage';

const AuthPage = () => {
  const { mode, signIn, signUp, changeMode, onSubmit } = useAuthPage();

  return (
    <div className="ml-auto mr-auto h-full min-h-[70vh] max-w-md mt-10 md:mt-24 flex gap-4 overflow-hidden w-full relative">
      <SignInForm
        changeMode={changeMode}
        currentMode={mode}
        isLoading={signIn.isLoading}
        onSubmit={onSubmit}
        error={signIn.error}
      />
      <SignUpForm
        changeMode={changeMode}
        currentMode={mode}
        isLoading={signUp.isLoading}
        onSubmit={onSubmit}
        error={signUp.error}
      />
    </div>
  );
};

export { AuthPage };
