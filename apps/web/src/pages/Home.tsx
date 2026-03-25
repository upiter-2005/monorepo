import { Container, Box } from '@mui/material';

import UserData from '../components/UserData';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { token } = useAuth();

  return (
    <Container className="max-w-[1200px] w-full m-auto">
      <Box className="w-[300px] min-h-[100vh] m-auto flex flex-col justify-center items-center">
        {token && <UserData decodeData={token} />}
      </Box>
    </Container>
  );
};

export default Home;
