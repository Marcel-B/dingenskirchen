import { Alert, Box, Container, Divider, Grid, Snackbar, Typography } from '@mui/material';
import React from 'react';
import Feed from '../feed/Feed';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetMessage } from "../../common/commonSlice";
import InfoCard from "../info/InfoCard";
import TimerControl from "../timer/TimerControl";

const Dashboard = () => {
  const {error, success, message} = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetMessage());
  };
  return (
    <Container>
      <Grid
        container
        spacing={4}>
        <Grid item xs={8}>
          <Feed/>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}>

            <Typography variant='h4'
                        sx={{
                          mt: 1
                        }}>Info</Typography>
            <Typography color='text.secondary'
                        variant='subtitle2'
                        sx={{}}>Düngung Richtwerte</Typography>
          </Box>
          <Divider orientation='horizontal'/>
          <InfoCard/>
          <TimerControl/>
        </Grid>
      </Grid>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;