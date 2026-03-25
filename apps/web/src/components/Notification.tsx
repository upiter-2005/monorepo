import * as React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';

export default function CustomizedSnackbars({ open = false }) {
  const [isOpen, setIsOpen] = React.useState(open);
  const { t } = useTranslation();
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {t('loginFailed')}
        </Alert>
      </Snackbar>
    </div>
  );
}
