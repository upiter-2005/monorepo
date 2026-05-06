import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const UsersPagination: React.FC<Props> = ({ page = 1, totalPages = 1, onChange }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
      />
    </Stack>
  );
};
