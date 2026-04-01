import { Toolbar, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '../share/routes';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <Toolbar>
      <Box className="flex gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          component={Link}
          to={ROUTES.HOME}
        >
          {t('home')}
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          component={Link}
          to={ROUTES.LOGIN}
        >
          {t('login')}
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          component={Link}
          to={ROUTES.USERS}
        >
          {t('users')}
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          onClick={() => i18n.changeLanguage('en')}
        >
          {t('en')}
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          onClick={() => i18n.changeLanguage('uk')}
        >
          {t('ua')}
        </Button>
      </Box>
    </Toolbar>
  );
};
export default Navbar;
