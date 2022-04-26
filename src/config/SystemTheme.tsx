import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { esES } from '@mui/material/locale';
import { useMemo } from 'react';

interface SystemThemeProps {
  children: JSX.Element;
}

const SystemTheme = ({ children }: SystemThemeProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        },
        esES,
      ),
    [prefersDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default SystemTheme;