import { Suspense } from 'react';
import { SnackbarProvider } from 'notistack';

import './App.scss';
import { AppRouter } from 'routes';
import { CircularProgress } from '@mui/material';

const App = () => {
  return (
    <div className="app">
      <SnackbarProvider maxSnack={3}>
        <Suspense fallback={<CircularProgress />}>
          <AppRouter />
        </Suspense>
      </SnackbarProvider>
    </div>
  );
};

export default App;
