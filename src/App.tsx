import { Suspense } from 'react';
import { SnackbarProvider } from 'notistack';
import { CircularProgress } from '@mui/material';

import './App.scss';
import { GlobalLoader, Navbar } from 'components';
import { AppRouter } from 'routes';

const App = () => {
  return (
    <div className="app">
      <SnackbarProvider maxSnack={3}>
        <Suspense fallback={<CircularProgress />}>
          <Navbar />
          <GlobalLoader />
          <div className="app-body">
            <AppRouter />
          </div>
        </Suspense>
      </SnackbarProvider>
    </div>
  );
};

export default App;
