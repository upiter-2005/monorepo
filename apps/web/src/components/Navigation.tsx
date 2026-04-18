import { Toolbar, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

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
          {t('menu_items.home')}
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          component={Link}
          to={ROUTES.LOGIN}
        >
          {t('menu_items.login')}
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          component={Link}
          to={ROUTES.USERS}
        >
          {t('user_page.users')}
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          onClick={() => i18n.changeLanguage('en')}
        >
          {t('menu_items.en')}
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-100 px-4 py-2"
          onClick={() => i18n.changeLanguage('uk')}
        >
          {t('menu_items.ua')}
        </Button>
      </Box>
    </Toolbar>
  );
};
export default Navbar;
