import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/useAuth';

const LogoutButton: React.FC = () => {
  const { cleanToken } = useAuth();
  const { t } = useTranslation();

  return (
    <Button onClick={cleanToken} className="!bg-gray-500 !text-white hover:!bg-gray-300 px-4 py-2">
      {t('menu_items.logout')}
    </Button>
  );
};

export default LogoutButton;
