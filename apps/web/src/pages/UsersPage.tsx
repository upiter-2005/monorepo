import { Container, Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { ORDER } from '@org/constants';
import { useTranslation } from 'react-i18next';

import { UsersList } from '../components/users/UsersList';
import { UsersPagination } from '../components/users/UsersPagination';
import { DEFAULT_PAGINATION_PARAMS, DEFAULT_QUERY_PARAMS } from '../constants/queryParams';
import { usePagination } from '../hooks/usePagination';
import { useQueryParams } from '../hooks/useQueryParams';
import { useUsers } from '../hooks/useUsers';

const UsersPage: React.FC = () => {
  const { pagination, setPage } = usePagination(DEFAULT_PAGINATION_PARAMS);
  const { queryString, params, changeQuery } = useQueryParams(DEFAULT_QUERY_PARAMS, pagination);
  const { users, total } = useUsers(queryString);

  const totalPages = Math.ceil(total / pagination.limit);

  const { t } = useTranslation();

  return (
    <Container className="max-w-[1200px] w-full m-auto">
      <Typography component="h1" className="text-center ">
        {t('user_page.user_list')}
      </Typography>
      {params && (
        <Select
          value={params.order || ORDER.DESC}
          onChange={(e) => {
            changeQuery(
              { ...params, order: e.target.value, sortBy: 'createdAt' },
              { ...pagination },
            );
          }}
        >
          <MenuItem value={ORDER.DESC}> {t('user_page.newest')} </MenuItem>
          <MenuItem value={ORDER.ASC}>{t('user_page.oldest')} </MenuItem>
        </Select>
      )}

      <UsersList users={users} />

      <UsersPagination
        page={pagination.page}
        totalPages={totalPages}
        onChange={(page) => {
          changeQuery({ ...params }, { ...pagination, page });
          setPage(page);
        }}
      />
    </Container>
  );
};

export default UsersPage;
