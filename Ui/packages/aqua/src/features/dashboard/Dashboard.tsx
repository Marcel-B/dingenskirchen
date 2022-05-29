import { Alert, Box, Button, Container, Divider, Grid, Paper, Snackbar, Typography } from '@mui/material';
import React from 'react';
import Feed from '../feed/Feed';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetMessage } from "../../store/commonSlice";
import InfoCard from "../info/InfoCard";
import TimerItem from '../timer/TimerItem';
import { addTimer } from "../timer/timerSlice";
import TimerIcon from '@mui/icons-material/Timer';
import {
  TextInputComponent,
} from 'shared-types';
import DaTextInput from 'ts-control/DaTextInput';
import { useForm } from "react-hook-form";

const AppTextInput = DaTextInput as TextInputComponent;

const Dashboard = () => {
  const {error, success, message} = useAppSelector(state => state.common);
  const {timer} = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  const {handleSubmit, control, reset} = useForm<{ name: string }>();

  const handleAddTimer = (data: { name: string }) => {
    dispatch(addTimer(data.name));
    reset();
  }

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

          <Box sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'
                        sx={{
                          mt: 1
                        }}>Timer</Typography>
            <TimerIcon fontSize='medium' color='disabled'/>
          </Box>
          <Divider orientation='horizontal'/>
          <Paper sx={{p: 2, mt: 2}}>
            <form onSubmit={handleSubmit(handleAddTimer)}>
              <AppTextInput control={control} label='Name' name='name' type='text' default=''/>
              <Button type='submit'>Neuer Timer</Button>
            </form>
          </Paper>
          {timer.map(t =>
            <TimerItem timer={t} key={t.name}/>
          )}
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