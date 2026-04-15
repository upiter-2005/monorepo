import { User } from '@org/types';

interface UsersList {
  users: User[];
}

export const UsersList: React.FC<UsersList> = ({ users }) => {
  return (
    <div className="flex justify-center items-center ">
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};
