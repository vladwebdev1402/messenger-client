import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './pages';
import { ThemeProvider } from './components';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export { App };
