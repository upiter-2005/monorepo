import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/useAuth';

const LogoutButton: React.FC = () => {
  const { cleanToken } = useAuth();
  const { t } = useTranslation();

  return <Button onClick={cleanToken}>{t('logout')}</Button>;
};

export default LogoutButton;
