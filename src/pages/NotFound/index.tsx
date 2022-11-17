import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { t: translate } = useTranslation();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1976d2',
        color: 'white',
        height: '100vh',
      }}
    >
      <Typography variant="h1" fontSize="30vh" mb={10}>
        {translate('pageNotFound.title')}
      </Typography>
      <Typography variant="h2" mb={5} sx={{opacity: '.4'}}>
        {translate('pageNotFound.subtitle')}
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
          {translate('globals.buttons.backHome')}
        </Link>
      </Button>
    </Paper>
  );
};

export default NotFound;