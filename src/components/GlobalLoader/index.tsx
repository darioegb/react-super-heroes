import { CircularProgress, Stack } from '@mui/material';
import { useAxiosLoader } from 'hooks';

export const GlobalLoader = () => {
  const [loading] = useAxiosLoader();

  return (
    <>
      {loading && (
        <Stack alignItems="center">
          <CircularProgress data-testid="global-loader" />
        </Stack>
      )}
    </>
  );
};
