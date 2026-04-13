import { Container, Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { t } from 'i18next';

import { UsersList } from '../components/users/UsersList';
import { UsersPagination } from '../components/users/UsersPagination';
import { useUsers } from '../hooks/useUsers';

const Users: React.FC = () => {
  const { users, pagination, params, changeQuery } = useUsers();

  return (
    <Container className="max-w-[1200px] w-full m-auto">
      <Typography component="h1" className="text-center ">
        {t('user_list')}
      </Typography>

      <Select
        value={params.order || 'DESC'}
        onChange={(e) => changeQuery({ ...params, order: e.target.value, sortBy: 'createdAt' })}
      >
        <MenuItem value="DESC">Newest </MenuItem>
        <MenuItem value="ASC">Oldest </MenuItem>
      </Select>

      <UsersList users={users} />

      {pagination && (
        <UsersPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onChange={(val) => changeQuery({ ...params, page: val })}
        />
      )}
    </Container>
  );
};

export default Users;
