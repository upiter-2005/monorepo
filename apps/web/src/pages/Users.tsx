import { useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';
import { User } from '@org/types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // custom hook add useUsers
    // check auth user
    //
    const getUsers = async () => {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      return data;
    };

    getUsers();
  }, []);

  return (
    <Container className="max-w-[1200px] w-full m-auto">
      <h1>t{'user_list'}</h1>
      <Box className="flex justify-center items-center min-h-[100vh]">
        <ul>
          {users?.map((user) => (
            <li>{user.email}</li>
          ))}
          <li>pavel470245@gmail.com</li>
        </ul>
      </Box>
    </Container>
  );
};

export default Users;
