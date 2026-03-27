import { useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

import CustomizedSnackbars from '../components/Notification';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { handleSuccess } = useAuth();
  const [openError, setOpenError] = useState(false);
  const [fetchData, setFetchData] = useState<any>();

  const handleError = () => {
    setOpenError(true);
  };

  const fetchFromNest = async () => {
    const response = await fetch('http://localhost:3000/api');
    const data = await response.json();
    setFetchData(data);
    console.log(data);
  };
  useEffect(() => {
    fetchFromNest();
  }, []);

  return (
    <>
      <Container className="max-w-[1200px] w-full m-auto">
        <h2>
          Fetch data: <b>{fetchData?.message}</b>{' '}
        </h2>
        <Box className="flex justify-center items-center min-h-[100vh]">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </Box>
      </Container>
      <CustomizedSnackbars open={openError} />
    </>
  );
};

export default Login;
