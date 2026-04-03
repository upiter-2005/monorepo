import { Container } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { t } from 'i18next';

import { UsersPagination } from '../components/UsersPagination';
import { useGetUsers } from '../hooks/useGetUsers';

const Users: React.FC = () => {
  const { data, meta, params, fetchUsers } = useGetUsers();

  return (
    <Container className="max-w-[1200px] w-full m-auto">
      <h1 className="text-center ">{t('user_list')}</h1>

      <Select
        value={params.order || 'DESC'}
        onChange={(e) => fetchUsers({ order: e.target.value, sortBy: 'createdAt' })}
      >
        <MenuItem value="DESC">Newest </MenuItem>
        <MenuItem value="ASC">Oldest </MenuItem>
      </Select>

      <div className="flex justify-center items-center ">
        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
      {meta && (
        <UsersPagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={(val) => fetchUsers({ page: val })}
        />
      )}
    </Container>
  );
};

export default Users;
