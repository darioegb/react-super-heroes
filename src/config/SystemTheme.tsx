import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

import { useApp } from 'hooks';
import { locales } from 'constant';

interface SystemThemeProps {
  children: JSX.Element;
}

const SystemTheme = ({ children }: SystemThemeProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { locale } = useApp();

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        },
        locales[locale],
      ),
    [locale, prefersDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default SystemTheme;
