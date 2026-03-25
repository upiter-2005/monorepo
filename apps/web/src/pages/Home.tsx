import { Container, Box } from '@mui/material';

import UserData from '../components/UserData';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { token } = useAuth();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {token && <UserData decodeData={token} />}
      </Box>
    </Container>
  );
};

export default Home;
