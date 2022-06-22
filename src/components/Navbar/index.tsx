import {
  AppBar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Title } from 'components';
import { locales } from 'constant';
import { SupportedLocales } from 'types';
import { useApp } from 'hooks';

export const Navbar = () => {
  const { t: translate, i18n } = useTranslation();
  const { locale, setThemeLocale } = useApp();

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    setThemeLocale(value as SupportedLocales);
    i18n.changeLanguage(value.substring(0, 2));
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
          {Object.keys(locales).map((key) => (
            <MenuItem value={key} key={key}>
              {translate(`globals.locales.${key.substring(0, 2)}`)}
            </MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  );
};
