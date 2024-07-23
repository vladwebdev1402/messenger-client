export type AuthData = {
  login: string;
  password: string;
};

export type Mode = 'signup' | 'signin';

export type AuthProps = {
  currentMode: Mode;
  isLoading: boolean;
  error?: string;
  changeMode: () => void;
  onSubmit: (data: AuthData) => void;
};
