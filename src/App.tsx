import { AppRoutes } from '@/routes';
import { AppProvider } from './providers/AppProvider';

function App() {
  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </>
  );
}

export default App;
