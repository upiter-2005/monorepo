import { useEffect, useState } from 'react';

import { User } from '@org/types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('/users');
      const data = await response.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <section>
      <h1>Users list</h1>
      <ul>
        {users.map((user) => (
          <li>{user.email}</li>
        ))}
      </ul>
    </section>
  );
};

export default Users;
