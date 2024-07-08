import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './pages';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export { App };
