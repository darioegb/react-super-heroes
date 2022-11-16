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

import { SupportedLocales } from 'types';
import { useApp, useOnline } from 'hooks';
import { Localization } from '@mui/material/locale';

interface NavbarProps {
  /**
   * Navbar title
   */
  title: string;
  /**
   * Locales is an object that contains all the necessary locations as properties of said object extracted from mui locale
   */
  locales?: { [key: string]: Localization };
  /**
   * Select options path to translate values using useTranslation from react-i18next. is required if locales was set
   */
  localesLabelPath?: string;
  /**
   * Is a flag to display online status. By default is true
   */
  showOnlineStatus?: boolean;
}

/**
 * Navbar is top navbar using mui. It display status connection and combobox to change language.
 */
export const Navbar = ({
  title,
  locales,
  localesLabelPath,
  showOnlineStatus = true,
}: NavbarProps) => {
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
        <Typography variant="h6">{title}</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {showOnlineStatus && (
            <span>
              {isOnline ? (
                <WifiIcon className="icon-left" />
              ) : (
                <WifiOffIcon className="icon-left" />
              )}
            </span>
          )}
          {locales && <Select
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
                {translate(`${localesLabelPath}.${key.substring(0, 2)}`)}
              </MenuItem>
            ))}
          </Select>}
        </div>
      </Toolbar>
    </AppBar>
  );
};
