import { Box, CardMedia, Typography } from '@mui/material';
import type { CredentialResponseData } from '@org/types';

import LogoutBtn from './LogoutButton';

interface UserDataToken {
  decodeData: CredentialResponseData;
}

const UserData: React.FC<UserDataToken> = ({ decodeData }) => {
  return (
    <Box className="flex flex-col items-center gap-2">
      <h1>Testing CD</h1>
      <Typography variant="h4" gutterBottom>
        {decodeData.family_name} {decodeData.given_name}
      </Typography>
      <div>{decodeData.email}</div>
      <div>
        <CardMedia component="img" height="140" image={decodeData.picture} alt="user avatar" />
      </div>
      <LogoutBtn />
    </Box>
  );
};

export default UserData;
