import { Toolbar, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '../share/routes';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <Toolbar>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button color="primary" component={Link} to={ROUTES.HOME}>
          {t('home')}
        </Button>
        <Button color="primary" component={Link} to={ROUTES.LOGIN}>
          {t('login')}
        </Button>
        <Button color="primary" onClick={() => i18n.changeLanguage('en')}>
          {t('en')}
        </Button>

        <Button color="primary" onClick={() => i18n.changeLanguage('uk')}>
          {t('ua')}
        </Button>
      </Box>
    </Toolbar>
  );
};
export default Navbar;
