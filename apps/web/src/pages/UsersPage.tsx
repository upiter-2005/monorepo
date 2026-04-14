import { Container, Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UsersList } from '../components/users/UsersList';
import { UsersPagination } from '../components/users/UsersPagination';
import { ORDER } from '../consts/orders';
import { usePagination } from '../hooks/usePagination';
import { useQueryParams } from '../hooks/useQueryParams';
import { useUsers } from '../hooks/useUsers';

const Users: React.FC = () => {
  const { users, total, changeQuery } = useUsers();
  const { params, setParams } = useQueryParams();
  const pagination = usePagination({
    page: params.page,
    limit: params.limit,
    total,
  });

  const { t } = useTranslation();

  return (
    <Container className="max-w-[1200px] w-full m-auto">
      <Typography component="h1" className="text-center ">
        {t('user_page.user_list')}
      </Typography>

      <Select
        value={params.order || ORDER.DESC}
        onChange={(e) => {
          changeQuery({ ...params, order: e.target.value, sortBy: 'createdAt' });
          setParams({ ...params, order: e.target.value, sortBy: 'createdAt' });
        }}
      >
        <MenuItem value={ORDER.DESC}> {t('user_page.newest')} </MenuItem>
        <MenuItem value={ORDER.ASC}>{t('user_page.oldest')} </MenuItem>
      </Select>

      <UsersList users={users} />

      <UsersPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onChange={(page) => {
          changeQuery({ ...params, page });
          setParams({ ...params, page });
        }}
      />
    </Container>
  );
};

export default Users;
