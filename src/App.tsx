import { Suspense } from 'react';
import { SnackbarProvider } from 'notistack';
import { CircularProgress } from '@mui/material';

import './App.scss';
import { GlobalLoader, Title } from 'components';
import { AppRouter } from 'routes';

const App = () => {
  return (
    <div className='App'>
        <SnackbarProvider maxSnack={3}>
          <Suspense fallback={<CircularProgress />}>
            <Title />
            <GlobalLoader />
            <AppRouter />
          </Suspense>
        </SnackbarProvider>
    </div>
  );
};

export default App;
