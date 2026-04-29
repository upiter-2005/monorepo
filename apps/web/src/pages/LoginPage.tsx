import { useState } from 'react';

import { Container, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

import CustomizedSnackbars from '../components/Notification';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { handleSuccess } = useAuth();
  const [openError, setOpenError] = useState(false);

  const handleError = (): void => {
    setOpenError(true);
  };

  return (
    <>
      <Container className="max-w-[1200px] w-full m-auto">
        <Box className="flex justify-center items-center min-h-[100vh]">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </Box>
      </Container>
      <CustomizedSnackbars open={openError} />
    </>
  );
};

export default Login;
