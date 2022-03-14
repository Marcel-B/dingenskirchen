import { Box, CircularProgress } from '@mui/material';

export const LoadingComponent = () => {
  return (
    <Box sx={{display: 'flex'}}>
      <CircularProgress />
    </Box>
  );
};
