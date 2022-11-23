import { CircularProgress, Stack } from '@mui/material';
interface GlobalLoaderProps {
  /**
   * Flag to display loader
   */
  loading: boolean;
}

/**
 * GlobalLoader is a global loader component using mui.
 */
export const GlobalLoader = ({ loading }: GlobalLoaderProps) => {
  return (
    <>
      {loading && (
        <Stack alignItems="center">
          <CircularProgress
            data-testid="global-loader"
            sx={{ margin: '.5rem' }}
          />
        </Stack>
      )}
    </>
  );
};
