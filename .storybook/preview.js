import { Suspense } from 'react';
import { addDecorator } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { CircularProgress } from '@mui/material';

import '../src/styles.scss';
import i18n from '../src/config/i18n';

addDecorator((storyFn) => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<CircularProgress />}>{storyFn()}</Suspense>
  </I18nextProvider>
));
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: 'requiredFirst',
  },
};
