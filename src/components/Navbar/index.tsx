import {
  AppBar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

import { Title } from 'components';
import { LOCALES } from 'constant';
import { SupportedLocales } from 'types';
import { useApp, useOnline } from 'hooks';

export const Navbar = () => {
  const { t: translate, i18n } = useTranslation();
  const { locale, setThemeLocale } = useApp();
  const { isOnline } = useOnline();

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    setThemeLocale(value as SupportedLocales);
    i18n.changeLanguage(value.substring(0, 2));
    localStorage.setItem('lang', value.substring(0, 2));
  };

  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="h6" color="inherit" component="div">
          <Title />
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isOnline ? (
            <WifiIcon className="icon-left" />
          ) : (
            <WifiOffIcon className="icon-left" />
          )}
          <Select
            data-testid="select-locale"
            value={locale}
            onChange={handleChange}
            sx={{
              color: 'white',
              '.MuiSelect-icon': {
                color: 'white',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    color: 'black',
                  },
                },
              },
            }}
          >
            {Object.keys(LOCALES).map((key) => (
              <MenuItem value={key} key={key}>
                {translate(`globals.locales.${key.substring(0, 2)}`)}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Toolbar>
    </AppBar>
  );
};
