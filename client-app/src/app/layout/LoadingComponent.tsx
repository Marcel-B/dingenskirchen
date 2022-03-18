import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  status: string;
}

export const LoadingComponent = (props: Props) => {
  return (
    <Box sx={{display: 'flex'}}>
      <CircularProgress />
      <Typography variant={'h4'}>{props.status}</Typography>
    </Box>
  );
};
